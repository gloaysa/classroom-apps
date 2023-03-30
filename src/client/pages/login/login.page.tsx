import React, { useEffect, useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DashboardRoutes } from '../dashboard/dashboard.router';
import { useUserHook } from '../../hooks/use-user.hook';
import { useGetUserIdHook } from '../../hooks/use-get-user-id.hook';
import { verifyUsernameUtil } from '../../../common/utils/verify-username.util';
import { useAppDispatch } from '../../hooks/app-store.hook';
import { UserActionTypes } from '../../../common/actions/user.actions';

const LoginPage = () => {
	const { userId, setUserId } = useGetUserIdHook();
	const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
	const [username, setUsername] = useState('');
	const [searchParams] = useSearchParams();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { createUser } = useUserHook(dispatch);
	const showError = username?.length >= 3 && !verifyUsernameUtil(username);
	const errorHelperText = 'Username must have between 3 and 15 letters';

	useEffect(() => {
		setRedirectUrl(searchParams.get('redirectUrl'));
	}, []);

	useEffect(() => {
		if (userId) {
			if (redirectUrl) {
				return navigate(redirectUrl);
			}
			navigate(DashboardRoutes.Dashboard);
		}
	}, [userId]);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const username = data.get('username');

		if (username && typeof username === 'string') {
			createUser(username).then((action) => {
				if (action.type === UserActionTypes.SetUser) {
					setUserId(action.payload?.id);
				}
			});
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const user = event.target.value;
		setUsername(user);
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
						error={showError}
						helperText={errorHelperText}
					/>
					<Button type="submit" fullWidth variant="contained" disabled={!verifyUsernameUtil(username)} sx={{ mt: 3, mb: 2 }}>
						Go!
					</Button>
				</Box>
			</Box>
		</Container>
	);
};

export default LoginPage;
