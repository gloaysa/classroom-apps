import React, { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import MainInputComponent from '../../components/main-input/main-input.component';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { IWsMessage, WsMessageType } from '../../../common';
import { useSocketHook } from '../../hooks/use-socket.hook';
import BuzzerComponent, { BuzzerState } from '../../components/buzzer/buzzer.component';
import { selectBuzzerOnOff } from '../../store/reducers/config.reducer';

const BuzzerGame = () => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>('waiting');
	const currentUser = useSelector(selectUser);
	const buzzerOn = useSelector(selectBuzzerOnOff);

	useEffect(() => {
		setBuzzerState(buzzerOn ? 'ready' : 'waiting');
	}, [buzzerOn]);

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

	const handleClickBuzzer = () => {
		if (buzzerOn && buzzerState !== 'buzzed') {
			setBuzzerState('buzzed');
		}
	};

	return (
		<Container>
			<CssBaseline />

			{currentUser?.gameId ? (
				<BuzzerComponent onClick={handleClickBuzzer} state={buzzerState} />
			) : (
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
