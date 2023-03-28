import React from 'react';
import DashboardPage from './dashboard.page';
import { RouteObject } from 'react-router-dom';
import { BuzzerRouter } from '../../games/buzzer/buzzer.router';

export enum DashboardRoutes {
	Dashboard = '/dashboard',
}

export const DashboardRouter: RouteObject[] = [
	{
		path: DashboardRoutes.Dashboard,
		element: <DashboardPage />,
	},
	BuzzerRouter,
];
