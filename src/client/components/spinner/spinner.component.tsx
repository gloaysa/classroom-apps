import React, { FunctionComponent } from 'react';
import './spinner.component.scss';
import { ImSpinner3 } from 'react-icons/im';

const SpinnerComponent: FunctionComponent = () => {
	return (
		<div className="spinner">
			<ImSpinner3 className="spinner__icon" />
		</div>
	);
};

export default SpinnerComponent;
