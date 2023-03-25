import React, { FunctionComponent } from 'react';
import './buzzer.component.scss';

export type BuzzerState = 'waiting' | 'ready' | 'pulsed';

interface IBuzzerComponent {
	onClick: () => void;
	state: BuzzerState;
}

const BuzzerComponent: FunctionComponent<IBuzzerComponent> = ({ onClick, state }) => {
	const colors = {
		waiting: 'grey',
		ready: 'green',
		pulsed: 'red',
	};
	return (
		<div className="buzzer" onClick={onClick} style={{ backgroundColor: colors[state] }}>
			{state.toUpperCase()}
		</div>
	);
};

export default BuzzerComponent;
