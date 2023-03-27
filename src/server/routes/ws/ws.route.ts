/*
import express_ws from 'express-ws';
import { IWsMessage, IUser } from '../../../common';
import { UserService } from '../../services/user/user.service';
import * as ws from 'ws';
import * as express from 'express';

const userService = UserService.getInstance();
export const WsRoute = (expressWs: express_ws.Instance) => {
	const { app, getWss } = expressWs;

	app.ws('/buzz', (ws, req) => {
		ws.on('message', (msg) => handleOnWsMessage(ws, req, getWss, msg.toString()));

		ws.on('close', () => handleOnWsClose(req, getWss));
		handleOnWsConnect(ws, req, getWss);
	});
};

function handleOnWsMessage(ws: ws, req: express.Request, getWss: () => ws.Server, msg: string) {
	try {
		const userFromQuery = JSON.parse(req.query.user?.toString() ?? '');
		const user: IUser | undefined = userService.getUserById(userFromQuery?.id);
		const message: IWsMessage | undefined = JSON.parse(msg);

		if (!message || !user) {
			console.warn(`No user or message in message - user: ${user?.id} | msg: ${msg}`);
			return;
		}

		console.log(`New message from ${user.name} - ${user.id}: ${msg}`);

		switch (message.type) {
			case WsMessageType.NewGame:
				userService.addUserToGame(user.id, message.data.gameName, true);
				break;
			case WsMessageType.JoinGame:
				userService.addUserToGame(user.id, message.data.gameName);
				ws.send(
					JSON.stringify({
						type: WsMessageType.User,
						data: userService.getUserById(user.id),
					})
				);
				break;
			case WsMessageType.BuzzerOnOff:
				if (message.data?.state) {
					userService.resetBuzzed(user.gameId);
				}
				broadcastMessage(
					{
						type: WsMessageType.BuzzerOnOff,
						data: message.data.state,
					},
					getWss
				);
				break;
			case WsMessageType.Buzzed:
				userService.userBuzzed(user.id, user.gameId, true);
				break;
			case WsMessageType.UserLogout:
				userService.deleteUser(user);
				console.info(`User ${user.name} logged out`);
				break;
		}

		const connectedUser = userService.getUserById(user.id);
		const host = userService.getGameHost(connectedUser?.gameId);
		const response = {
			type: WsMessageType.ForHost,
			data: host,
		};
		broadcastMessage(response, getWss);
	} catch (e) {
		console.error(`There was an error processing last message: ${msg} - ${e}`);
		return;
	}
}

function handleOnWsConnect(ws: ws, req: express.Request, getWss: () => ws.Server) {
	const userFromQuery = req.query.user as string;
	if (!userFromQuery) {
		ws.close(403);
	}
	try {
		const user: IUser = JSON.parse(userFromQuery);
		console.log(userFromQuery);
		const newUser = userService.createNewUser(user.id, user.name);
		console.info(`${user.name} connected with id ${user.id}.`);

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
	} catch (e) {
		console.error(`There was an error connecting new user: ${userFromQuery} - ${e}`);
		return;
	}
}

function handleOnWsClose(req: express.Request, getWss: () => ws.Server) {
	try {
		const userFromQuery = JSON.parse(req.query.user?.toString() ?? '');

		const user: IUser | undefined = userService.getUserById(userFromQuery?.id);
		if (!user) {
			return;
		}
		userService.disconnectUser(user);

		console.log('disconnect', user.name);
		const host = userService.getGameHost(user?.gameId);
		const messageForHost = {
			type: WsMessageType.ForHost,
			data: host,
		};
		broadcastMessage(messageForHost, getWss);
	} catch (e) {
		console.error(`There was an error disconnecting user ${req.query.user}, ${e}`);
		return;
	}
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
*/
