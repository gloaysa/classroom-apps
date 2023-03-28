import React from 'react';
import { Box, Container, CssBaseline, FormControlLabel, Switch } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../store/reducers/user.reducer';
import UserListComponent from '../../../components/user-list/user-list.component';
import { selectPlayers } from '../../../store/reducers/room.reducer';

const BuzzerHost = () => {
	const currentUser = useSelector(selectUser);
	const players = useSelector(selectPlayers);

	return (
		<Container>
			<CssBaseline />
			<FormControlLabel
				disabled={!currentUser?.players?.length}
				control={<Switch defaultChecked={false} onChange={() => console.log('buzzed')} />}
				label="Buzzers are..."
			/>
			<Box sx={{ marginTop: '15px' }}>
				<UserListComponent players={players} />
			</Box>
		</Container>
	);
};

export default BuzzerHost;
