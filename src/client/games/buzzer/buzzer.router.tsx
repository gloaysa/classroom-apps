import { RouteObject } from 'react-router-dom';
import BuzzerGame from './buzzer.game';
import BuzzerHostGame from './host/buzzer-host.game';
import React from 'react';
import BuzzerPlayerGame from './buzzer-player.game';

export enum BuzzerRoutes {
	Main = '/buzzer',
	Game = '/buzzer',
	Host = '/buzzer/host',
}
export const BuzzerRouter: RouteObject = {
	path: BuzzerRoutes.Main,
	element: <BuzzerGame />,
	children: [
		{
			path: BuzzerRoutes.Host,
			element: <BuzzerHostGame />,
		},
		{
			path: `${BuzzerRoutes.Game}/:gameId`,
			element: <BuzzerPlayerGame />,
		},
	],
};
