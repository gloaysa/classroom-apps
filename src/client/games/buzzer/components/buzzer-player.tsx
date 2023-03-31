import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Container, SxProps } from '@mui/material';
import BuzzerComponent, { BuzzerState } from '../../../components/buzzer/buzzer.component';
import { IUser } from '../../../../common/interfaces/user.interface';
import { BuzzerGameActionTypes } from '../../../../common/actions/buzzer-game.actions';
import { StoreActions } from '../../../../common/actions';

interface IBuzzerPlayer {
	sendMessage: (action: StoreActions) => void;
	player: IUser;
	buzzerOn: boolean;
}

const BuzzerPlayer: FunctionComponent<IBuzzerPlayer> = ({ sendMessage, player, buzzerOn }) => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>();

	useEffect(() => {
		const userHasBuzzed = !!player.updatedAt;
		if (userHasBuzzed && buzzerOn) {
			return setBuzzerState('buzzed');
		}
		buzzerOn ? setBuzzerState('ready') : setBuzzerState('waiting');
	}, [buzzerOn, player.updatedAt]);

	const handleClickBuzzer = () => {
		if (buzzerOn && buzzerState !== 'buzzed') {
			setBuzzerState('buzzed');
			sendMessage({ type: BuzzerGameActionTypes.BuzzerBuzzed, payload: new Date().toISOString() });
		}
	};

	return (
		<Container>
			<Box sx={styles.buzzerBox}>
				<BuzzerComponent onClick={handleClickBuzzer} state={buzzerState} />
			</Box>
		</Container>
	);
};

const styles: Record<string, SxProps> = {
	buzzerBox: {
		marginTop: '85px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
};
export default BuzzerPlayer;
