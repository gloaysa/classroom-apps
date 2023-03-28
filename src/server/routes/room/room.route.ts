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
			const room = roomService.createRoom(roomId, user);
			if (!room) {
				return res.send(ErrorMessages.ErrorRoomAlreadyExist);
			}
			console.info(`New room ${roomId} for user ${user.name} - ${user.id}`);
			return res.send({ roomId });
		} catch (e) {
			console.error(`It was not possible to create new room`);
		}
	});

	app.ws('/room/:roomId', (client, req) => {
		const roomId = req.params.roomId?.toString();
		try {
			const isHost = req.query.isHost?.toString();
			const user: IUser | undefined = userService.getUserById(req.query.user?.toString());

			if (!user) {
				client.send('Room does not exists, closing connection...');
				client.close();
				return;
			}

			let room: IRoom | undefined;
			room = roomService.getRoomById(roomId);

			if (isHost) {
				if (!room) {
					room = roomService.createRoom(roomId, user);
				}
			}

			if (!room) {
				client.send('room does not exist');
				client.close();
				return;
			}

			console.log(`User joined room ${roomId}`);
			client.send('connected!');
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
