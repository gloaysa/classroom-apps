import React, { FunctionComponent, useState } from 'react';
import './user-list.component.scss';
import { BuzzerState } from '../buzzer/buzzer.component';
import { IUser } from '../../../common/interfaces/user.interface';

interface IUserListComponent {
	players: IUser[];
	buzzerOn: boolean;
}
const UserListComponent: FunctionComponent<IUserListComponent> = ({ players, buzzerOn }) => {
	const [buzzerState, setBuzzerState] = useState<BuzzerState>('waiting');

	const getBuzzerState = (player: IUser) => {
		const userHasBuzzed = !!player.updatedAt;
		if (userHasBuzzed && buzzerOn) {
			return 'buzzed';
		}
		if (buzzerOn) {
			return 'ready';
		}
		if (!buzzerOn) {
			return 'waiting';
		}
	};

	return (
		<div className="user-list">
			{players.map((player, index) => (
				<div key={player.id} className="user-list__user">
					<div className="user-list__user-number">{index + 1}</div>
					<div className={'user-list__user-name ' + ('user-list__user--' + getBuzzerState(player))}>{player.name}</div>
				</div>
			))}
		</div>
	);
};

export default UserListComponent;
