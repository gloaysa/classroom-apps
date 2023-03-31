import React, { FunctionComponent } from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectIsLoading } from '../../store/reducers/main.reducer';

const SpinnerComponent: FunctionComponent = () => {
	const isLoading = useSelector(selectIsLoading);

	return (
		<Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
};

export default SpinnerComponent;
