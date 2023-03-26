import * as React from 'react';
import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

interface IAppBar {
	gameName?: string;
	userName?: string;
	onUserLogout: () => void;
}
const AppBarComponent: FunctionComponent<IAppBar> = ({ gameName, userName, onUserLogout }) => {
	return (
		<Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						{userName}
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
						{gameName}
					</Typography>
					<Button color="inherit" onClick={onUserLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default AppBarComponent;
