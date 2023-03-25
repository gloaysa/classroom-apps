import './App.scss';
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './store/reducers/user.reducer';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { MainRoutes } from './index.router';
import { DashboardRoutes } from './pages/dashboard/dashboard.router';

const App: FunctionComponent = () => {
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);

	useEffect(() => {
		if (!currentUser) {
			navigate(MainRoutes.Login);
		} else {
			navigate(DashboardRoutes.Dashboard);
		}
	}, [currentUser]);

	return (
		<div className="app" role="main">
			<Container component="main" maxWidth="xs">
				<Outlet />
			</Container>
		</div>
	);
};

export default App;
