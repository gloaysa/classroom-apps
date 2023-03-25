import React, { FunctionComponent } from 'react';
import './buzzer.component.scss';

export type BuzzerState = 'waiting' | 'ready' | 'buzzed';

interface IBuzzerComponent {
	onClick: () => void;
	state: BuzzerState;
}

const BuzzerComponent: FunctionComponent<IBuzzerComponent> = ({ onClick, state }) => {
	const colors = {
		waiting: 'grey',
		ready: 'green',
		buzzed: 'red',
	};
	return (
		<div className="buzzer" onClick={onClick} style={{ backgroundColor: colors[state] }}>
			{state.toUpperCase()}
		</div>
	);
};

export default BuzzerComponent;
