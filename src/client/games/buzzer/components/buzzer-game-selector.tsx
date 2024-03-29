import React, { FunctionComponent } from 'react';
import {
	Avatar,
	Box,
	Button,
	Container,
	CssBaseline,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import MainInputComponent from '../../../components/main-input/main-input.component';
import TabsComponent from '../../../components/tabs/tabs.component';
import { IUser } from '../../../../common/interfaces/user.interface';
import { Link } from 'react-router-dom';
import { BuzzerRoutes } from '../buzzer.router';

interface IBuzzerGameSelector {
	onCreateGame: () => void;
	onJoinGame: (code: string) => void;
	currentUser: IUser;
}

const BuzzerGameSelector: FunctionComponent<IBuzzerGameSelector> = ({
	currentUser,
	onCreateGame,
	onJoinGame,
}) => {
	const tabs = [
		{
			title: 'Join game',
			element: <GameSelectorJoin currentUser={currentUser} onJoinGame={onJoinGame} />,
		},
		{
			title: 'Create Game',
			element: <GameSelectorHost onCreateGame={onCreateGame} />,
		},
	];

	return (
		<Container>
			<CssBaseline />
			<TabsComponent tabs={tabs} />
		</Container>
	);
};

const GameSelectorHost: FunctionComponent<{ onCreateGame: () => void }> = ({ onCreateGame }): JSX.Element => {
	return (
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
				You can create a new game. A game code will be given to you in the next page, share that code with
				your players so they can join.
			</Typography>

			<Box sx={{ mt: 1 }}>
				<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={onCreateGame}>
					Create new Game
				</Button>
			</Box>
		</Box>
	);
};

const GameSelectorJoin: FunctionComponent<{ currentUser: IUser; onJoinGame: (roomId: string) => void }> = ({
	onJoinGame,
	currentUser,
}): JSX.Element => {
	const validateInput = (input: string): boolean => {
		const codeValidation = /^[a-zA-Z0-9]{4}$/;
		return !!input.match(codeValidation);
	};
	return (
		<Box>
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

			{currentUser.roomIds.length ? (
				<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
					<ListItemText primary="Previously joined rooms" />
					{currentUser.roomIds.map((id) => {
						return (
							<ListItem key={id} disablePadding>
								<ListItemButton>
									{currentUser.hostingRooms.includes(id) ? (
										<ListItemIcon>
											<AdminPanelSettingsIcon />
										</ListItemIcon>
									) : null}
									<ListItemText inset={!currentUser.hostingRooms.includes(id)}>
										<Link key={id} to={`${BuzzerRoutes.Room}/${id}`}>
											{id}
										</Link>
									</ListItemText>
								</ListItemButton>
							</ListItem>
						);
					})}
				</List>
			) : null}
		</Box>
	);
};

export default BuzzerGameSelector;
