import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, CssBaseline } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useSocketHook } from '../../../hooks/use-socket.hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../../store/reducers/user.reducer';
import { IWsMessage, WsMessageType } from '../../../../common';
import MainInputComponent from '../../../components/main-input/main-input.component';
import UserListComponent from '../../../components/user-list/user-list.component';

const BuzzerHostGame = () => {
	const currentUser = useSelector(selectUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { sendJsonMessage } = useSocketHook(currentUser);

	const handleSubmit = (name: string) => {
		const message: IWsMessage = {
			type: WsMessageType.NewGame,
			data: {
				gameName: name,
			},
		};
		if (currentUser) {
			dispatch(setUser({ ...currentUser, isHost: true }));
			sendJsonMessage(message);
		}
	};

	return (
		<Container>
			<CssBaseline />

			{currentUser?.gameId ? (
				<UserListComponent />
			) : (
				<MainInputComponent
					title="Name your game"
					ctaLabel="start game"
					placeholder="name your game"
					icon={<SportsEsportsIcon />}
					onSubmit={handleSubmit}
				/>
			)}
		</Container>
	);
};

export default BuzzerHostGame;
