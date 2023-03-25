import './App.css';
import React, { FunctionComponent, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUserList } from './store/reducers/user.reducer';
import { Outlet, useNavigate } from 'react-router-dom';

const WS_URL = 'ws://127.0.0.1:8050';

const queryParams = {
	user_id: uuidv4(),
	username: 'username',
};
const App: FunctionComponent = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const { lastJsonMessage } = useWebSocket<any>(WS_URL, {
		onOpen: (event) => {
			console.log('WebSocket connection established.', event);
		},
		queryParams,
	});

	useEffect(() => {
		if (!currentUser) {
			navigate('/login');
		}
	}, []);

	useEffect(() => {
		if (lastJsonMessage !== null) {
			console.log(lastJsonMessage);
			switch (lastJsonMessage.type) {
				case 'user':
					dispatch(updateUserList(lastJsonMessage.data));
			}
		}
	}, [lastJsonMessage]);

	return (
		<div className="app" role="main">
			<article className="app__article">
				<Outlet />
			</article>
		</div>
	);
};

export default App;
