import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import MainInputComponent from '../../components/main-input/main-input.component';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { IWsMessage, WsMessageType } from '../../../common';
import { useSocketHook } from '../../hooks/use-socket.hook';

const BuzzerGame = () => {
	const currentUser = useSelector(selectUser);

	const { sendJsonMessage } = useSocketHook(currentUser);

	const handleSubmit = (name: string) => {
		const message: IWsMessage = {
			type: WsMessageType.JoinGame,
			data: {
				gameName: name,
			},
		};
		sendJsonMessage(message);
	};

	return (
		<Container>
			<CssBaseline />

			{currentUser?.gameId ? null : (
				<MainInputComponent
					title="Ask your teacher for the name"
					ctaLabel="start game"
					placeholder="name of the game"
					icon={<SportsEsportsIcon />}
					onSubmit={handleSubmit}
				/>
			)}
		</Container>
	);
};

export default BuzzerGame;
