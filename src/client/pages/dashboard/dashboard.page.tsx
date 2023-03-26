import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanState, selectUser } from '../../store/reducers/user.reducer';
import { handleLastJsonMessageUtil } from './handle-last-json-message.util';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSocketHook } from '../../hooks/use-socket.hook';
import { Button } from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { User, WsMessageType } from '../../../common';
import { MainRoutes } from '../../index.router';
import { DashboardRoutes } from './dashboard.router';

const DashboardPage = () => {
	const [userLocalStorage, setUserLocalStorage] = useLocalStorage<User | undefined>('user', undefined);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const { lastJsonMessage, sendJsonMessage, getWebSocket } = useSocketHook(currentUser);

	useEffect(() => {
		handleLastJsonMessageUtil(lastJsonMessage, dispatch);
	}, [lastJsonMessage]);

	const handleLogout = () => {
		dispatch(cleanState());
		setUserLocalStorage(undefined);
		sendJsonMessage({
			type: WsMessageType.UserLogout,
		});
		getWebSocket()?.close();
		navigate(MainRoutes.Login);
	};

	const handleGoToHost = () => {
		navigate(DashboardRoutes.Host);
	};

	return (
		<div>
			<h1>dashboard</h1>
			<Button onClick={handleLogout}>Logout</Button>
			<Button onClick={handleGoToHost}>Host</Button>
			<Outlet />
		</div>
	);
};

export default DashboardPage;
