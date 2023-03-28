import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { IWsMessage } from '../../../common';
import BuzzerComponent, { BuzzerState } from '../../components/buzzer/buzzer.component';
import { selectBuzzerOnOff } from '../../store/reducers/config.reducer';
import { BuzzerMessages } from '../../../common/interfaces/messages';

const BuzzerPlayerGame = () => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>('waiting');
	const currentUser = useSelector(selectUser);
	const buzzerOn = useSelector(selectBuzzerOnOff);

	useEffect(() => {
		setBuzzerState(buzzerOn ? 'ready' : 'waiting');
	}, [buzzerOn]);

	const handleClickBuzzer = () => {
		if (buzzerOn && buzzerState !== 'buzzed') {
			setBuzzerState('buzzed');
			const message: IWsMessage = {
				type: BuzzerMessages.BuzzerBuzzed,
				data: true,
			};
			console.log(message);
		}
	};

	return (
		<Container>
			<Box sx={{ marginTop: '85px' }}>
				<BuzzerComponent onClick={handleClickBuzzer} state={buzzerState} />
			</Box>
		</Container>
	);
};

export default BuzzerPlayerGame;
