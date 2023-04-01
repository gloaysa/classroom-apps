import express_ws from 'express-ws';
import { IUser } from '../../../common/interfaces/user.interface';
import { RoomService } from '../../services/room/room.service';
import { IRoom } from '../../../common/interfaces/room.interface';
import { UserService } from '../../services/user/user.service';
import ShortUniqueId from 'short-unique-id';
import { BuzzerService } from '../../services/games/buzzer.service';
import { StoreActions } from '../../../common/actions';
import { BuzzerGameActions } from '../../../common/actions/buzzer-game.actions';
import { RoomActions, RoomActionTypes } from '../../../common/actions/room.actions';
import { ClientMessagesTypes, MainActions, MainActionTypes } from '../../../common/actions/main.actions';
import { UserActions, UserActionTypes } from '../../../common/actions/user.actions';
import { ErrorActions, ErrorActionTypes } from '../../../common/actions/error.actions';
import { MessageModel } from '../../models/message.model';

const roomService = RoomService.getInstance();
const userService = UserService.getInstance();
const uniqueIdGenerator = new ShortUniqueId({ length: 4 });

// GAMES
const buzzerService = BuzzerService.getInstance();

export const roomRoute = (expressWs: express_ws.Instance) => {
	const { app } = expressWs;

	app.post('/room', (req, res) => {
		try {
			const roomId = uniqueIdGenerator();
			const userId = req.headers['x-user-id'];
			if (!userId || typeof userId !== 'string') {
				const message: MainActions = {
					type: MainActionTypes.SetMessage,
					payload: { type: ClientMessagesTypes.Error, data: 'Need a logged in user to create rooms' },
				};
				return res.status(403).send([message]);
			}

			const user: IUser | undefined = userService.getUserById(userId);

			if (!user) {
				const message: ErrorActions = {
					type: ErrorActionTypes.UserDoesNotExist,
					payload: `No user found with id ${userId}`,
				};
				return res.status(403).send([message]);
			}

			const room = roomService.createRoom(roomId, user);

			// TODO: When adding more games, do not create BuzzerGame by default
			buzzerService.createGame(roomId);

			if (!room) {
				const message: ErrorActions = {
					type: ErrorActionTypes.RoomDoesNotExist,
					payload: `Could not create room with id ${roomId}`,
				};
				return res.send([message]);
			}

			const userMessage: UserActions = { type: UserActionTypes.SetUser, payload: user };
			const roomMessage: RoomActions = { type: RoomActionTypes.CreateRoom, payload: roomId };
			console.info(`New room ${roomId} for user ${user.name} - ${user.id}`);
			res.send([userMessage, roomMessage]);
		} catch (e) {
			console.error(`It was not possible to create new room`);
		}
	});

	app.ws('/room/:roomId', (client, req) => {
		const roomId = req.params.roomId?.toString();
		const userId = req.query.userId?.toString();
		try {
			const { user, room } = handleMissingUserOrRoom(userId, roomId);

			user.connected = true;
			room.addUser(user, client);

			room.broadcastToHost({ type: RoomActionTypes.SetPlayers, payload: room.getUsers() });
			room.broadcastToHost({
				type: MainActionTypes.SetMessage,
				payload: {
					type: ClientMessagesTypes.Info,
					data: `User ${user.name} joined the room`,
				},
			});

			const clientMessage = new MessageModel({
				type: MainActionTypes.SetMessage,
				payload: { type: ClientMessagesTypes.Success, data: `Joined room ${roomId}` },
			});
			client.send(clientMessage.toString());

			const successMessage = new MessageModel({ type: UserActionTypes.SetUser, payload: user });
			client.send(successMessage.toString());
		} catch (e) {
			console.error(e);
			const clientMessage = new MessageModel({
				type: MainActionTypes.SetMessage,
				payload: { type: ClientMessagesTypes.Error, data: `Could not join ${roomId}` },
			});
			client.send(clientMessage.toString());
			client.send(JSON.stringify(e));
		}

		client.on('message', (msg) => {
			try {
				const { user, room } = handleMissingUserOrRoom(userId, roomId);
				const message: StoreActions = JSON.parse(msg as unknown as string);
				console.info(`Message received from ${user.name} - ${user.id}: ${msg}`);

				// TODO: When adding more games, don't call all services to see which one picks up the message
				buzzerService.handlePlayerMessages(user, room, client, message as BuzzerGameActions);
			} catch (e) {
				console.error(e);
				client.send(JSON.stringify(e));
			}
		});

		client.on('close', () => {
			const userId = req.query.userId?.toString();
			const room: IRoom | undefined = roomService.getRoomById(roomId);

			try {
				const user: IUser | undefined = userService.getUserById(userId);
				if (!user) {
					return;
				}

				user.connected = false;

				if (room) {
					if (user.isHost(room.id)) {
						room.broadcastToPlayers({
							type: MainActionTypes.SetMessage,
							payload: {
								type: ClientMessagesTypes.Info,
								data: `Host left room ${roomId}, you are being disconnected`,
							},
						});
					} else {
						room.broadcastToHost({ type: RoomActionTypes.SetPlayers, payload: room.getUsers() });

						room.broadcastToHost({
							type: MainActionTypes.SetMessage,
							payload: {
								type: ClientMessagesTypes.Info,
								data: `User ${user.name} left the room`,
							},
						});
					}
				}
				const clientMessage = new MessageModel({ type: UserActionTypes.RemoveUser, payload: undefined });
				client.send(clientMessage.toString());
				console.info(`User ${user.name} - ${user.id} disconnected`);
			} catch (e) {
				const errorMessage: MainActions = {
					type: MainActionTypes.SetMessage,
					payload: {
						type: ClientMessagesTypes.Error,
						data: `There was an error disconnecting user ${userId}`,
					},
				};
				console.error(errorMessage);
			}
		});
	});
};

function handleMissingUserOrRoom(userId: string | undefined, roomId: string): { user: IUser; room: IRoom } {
	const user: IUser | undefined = userService.getUserById(userId);
	const room: IRoom | undefined = roomService.getRoomById(roomId);
	if (!user) {
		throw {
			type: ErrorActionTypes.UserDoesNotExist,
			payload: `User ${userId} not found when joining room ${roomId}`,
		};
	}
	if (!room) {
		throw {
			type: ErrorActionTypes.RoomDoesNotExist,
			payload: `Could not find room with id ${roomId}`,
		};
	}
	return { user, room };
}
