import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/login/login.page';
import React from 'react';
import DashboardPage from './pages/dashboard/dashboard.page';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <div>Page not found</div>,
		children: [
			{
				errorElement: <div>Page not found</div>,
				children: [
					{ index: true, element: <App /> },
					{
						path: 'login',
						element: <LoginPage />,
					},
					{
						path: '/dashboard',
						element: <DashboardPage />,
					},
				],
			},
		],
	},
]);

export default router;
