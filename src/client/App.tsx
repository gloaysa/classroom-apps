import './App.scss';
import React, { FunctionComponent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from './store/reducers/user.reducer';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { MainRoutes } from './index.router';

const App: FunctionComponent = () => {
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);

	useEffect(() => {
		if (!currentUser) {
			navigate(MainRoutes.Login);
		}
	}, []);

	return (
		<div className="app" role="main">
			<Container component="main" maxWidth="xs">
				<Outlet />
			</Container>
		</div>
	);
};

export default App;
