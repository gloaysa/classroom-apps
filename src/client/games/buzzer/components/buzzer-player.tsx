import React, { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBuzzerOnOff } from '../../../store/reducers/config.reducer';
import BuzzerComponent, { BuzzerState } from '../../../components/buzzer/buzzer.component';

const BuzzerPlayer = () => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>('waiting');
	const buzzerOn = useSelector(selectBuzzerOnOff);

	useEffect(() => {
		setBuzzerState(buzzerOn ? 'ready' : 'waiting');
	}, [buzzerOn]);

	const handleClickBuzzer = () => {
		if (buzzerOn && buzzerState !== 'buzzed') {
			setBuzzerState('buzzed');
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

export default BuzzerPlayer;
