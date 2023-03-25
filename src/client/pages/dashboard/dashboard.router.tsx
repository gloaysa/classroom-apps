import React from 'react';
import DashboardPage from './dashboard.page';
import { RouteObject } from 'react-router-dom';
import BuzzerGame from '../../games/buzzer/buzzer.game';
import BuzzerHostGame from '../../games/buzzer/host/buzzer-host.game';

export enum DashboardRoutes {
	Dashboard = '/dashboard',
	Host = 'host',
}
export const DashboardRouter: RouteObject = {
	path: DashboardRoutes.Dashboard,
	element: <DashboardPage />,
	children: [
		{
			path: '',
			element: <BuzzerGame />,
		},
		{
			path: DashboardRoutes.Host,
			element: <BuzzerHostGame />,
		},
	],
};
