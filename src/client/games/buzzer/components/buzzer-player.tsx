import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectBuzzerOnOff } from '../../../store/reducers/config.reducer';
import BuzzerComponent, { BuzzerState } from '../../../components/buzzer/buzzer.component';
import { SendJsonMessage } from 'react-use-websocket/src/lib/types';
import { BuzzerMessages } from '../../../../common/interfaces/messages';
import { IUser } from '../../../../common';

interface IBuzzerPlayer {
	sendMessage: SendJsonMessage;
	player: IUser;
}
const BuzzerPlayer: FunctionComponent<IBuzzerPlayer> = ({ sendMessage, player }) => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>('waiting');
	const buzzerOn = useSelector(selectBuzzerOnOff);

	useEffect(() => {
		const userHasBuzzed = !!player.updatedAt;
		if (buzzerOn) {
			setBuzzerState('ready');
		}
		if (userHasBuzzed && buzzerOn) {
			setBuzzerState('buzzed');
		}
		if (!buzzerOn) {
			setBuzzerState('waiting');
		}
	}, [buzzerOn, player.updatedAt]);

	const handleClickBuzzer = () => {
		if (buzzerOn && buzzerState !== 'buzzed') {
			setBuzzerState('buzzed');
			sendMessage({ type: BuzzerMessages.BuzzerBuzzed });
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
