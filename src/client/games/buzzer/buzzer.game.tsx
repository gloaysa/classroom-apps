import React, { useEffect, useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import MainInputComponent from '../../components/main-input/main-input.component';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { IWsMessage } from '../../../common';
import { useSocketHook } from '../../hooks/use-socket.hook';
import BuzzerComponent, { BuzzerState } from '../../components/buzzer/buzzer.component';
import { selectBuzzerOnOff } from '../../store/reducers/config.reducer';
import { BuzzerMessages, UserMessages } from '../../../common/interfaces/messages';

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
			type: UserMessages.UserJoinGame,
			data: {
				gameName: name,
			},
		};
		sendJsonMessage(message);
	};

	const handleClickBuzzer = () => {
		if (buzzerOn && buzzerState !== 'buzzed') {
			setBuzzerState('buzzed');
			const message: IWsMessage = {
				type: BuzzerMessages.BuzzerBuzzed,
				data: true,
			};
			sendJsonMessage(message);
		}
	};

	return (
		<Container>
			<CssBaseline />

			{currentUser?.gameId ? (
				<Container>
					<Box sx={{ marginTop: '85px' }}>
						<BuzzerComponent onClick={handleClickBuzzer} state={buzzerState} />
					</Box>
				</Container>
			) : (
				<MainInputComponent
					title="Ask your teacher for the code"
					ctaLabel="join game"
					placeholder="code of the game"
					icon={<SportsEsportsIcon />}
					onSubmit={handleSubmit}
				/>
			)}
		</Container>
	);
};

export default BuzzerGame;
