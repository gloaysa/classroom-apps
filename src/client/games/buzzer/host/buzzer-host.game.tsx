import React from 'react';
import { Avatar, Box, Button, Container, CssBaseline, FormControlLabel, Switch, Typography } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useSocketHook } from '../../../hooks/use-socket.hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../../store/reducers/user.reducer';
import { IWsMessage } from '../../../../common';
import UserListComponent from '../../../components/user-list/user-list.component';
import { BuzzerMessages } from '../../../../common/interfaces/messages';
import { useGameHook } from '../../../hooks/use-game.hook';

const BuzzerHostGame = () => {
	const currentUser = useSelector(selectUser);
	const dispatch = useDispatch();
	const { createGame } = useGameHook(dispatch);

	const { sendJsonMessage } = useSocketHook(currentUser);

	const handleSubmit = (name: string) => {
		if (currentUser) {
			createGame(currentUser).then((gameId) => console.log(gameId));
		}
	};

	const handleBuzzers = (event: React.ChangeEvent<HTMLInputElement>) => {
		const message: IWsMessage = {
			type: BuzzerMessages.BuzzerOnOff,
			data: {
				state: event.target.checked,
			},
		};
		sendJsonMessage(message);
	};

	return (
		<Container>
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<EmojiPeopleIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					You are the host
				</Typography>

				<Typography component="p">
					You can create a new game. A game code will be given to you in the next page, share that code with your players so they can join.
				</Typography>

				<Box sx={{ mt: 1 }}>
					<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
						Create new Game
					</Button>
				</Box>
			</Box>

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

export default BuzzerHostGame;
