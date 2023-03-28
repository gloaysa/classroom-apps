import React from 'react';
import { Box, Container, CssBaseline, FormControlLabel, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/reducers/user.reducer';
import { IWsMessage } from '../../../../common';
import UserListComponent from '../../../components/user-list/user-list.component';
import { BuzzerMessages } from '../../../../common/interfaces/messages';

const BuzzerHost = () => {
	const currentUser = useSelector(selectUser);

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
			<CssBaseline />
			<FormControlLabel
				disabled={!currentUser?.players?.length}
				control={<Switch defaultChecked={false} onChange={handleBuzzers} />}
				label="Buzzers are..."
			/>
			<Box sx={{ marginTop: '15px' }}>
				<UserListComponent />
			</Box>
		</Container>
	);
};

export default BuzzerHost;
