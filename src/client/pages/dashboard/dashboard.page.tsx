import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { BuzzerRoutes } from '../../games/buzzer/buzzer.router';

const DashboardPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate(BuzzerRoutes.Lobby);
	}, []);

	return (
		<div>
			<Container maxWidth="xs">
				<Outlet />
			</Container>
		</div>
	);
};

export default DashboardPage;
