import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Container, CssBaseline, FormControlLabel, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import UserListComponent from '../../../components/user-list/user-list.component';
import { selectPlayers } from '../../../store/reducers/room.reducer';
import { selectBuzzerOnOff } from '../../../store/reducers/buzzer.reducer';
import { BuzzerGameActionTypes } from '../../../../common/actions/buzzer-game.actions';
import { StoreActions } from '../../../../common/actions';

interface IBuzzerHost {
	sendMessage: (action: StoreActions) => void;
}

const BuzzerHost: FunctionComponent<IBuzzerHost> = ({ sendMessage }) => {
	const [switchOn, setSwitchOn] = useState(false);
	const players = useSelector(selectPlayers);
	const buzzerOn = useSelector(selectBuzzerOnOff);

	useEffect(() => {
		setSwitchOn(buzzerOn);
	}, [buzzerOn]);

	const handleBuzzerSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		sendMessage({ type: BuzzerGameActionTypes.SetBuzzerOnOff, payload: event.target.checked });
	};

	return (
		<Container>
			<CssBaseline />
			<FormControlLabel
				disabled={!players?.length}
				control={<Switch checked={switchOn} onChange={handleBuzzerSwitch} />}
				label="Buzzers are..."
				labelPlacement="start"
			/>
			<Box sx={{ marginTop: '15px' }}>
				<UserListComponent
					players={players.filter((player) => player.connected)}
					buzzerOn={buzzerOn}
					showStar={buzzerOn}
					listName="Connected players"
				/>
			</Box>
			<Box sx={{ marginTop: '15px' }}>
				<UserListComponent
					players={players.filter((player) => !player.connected)}
					buzzerOn={buzzerOn}
					listName="Disconnected players"
				/>
			</Box>
		</Container>
	);
};

export default BuzzerHost;
