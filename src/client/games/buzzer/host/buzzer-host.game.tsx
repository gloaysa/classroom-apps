import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { DashboardRoutes } from '../../../pages/dashboard/dashboard.router';

const BuzzerHostGame = () => {
	const [gameName, setGameName] = useState('');
	const navigate = useNavigate();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const name = data.get('gameName');
		if (name && typeof name === 'string') {
			navigate(DashboardRoutes.Dashboard);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const name = event.target.value;
		if (name?.length >= 3) {
			setGameName(name);
		}
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
					<SportsEsportsIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Name your game
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						label="name your game"
						margin="normal"
						required
						fullWidth
						id="gameName"
						name="gameName"
						autoComplete="username"
						autoFocus
						onChange={handleInputChange}
					/>
					<Button type="submit" fullWidth variant="contained" disabled={!gameName} sx={{ mt: 3, mb: 2 }}>
						Start Game
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default BuzzerHostGame;
