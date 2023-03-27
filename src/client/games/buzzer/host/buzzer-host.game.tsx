import React from 'react';
import { Box, Container, CssBaseline, FormControlLabel, Switch } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { useSocketHook } from '../../../hooks/use-socket.hook';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUserAction } from '../../../store/reducers/user.reducer';
import { IWsMessage } from '../../../../common';
import MainInputComponent from '../../../components/main-input/main-input.component';
import UserListComponent from '../../../components/user-list/user-list.component';
import { BuzzerMessages } from '../../../../common/interfaces/messages';

const BuzzerHostGame = () => {
	const currentUser = useSelector(selectUser);
	const dispatch = useDispatch();

	const { sendJsonMessage } = useSocketHook(currentUser);

	const handleSubmit = (name: string) => {
		const message: IWsMessage = {
			type: BuzzerMessages.BuzzerNewGame,
			data: {
				gameName: name,
			},
		};
		if (currentUser) {
			dispatch(setUserAction({ ...currentUser, isHost: true }));
			sendJsonMessage(message);
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
			{currentUser?.gameId ? (
				<Container>
					<FormControlLabel
						disabled={!currentUser?.players?.length}
						control={<Switch defaultChecked={false} onChange={handleBuzzers} />}
						label="Buzzers are..."
					/>
					<Box sx={{ marginTop: '15px' }}>
						<UserListComponent />
					</Box>
				</Container>
			) : (
				<MainInputComponent
					title="You are the host"
					ctaLabel="start new game"
					placeholder="name your game"
					icon={<EmojiPeopleIcon />}
					onSubmit={handleSubmit}
				/>
			)}
		</Container>
	);
};

export default BuzzerHostGame;
