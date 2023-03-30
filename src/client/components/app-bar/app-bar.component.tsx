import * as React from 'react';
import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Typography } from '@mui/material';

interface IAppBar {
	userName?: string;
	onUserLogout: () => void;
	onClickUsername: () => void;
}
const AppBarComponent: FunctionComponent<IAppBar> = ({ userName, onUserLogout, onClickUsername }) => {
	return (
		<Box sx={{ flexGrow: 1, marginBottom: '20px' }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton onClick={onClickUsername} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						{userName}
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}></Typography>
					{userName ? (
						<Button color="inherit" onClick={onUserLogout}>
							Logout
						</Button>
					) : null}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default AppBarComponent;
