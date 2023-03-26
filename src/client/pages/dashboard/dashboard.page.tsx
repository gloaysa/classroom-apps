import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanState, selectUser } from '../../store/reducers/user.reducer';
import { handleLastJsonMessageUtil } from './handle-last-json-message.util';
import { createSearchParams, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useSocketHook } from '../../hooks/use-socket.hook';
import { Button, Container } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { User, WsMessageType } from '../../../common';
import { MainRoutes } from '../../index.router';
import { DashboardRoutes } from './dashboard.router';
import AppBarComponent from '../../components/app-bar/app-bar.component';

const DashboardPage = () => {
	const [userLocalStorage, setUserLocalStorage] = useLocalStorage<User | undefined>('user', undefined);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const { lastJsonMessage, sendJsonMessage } = useSocketHook(currentUser);
	const currentPath = useLocation().pathname;
	const currentPageIsHost = currentPath.match(/\/host$/);

	useEffect(() => {
		handleLastJsonMessageUtil(lastJsonMessage, dispatch);
	}, [lastJsonMessage]);

	const handleLogout = () => {
		dispatch(cleanState());
		setUserLocalStorage(undefined);
		sendJsonMessage({
			type: WsMessageType.UserLogout,
		});
		const params = { redirectUrl: currentPath };
		navigate({
			pathname: MainRoutes.Login,
			search: createSearchParams(params).toString(),
		});
	};

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
			<AppBarComponent gameName={currentUser?.gameId} onUserLogout={handleLogout} />
			{hostSelector()}
			<Container maxWidth="xs">
				<Outlet />
			</Container>
		</div>
	);
};

export default DashboardPage;
