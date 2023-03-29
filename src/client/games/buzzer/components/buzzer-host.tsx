import React, { FunctionComponent } from 'react';
import { Box, Container, CssBaseline, FormControlLabel, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import UserListComponent from '../../../components/user-list/user-list.component';
import { selectPlayers } from '../../../store/reducers/room.reducer';
import { SendJsonMessage } from 'react-use-websocket/src/lib/types';
import { BuzzerMessages } from '../../../../common/interfaces/messages';
import { selectBuzzerOnOff } from '../../../store/reducers/config.reducer';

interface IBuzzerHost {
	sendMessage: SendJsonMessage;
}

const BuzzerHost: FunctionComponent<IBuzzerHost> = ({ sendMessage }) => {
	const players = useSelector(selectPlayers);
	const buzzerOn = useSelector(selectBuzzerOnOff);

	const handleBuzzerSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		sendMessage({ type: BuzzerMessages.BuzzerOnOff, data: event.target.checked });
	};

	return (
		<Container>
			<CssBaseline />
			<FormControlLabel
				disabled={!players?.length}
				control={<Switch checked={buzzerOn} onChange={handleBuzzerSwitch} />}
				label="Buzzers are..."
				labelPlacement="start"
			/>
			<Box sx={{ marginTop: '15px' }}>
				Connected players
				<UserListComponent players={players.filter((player) => player.connected)} buzzerOn={buzzerOn} />
			</Box>
			<Box sx={{ marginTop: '15px' }}>
				Disconnected players
				<UserListComponent players={players.filter((player) => !player.connected)} buzzerOn={buzzerOn} />
			</Box>
		</Container>
	);
};

export default BuzzerHost;
