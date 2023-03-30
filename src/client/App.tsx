import React, { FunctionComponent, useEffect } from 'react';
import { selectUser } from './store/reducers/user.reducer';
import { createSearchParams, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MainRoutes } from './index.router';
import { DashboardRoutes } from './pages/dashboard/dashboard.router';
import { Alert, Box, Snackbar } from '@mui/material';
import { useGetUserIdHook } from './hooks/use-get-user-id.hook';
import { useUserHook } from './hooks/use-user.hook';
import { useSelector } from 'react-redux';
import AppBarComponent from './components/app-bar/app-bar.component';
import { selectLastMessage } from './store/reducers/main.reducer';
import { useAppDispatch } from './hooks/app-store.hook';
import { ClientMessagesTypes, MainActions, MainActionTypes } from '../common/actions/main.actions';
import NavigationBarComponent from './components/navigation-bar/navigation-bar.component';

const App: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const { userId, setUserId } = useGetUserIdHook();
	const { getUser, deleteUser } = useUserHook(dispatch);
	const currentUser = useSelector(selectUser);
	const lastError = useSelector(selectLastMessage);
	const currentPath = useLocation().pathname;
	const navigate = useNavigate();

	useEffect(() => {
		if (!userId) {
			navigate(MainRoutes.Login);
		} else if (!currentUser) {
			getUser(userId).then((action) => {
				if (action.type === MainActionTypes.SetMessage) {
					if (action.payload?.type === ClientMessagesTypes.Error) {
						setUserId('');
						navigate(MainRoutes.Login);
					}
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
				const notification: MainActions = {
					type: MainActionTypes.SetMessage,
					payload: {
						type: ClientMessagesTypes.Success,
						data: `${currentUser?.name} logged out!`,
					},
				};
				dispatch(notification);
			});
			setUserId(undefined);
			const params = { redirectUrl: currentPath };
			navigate({
				pathname: MainRoutes.Login,
				search: createSearchParams(params).toString(),
			});
		}
	};

	const handleOnClickUsername = () => {
		navigate(DashboardRoutes.Dashboard);
	};

	const handleDismissNotification = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch({ type: MainActionTypes.SetMessage });
	};

	return (
		<Box component="main" maxWidth="l">
			<Snackbar
				onClose={handleDismissNotification}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={!!lastError}
				autoHideDuration={3000}
			>
				<Alert onClose={handleDismissNotification} severity={lastError?.type}>
					{lastError?.data}
				</Alert>
			</Snackbar>
			<NavigationBarComponent />
			<Outlet />
			<AppBarComponent userName={currentUser?.name} onUserLogout={handleLogout} onClickUsername={handleOnClickUsername} />
		</Box>
	);
};

export default App;
