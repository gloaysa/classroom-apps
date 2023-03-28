import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { handleLastJsonMessageUtil } from './handle-last-json-message.util';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSocketHook } from '../../hooks/use-socket.hook';
import { Container } from '@mui/material';
import { BuzzerRoutes } from '../../games/buzzer/buzzer.router';

const DashboardPage = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectUser);
	const { lastJsonMessage } = useSocketHook(currentUser);
	const navigate = useNavigate();

	useEffect(() => {
		handleLastJsonMessageUtil(lastJsonMessage, dispatch);
		navigate(BuzzerRoutes.Main);
	}, [lastJsonMessage]);

	return (
		<div>
			<Container maxWidth="xs">
				<Outlet />
			</Container>
		</div>
	);
};

export default DashboardPage;
