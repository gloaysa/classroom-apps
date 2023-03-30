import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import LoginPage from './pages/login/login.page';
import React, { FunctionComponent } from 'react';
import { DashboardRouter } from './pages/dashboard/dashboard.router';
import { useGetUserIdHook } from './hooks/use-get-user-id.hook';

export enum MainRoutes {
	Home = '/',
	Login = '/login',
}

const ProtectedRoute: FunctionComponent<any> = ({ children }) => {
	const { userId } = useGetUserIdHook();
	if (!userId) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

const router = createBrowserRouter([
	{
		path: MainRoutes.Home,
		element: <App />,
		errorElement: <div>Page not found</div>,
		children: [
			{
				errorElement: <div>Page not found</div>,
				children: [
					{
						path: MainRoutes.Login,
						element: <LoginPage />,
					},
					...DashboardRouter.map((route) => ({
						...route,
						element: <ProtectedRoute>{route.element}</ProtectedRoute>,
					})),
				],
			},
		],
	},
]);

export default router;
