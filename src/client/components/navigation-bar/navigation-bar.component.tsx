import React from 'react';
import { Button, Container, SxProps } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { MainRoutes } from '../../index.router';
import { useLocation } from 'react-router-dom';
import { DashboardRoutes } from '../../pages/dashboard/dashboard.router';

const NavigationBarComponent = () => {
	const currentPath = useLocation().pathname;

	if (currentPath === MainRoutes.Login || currentPath === DashboardRoutes.Dashboard) {
		return null;
	}

	return (
		<Container sx={styles.navigation}>
			<Button aria-label="back" startIcon={<ArrowBackIosIcon />}>
				Back
			</Button>
		</Container>
	);
};

const styles: Record<string, SxProps> = {
	navigation: {
		display: 'flex',
		justifyContent: 'flex-start',
		padding: '5px',
	},
};

export default NavigationBarComponent;
