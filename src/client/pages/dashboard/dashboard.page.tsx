import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import useWebSocket from 'react-use-websocket';
import { handleLastJsonMessageUtil } from './handle-last-json-message.util';

const WS_URL = 'ws://127.0.0.1:8050';
const DashboardPage = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(selectUser);
	const { lastJsonMessage } = useWebSocket<any>(WS_URL, {
		onOpen: (event) => {
			console.info('WebSocket connection established.', event);
		},
		queryParams: {
			user: JSON.stringify(currentUser),
		},
	});

	useEffect(() => {
		handleLastJsonMessageUtil(lastJsonMessage, dispatch);
	}, [lastJsonMessage]);

	return <div>dashboard</div>;
};

export default DashboardPage;
