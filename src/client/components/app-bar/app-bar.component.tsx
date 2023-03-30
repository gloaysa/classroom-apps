import * as React from 'react';
import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Box, SxProps } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface IAppBar {
	userName?: string;
	onUserLogout: () => void;
	onClickUsername: () => void;
}

const AppBarComponent: FunctionComponent<IAppBar> = ({ userName, onUserLogout, onClickUsername }) => {
	const stringToColor = (string: string): string => {
		let hash = 0;
		let i;

		/* eslint-disable no-bitwise */
		for (i = 0; i < string.length; i += 1) {
			hash = string.charCodeAt(i) + ((hash << 5) - hash);
		}

		let color = '#';

		for (i = 0; i < 3; i += 1) {
			const value = (hash >> (i * 8)) & 0xff;
			color += `00${value.toString(16)}`.slice(-2);
		}
		/* eslint-enable no-bitwise */

		return color;
	};

	const stringAvatar = (name: string | undefined) => {
		if (!name) {
			return '';
		}
		const firstPart = `${name.split(' ')[0][0]}`;
		const secondPart = `${name.split(' ')?.[1]?.[0] ?? ''}`;
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${firstPart.toUpperCase()}${secondPart.toUpperCase()}`,
		};
	};

	return (
		<AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
			<Toolbar sx={styles.toolbar}>
				<Box sx={styles.appBarLeft}></Box>
				<Box sx={styles.appBarCenter}>
					<IconButton color="inherit" onClick={onClickUsername} aria-label={userName} sx={{ margin: 0 }}>
						{userName}
					</IconButton>
				</Box>
				<Box sx={styles.appBarRight}>
					{userName ? (
						<IconButton color="inherit" onClick={onUserLogout}>
							<ExitToAppIcon />
						</IconButton>
					) : null}
				</Box>
			</Toolbar>
		</AppBar>
	);
};

const styles: Record<string, SxProps> = {
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	appBarLeft: {
		display: 'flex',
		justifyContent: 'flex-start',
		minWidth: '125px',
	},
	appBarCenter: {
		display: 'flex',
		justifyContent: 'center',
	},
	appBarRight: {
		display: 'flex',
		justifyContent: 'flex-end',
		minWidth: '125px',
	},
};

export default AppBarComponent;
