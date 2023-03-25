import React, { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/reducers/user.reducer';
import { v4 as uuidv4 } from 'uuid';

const LoginPage = () => {
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const user = data.get('username');
		if (user && typeof user === 'string') {
			const newUser = {
				id: uuidv4(),
				name: user,
			};
			dispatch(setUser(newUser));
			navigate('/dashboard');
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const user = event.target.value;
		if (user?.length >= 3) {
			setUsername(user);
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
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Choose an username
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						label="username"
						margin="normal"
						required
						fullWidth
						id="username"
						name="username"
						autoComplete="username"
						autoFocus
						onChange={handleInputChange}
					/>
					<Button type="submit" fullWidth variant="contained" disabled={!username} sx={{ mt: 3, mb: 2 }}>
						Go!
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
