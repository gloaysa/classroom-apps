import React, { FunctionComponent } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, Typography } from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import MainInputComponent from '../../../components/main-input/main-input.component';

interface IBuzzerGameSelector {
	onCreateGame: () => void;
	createGameMode: boolean;
	onJoinGame: (code: string) => void;
}
const BuzzerGameSelector: FunctionComponent<IBuzzerGameSelector> = ({ onCreateGame, createGameMode, onJoinGame }) => {
	const validateInput = (input: string): boolean => {
		const codeValidation = /^[a-zA-Z0-9]{4}$/;
		return !!input.match(codeValidation);
	};

	return (
		<Container>
			<CssBaseline />
			{createGameMode ? (
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
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={onCreateGame}>
							Create new Game
						</Button>
					</Box>
				</Box>
			) : (
				<MainInputComponent
					title="Ask your teacher for the code"
					ctaLabel="join game"
					placeholder="Code of the game"
					icon={<SportsEsportsIcon />}
					onSubmit={onJoinGame}
					validateInput={validateInput}
					helperText="4 letters and/or numbers. E.g: eCT4"
					minLength={4}
				/>
			)}
		</Container>
	);
};

export default BuzzerGameSelector;
