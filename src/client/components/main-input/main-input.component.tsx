import React, { FunctionComponent, useState } from 'react';
import { Avatar, Box, Button, TextField, Typography } from '@mui/material';

interface IMainInputComponent {
	onSubmit: (input: string) => void;
	title: string;
	placeholder: string;
	ctaLabel: string;
	icon: JSX.Element;
}

const MainInputComponent: FunctionComponent<IMainInputComponent> = ({ title, placeholder, ctaLabel, onSubmit, icon }) => {
	const [userInput, setUserInput] = useState('');
	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const name = event.target.value;
		if (name?.length >= 3) {
			setUserInput(name);
		}
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const name = data.get('gameName');
		if (name && typeof name === 'string') {
			onSubmit(name);
		}
	};

	return (
		<Box
			sx={{
				marginTop: 8,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{icon}</Avatar>
			<Typography component="h1" variant="h5">
				{title}
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					label={placeholder}
					margin="normal"
					required
					fullWidth
					id="gameName"
					name="gameName"
					autoComplete="username"
					autoFocus
					onChange={handleInputChange}
				/>
				<Button type="submit" fullWidth variant="contained" disabled={!userInput} sx={{ mt: 3, mb: 2 }}>
					{ctaLabel}
				</Button>
			</Box>
		</Box>
	);
};

export default MainInputComponent;
