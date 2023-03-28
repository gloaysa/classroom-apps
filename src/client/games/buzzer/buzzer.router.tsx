import React from 'react';
import { RouteObject } from 'react-router-dom';
import BuzzerLobbyGame from './buzzer-lobby.game';
import BuzzerRoomGame from './buzzer-room.game';

export enum BuzzerRoutes {
	Lobby = '/buzzer',
	Room = '/buzzer',
}
export const BuzzerRouter: RouteObject = {
	path: BuzzerRoutes.Lobby,
	element: <BuzzerLobbyGame />,
	children: [
		{
			path: `${BuzzerRoutes.Room}/:gameId`,
			element: <BuzzerRoomGame />,
		},
	],
};
