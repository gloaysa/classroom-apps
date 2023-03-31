import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Container, SxProps } from '@mui/material';
import { useSelector } from 'react-redux';
import BuzzerComponent, { BuzzerState } from '../../../components/buzzer/buzzer.component';
import { selectBuzzerOnOff } from '../../../store/reducers/buzzer.reducer';
import { IUser } from '../../../../common/interfaces/user.interface';
import { BuzzerGameActionTypes } from '../../../../common/actions/buzzer-game.actions';
import { StoreActions } from '../../../../common/actions';

interface IBuzzerPlayer {
	sendMessage: (action: StoreActions) => void;
	player: IUser;
}

const BuzzerPlayer: FunctionComponent<IBuzzerPlayer> = ({ sendMessage, player }) => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>();
	const buzzerOn = useSelector(selectBuzzerOnOff);

	useEffect(() => {
		const userHasBuzzed = !!player.updatedAt;
		if (userHasBuzzed && buzzerOn) {
			return setBuzzerState('buzzed');
		}
		buzzerOn ? setBuzzerState('ready') : setBuzzerState('waiting');
	}, [buzzerOn, player.updatedAt]);

	if (buzzerOn === undefined) {
		return null;
	}
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
