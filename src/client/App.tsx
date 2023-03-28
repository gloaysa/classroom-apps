import React, { FunctionComponent, useEffect } from 'react';
import { cleanStateAction, selectUser } from './store/reducers/user.reducer';
import { createSearchParams, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainRoutes } from './index.router';
import { DashboardRoutes } from './pages/dashboard/dashboard.router';
import { Alert, Box, Snackbar } from '@mui/material';
import { useGetUserIdHook } from './hooks/use-get-user-id.hook';
import { useUserHook } from './hooks/use-user.hook';
import { useDispatch, useSelector } from 'react-redux';
import AppBarComponent from './components/app-bar/app-bar.component';
import { selectLastError, setLastErrorAction } from './store/reducers/main.reducer';

const App: FunctionComponent = () => {
	const dispatch = useDispatch();
	const { userId, setUserId } = useGetUserIdHook();
	const { getUser, deleteUser } = useUserHook(dispatch);
	const currentUser = useSelector(selectUser);
	const lastError = useSelector(selectLastError);
	const currentPath = useLocation().pathname;
	const navigate = useNavigate();

	useEffect(() => {
		if (!userId) {
			navigate(MainRoutes.Login);
		} else if (!currentUser) {
			getUser(userId).then((user) => {
				if (!user) {
					setUserId('');
					navigate(MainRoutes.Login);
				}
			});
		}
		if (currentPath === '/') {
			navigate(DashboardRoutes.Dashboard);
		}
	}, [currentUser, userId]);

	const handleLogout = () => {
		if (userId) {
			deleteUser(userId).then(() => {
				setUserId(undefined);
				dispatch(cleanStateAction());
				console.log('called');
				const params = { redirectUrl: currentPath };
				navigate({
					pathname: MainRoutes.Login,
					search: createSearchParams(params).toString(),
				});
			});
		}
	};

	const handleDismissNotification = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		dispatch(setLastErrorAction(undefined));
	};

	return (
		<Box component="main" maxWidth="l">
			<AppBarComponent userName={currentUser?.name} gameName={currentUser?.gameId} onUserLogout={handleLogout} />
			<Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={!!lastError} autoHideDuration={6000}>
				<Alert onClose={handleDismissNotification} severity={lastError?.type}>
					{lastError?.message}
				</Alert>
			</Snackbar>
			<Outlet />
		</Box>
	);
};

export default App;
