import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './store/reducers/user.reducer';
import { Outlet, useNavigate } from 'react-router-dom';
import { MainRoutes } from './index.router';
import { DashboardRoutes } from './pages/dashboard/dashboard.router';
import { Box } from '@mui/material';

const App: FunctionComponent = () => {
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);

	useEffect(() => {
		if (!currentUser) {
			navigate(MainRoutes.Login);
		} else if (location.pathname === '/') {
			navigate(DashboardRoutes.Dashboard);
		}
	}, [currentUser]);

	return (
		<Box component="main" maxWidth="l">
			<Outlet />
		</Box>
	);
};

export default App;
