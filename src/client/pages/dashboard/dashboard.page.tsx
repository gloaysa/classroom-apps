import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { handleLastJsonMessageUtil } from './handle-last-json-message.util';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSocketHook } from '../../hooks/use-socket.hook';
import { Button, Container } from '@mui/material';
import { DashboardRoutes } from './dashboard.router';

const DashboardPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const { lastJsonMessage } = useSocketHook(currentUser);
	const currentPath = useLocation().pathname;
	const currentPageIsHost = currentPath.match(/\/host$/);

	useEffect(() => {
		handleLastJsonMessageUtil(lastJsonMessage, dispatch);
	}, [lastJsonMessage]);

	const handleGoToHost = () => {
		navigate(DashboardRoutes.Host);
	};

	const handleGoToDashboard = () => {
		navigate(DashboardRoutes.Dashboard);
	};

	const hostSelector = () => {
		if (!currentUser?.gameId) {
			return currentPageIsHost ? <Button onClick={handleGoToDashboard}>Player</Button> : <Button onClick={handleGoToHost}>Host</Button>;
		}
		return null;
	};

	return (
		<div>
			{hostSelector()}
			<Container maxWidth="xs">
				<Outlet />
			</Container>
		</div>
	);
};

export default DashboardPage;
