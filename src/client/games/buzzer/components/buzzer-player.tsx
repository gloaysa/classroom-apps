import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBuzzerOnOff } from '../../../store/reducers/config.reducer';
import { BuzzerMessages } from '../../../../common/interfaces/messages';
import BuzzerComponent, { BuzzerState } from '../../../components/buzzer/buzzer.component';
import { IWsMessage } from '../../../../common';

const BuzzerPlayer = () => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>('waiting');
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

	const handleBuzzers = (event: React.ChangeEvent<HTMLInputElement>) => {
		const message: IWsMessage = {
			type: BuzzerMessages.BuzzerOnOff,
			data: {
				state: event.target.checked,
			},
		};
	};

	return (
		<Container>
			<Box sx={{ marginTop: '85px' }}>
				<BuzzerComponent onClick={handleClickBuzzer} state={buzzerState} />
			</Box>
		</Container>
	);
};

export default BuzzerPlayer;
