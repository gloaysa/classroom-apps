import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/login/login.page';
import React from 'react';
import { DashboardRouter } from './pages/dashboard/dashboard.router';

export enum MainRoutes {
	Home = '/',
	Login = '/login',
}

const router = createBrowserRouter([
	{
		path: MainRoutes.Home,
		element: <App />,
		errorElement: <div>Page not found</div>,
		children: [
			{
				errorElement: <div>Page not found</div>,
				children: [
					{ index: true, element: <App /> },
					{
						path: MainRoutes.Login,
						element: <LoginPage />,
					},
					DashboardRouter,
				],
			},
		],
	},
]);

export default router;
