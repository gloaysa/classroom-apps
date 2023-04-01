import React, { FunctionComponent, useEffect } from 'react';
import { Alert, Box, Collapse } from '@mui/material';
import { IClientMessages } from '../../../common/actions/main.actions';

interface IAlertComponent {
	message: IClientMessages | undefined;
	handleDismissNotification: (event?: React.SyntheticEvent) => void;
	autoHideDuration?: number;
}

const AlertComponent: FunctionComponent<IAlertComponent> = ({
	message,
	handleDismissNotification,
	autoHideDuration = 3000,
}) => {
	useEffect(() => {
		if (message) {
			setTimeout(() => {
				handleDismissNotification();
			}, autoHideDuration);
		}
	}, [message]);

	return (
		<Box sx={{ minHeight: '50px' }}>
			<Collapse in={!!message?.data}>
				<Alert severity={message?.type} onClose={handleDismissNotification}>
					{message?.data}
				</Alert>
			</Collapse>
		</Box>
	);
};

export default AlertComponent;
