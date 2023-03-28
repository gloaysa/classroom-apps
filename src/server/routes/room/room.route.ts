import express_ws from 'express-ws';
import { IUser } from '../../../common';
import { RoomService } from '../../services/room/room.service';
import { WsMessage } from '../../models/ws-message.model';
import { IRoom } from '../../../common/interfaces/room.interface';
import { UserService } from '../../services/user/user.service';
import { ErrorMessages, UserMessages } from '../../../common/interfaces/messages';
import ShortUniqueId from 'short-unique-id';

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
				console.error(`User ${userId} not found when joining room ${roomId}`);
				client.send('User does not exists, closing connection...');
				client.close();
				return;
			}

			const room: IRoom | undefined = roomService.getRoomById(roomId);

			if (!room) {
				const message = JSON.stringify(new WsMessage(ErrorMessages.ErrorRoomDoestNotExist, roomId));
				console.error(message);
				client.send(message);
				client.close();
				return;
			}
			room.addUser(user);
			const message = JSON.stringify(new WsMessage(UserMessages.UserJoinGame, user));
			console.info(message);
			client.send(message);
		} catch (e) {
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
				console.error(`There was an error handling the message: ${msg}: ${e}`);
			}
		});
	});
};
