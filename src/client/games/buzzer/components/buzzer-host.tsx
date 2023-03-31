import React, { FunctionComponent, useEffect, useState } from 'react';
import { Box, Container, CssBaseline, FormControlLabel, Switch } from '@mui/material';
import UserListComponent from '../../../components/user-list/user-list.component';
import { BuzzerGameActionTypes } from '../../../../common/actions/buzzer-game.actions';
import { StoreActions } from '../../../../common/actions';
import { IUser } from '../../../../common/interfaces/user.interface';

interface IBuzzerHost {
	sendMessage: (action: StoreActions) => void;
	players: IUser[];
	buzzerOn: boolean;
}

const BuzzerHost: FunctionComponent<IBuzzerHost> = ({ sendMessage, players, buzzerOn }) => {
	const [switchOn, setSwitchOn] = useState<boolean | undefined>();

	useEffect(() => {
		setSwitchOn(buzzerOn);
	}, [buzzerOn]);

	if (switchOn === undefined || buzzerOn === undefined) {
		return null;
	}

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
					showColorStatus={buzzerOn}
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
