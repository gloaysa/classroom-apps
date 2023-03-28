import express_ws from 'express-ws';
import { IUser } from '../../../common';
import { RoomService } from '../../services/room/room.service';
import { IRoom } from '../../../common/interfaces/room.interface';
import { UserService } from '../../services/user/user.service';
import { ErrorMessages, RoomMessages, UserMessages } from '../../../common/interfaces/messages';
import ShortUniqueId from 'short-unique-id';
import { ClientMessagesTypes } from '../../../common/interfaces/messages/client-messages.interface';
import { WsMessage } from '../../../common/models/ws-message.model';
import { ClientMessage } from '../../../common/models/client-message.model';

const roomService = RoomService.getInstance();
const userService = UserService.getInstance();
const uniqueIdGenerator = new ShortUniqueId({ length: 4 });

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
			const user: IUser | undefined = userService.getUserById(userId);

			if (!user) {
				const clientMessage = new ClientMessage(ClientMessagesTypes.Error, `User ${userId} not found when joining room ${roomId}`).getString();
				console.error(clientMessage);
				client.send(clientMessage);
				client.close();
				return;
			}

			user.connected = true;
			const room: IRoom | undefined = roomService.getRoomById(roomId);

			if (!room) {
				const clientMessage = new ClientMessage(ClientMessagesTypes.Error, `Game ${roomId} does not exist!`).getString();
				console.error(clientMessage);
				client.send(clientMessage);
				client.close();
				return;
			}
			user.addRoom(client);
			room.addUser(user);

			let message = new WsMessage(RoomMessages.RoomUserJoined, user);

			if (user.isHost) {
				message = new WsMessage(RoomMessages.RoomAllRoomPlayers, room.users);
			}

			room.broadcastToHost(message);
			console.info(message);
			const clientMessage = new ClientMessage(ClientMessagesTypes.Success, `Joined room ${roomId}`).getString();
			client.send(clientMessage);
		} catch (e) {
			const clientMessage = new ClientMessage(ClientMessagesTypes.Error, `Couldn't join ${roomId}, try again later`);
			client.send(clientMessage.getString());
			client.close();
			console.error(`Not possible to connect client to room ${roomId}: ${e}`);
		}

		client.on('message', (msg) => {
			try {
				const room = roomService.getRoomById(roomId);
				if (!room) {
					client.send('room does not exist');
					return;
				}

				const message = new WsMessage(UserMessages.UserJoinGame, `message for all people in ${roomId}`);
				console.info(message);
				room.broadcastToPlayers(message);
			} catch (e) {
				const clientMessage = new ClientMessage(ClientMessagesTypes.Error, `An error has occurred :(`);
				client.send(clientMessage.getString());
				console.error(`There was an error handling the message: ${msg}: ${e}`);
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
					const hostMessage = new WsMessage(RoomMessages.RoomUserDisconnected, user);
					room.broadcastToHost(hostMessage);
				}
			} catch (e) {
				console.error('Error disconnecting user');
			}
		});
	});
};
