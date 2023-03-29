import express_ws from 'express-ws';
import { IUser } from '../../../common';
import { RoomService } from '../../services/room/room.service';
import { IRoom } from '../../../common/interfaces/room.interface';
import { UserService } from '../../services/user/user.service';
import { BuzzerMessages, ErrorMessages, RoomMessages } from '../../../common/interfaces/messages';
import ShortUniqueId from 'short-unique-id';
import { ClientMessagesTypes } from '../../../common/interfaces/messages/client-messages.interface';
import { WsMessage } from '../../../common/models/ws-message.model';
import { ClientMessage } from '../../../common/models/client-message.model';
import { BuzzerService } from '../../services/games/buzzer.service';

const roomService = RoomService.getInstance();
const userService = UserService.getInstance();
const uniqueIdGenerator = new ShortUniqueId({ length: 4 });

// GAMES
const buzzerGame = BuzzerService.getInstance();

export const roomRoute = (expressWs: express_ws.Instance) => {
	const { app } = expressWs;

	app.post('/room', (req, res) => {
		try {
			const roomId = uniqueIdGenerator();
			const userId = req.headers['x-user-id'];
			if (!userId || typeof userId !== 'string') {
				return res.status(403).send('No user id found');
			}
			const user: IUser | undefined = userService.getUserById(userId);
			if (!user) {
				return res.status(403).send('No user found');
			}
			user.makeHost(true);
			const room = roomService.createRoom(roomId, user);
			if (!room) {
				return res.send(ErrorMessages.ErrorRoomAlreadyExist);
			}
			console.info(`New room ${roomId} for user ${user.name} - ${user.id}`);
			return res.send({ roomId, user });
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
			user.addRoom(client);
			room.addUser(user);

			const hostMessage = new WsMessage(RoomMessages.RoomAllRoomPlayers, room.getUsers());
			room.broadcastToHost(hostMessage);

			const clientMessage = new ClientMessage(ClientMessagesTypes.Success, `Joined room ${roomId}`).getString();
			client.send(clientMessage);
		} catch (e) {
			client.send(JSON.stringify(e));
			client.close();
		}

		client.on('message', (msg) => {
			try {
				const { user, room } = handleMissingUserOrRoom(userId, roomId);
				const message = JSON.parse(msg as any);
				console.info(`Message received from ${user.name} - ${user.id}: ${msg}`);

				if (Object.values(BuzzerMessages).includes(message.type)) {
					buzzerGame.handlePlayerMessages(user, room, message);
				}
			} catch (e) {
				const clientMessage = new ClientMessage(ClientMessagesTypes.Error, `There was an error handling message ${msg}: ${e}`).getString();
				console.log(clientMessage);
				client.send(clientMessage);
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
					const hostMessage = new WsMessage(RoomMessages.RoomAllRoomPlayers, room.getUsers());
					room.broadcastToHost(hostMessage);
				}
			} catch (e) {
				console.error('Error disconnecting user');
			}
		});
	});
};

function handleMissingUserOrRoom(userId: string | undefined, roomId: string): { user: IUser; room: IRoom } {
	const user: IUser | undefined = userService.getUserById(userId);
	const room: IRoom | undefined = roomService.getRoomById(roomId);
	if (!user) {
		const clientMessage = new ClientMessage(ClientMessagesTypes.Error, `User ${userId} not found when joining room ${roomId}`).getString();
		console.error(clientMessage);
		throw new Error(clientMessage);
	}
	if (!room) {
		const clientMessage = new ClientMessage(ClientMessagesTypes.Error, `Game ${roomId} does not exist!`).getString();
		console.error(clientMessage);
		throw new Error(clientMessage);
	}
	return { user, room };
}
