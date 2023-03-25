import express_ws from 'express-ws';
import { IWsMessage, User, WsMessageType } from '../../../common';
import { UserService } from '../../services/user/user.service';
import * as ws from 'ws';
import * as express from 'express';

const userService = UserService.getInstance();
export const WsRoute = (expressWs: express_ws.Instance) => {
	const { app, getWss } = expressWs;

	app.ws('/', (ws, req) => {
		ws.on('message', (msg) => handleOnWsMessage(ws, req, getWss, msg.toString()));

		ws.on('close', () => handleOnWsClose(req, getWss));
		handleOnWsConnect(ws, req, getWss);
	});
};

function handleOnWsMessage(ws: ws, req: express.Request, getWss: () => ws.Server, msg: string) {
	const userFromQuery = JSON.parse(req.query.user?.toString() ?? '');
	const user: User | undefined = userService.getUserById(userFromQuery?.id);
	if (!user) {
		return;
	}

	const message: IWsMessage = JSON.parse(msg);
	console.log(message);
	switch (message.type) {
		case WsMessageType.NewGame:
			userService.addUserToGame(user.id, message.data.gameName, true);
			break;
		case WsMessageType.JoinGame:
			userService.addUserToGame(user.id, message.data.gameName);
			break;
		case WsMessageType.BuzzerOnOff:
			broadcastMessage(
				{
					type: WsMessageType.BuzzerOnOff,
					data: message.data.state,
				},
				getWss
			);
			break;
	}

	const connectedUser = userService.getUserById(user.id);
	const host = userService.getGameHost(connectedUser?.gameId);
	const response = {
		type: WsMessageType.ForHost,
		data: host,
	};
	broadcastMessage(response, getWss);
}

function handleOnWsConnect(ws: ws, req: express.Request, getWss: () => ws.Server) {
	const userFromQuery = req.query.user as string;
	console.log(userFromQuery);
	if (!userFromQuery) {
		ws.close(403);
	}
	const user: User = JSON.parse(userFromQuery);
	console.log(`Received a new connection.`);

	// Store the new connection and handle messages
	const newUser = userService.createNewUser(user.id, user.name);
	console.log(`${user.name} connected.`);
	const response = {
		type: WsMessageType.NewUser,
		data: newUser,
	};
	ws.send(JSON.stringify(response));

	const host = userService.getGameHost(newUser?.gameId);
	const messageForHost = {
		type: WsMessageType.ForHost,
		data: host,
	};
	broadcastMessage(messageForHost, getWss);
}

function handleOnWsClose(req: express.Request, getWss: () => ws.Server) {
	const userFromQuery = JSON.parse(req.query.user?.toString() ?? '');

	const user: User | undefined = userService.getUserById(userFromQuery?.id);
	if (!user) {
		return;
	}
	userService.disconnectUser(user);
	const response = {
		type: WsMessageType.User,
		data: userService.getAllUsers(),
	};
	broadcastMessage(response, getWss);

	console.log('disconnect', user.name);
	const host = userService.getGameHost(user?.gameId);
	const messageForHost = {
		type: WsMessageType.ForHost,
		data: host,
	};
	broadcastMessage(messageForHost, getWss);
}

function broadcastMessage(json: IWsMessage, getWss: () => ws.Server) {
	const clients = getWss().clients;
	// We are sending the current data to all connected active clients
	const data = JSON.stringify(json);
	clients.forEach((client) => {
		if (client.readyState === ws.OPEN) {
			client.send(data);
		}
	});
}
