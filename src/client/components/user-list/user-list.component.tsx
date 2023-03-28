import React, { FunctionComponent } from 'react';
import './user-list.component.scss';
import { IUser } from '../../../common';

interface IUserListComponent {
	players: IUser[];
}
const UserListComponent: FunctionComponent<IUserListComponent> = ({ players }) => {
	return (
		<div className="user-list">
			{players.map((player, index) => (
				<div key={player.id} className="user-list__user">
					<div className="user-list__user-number">{index + 1}</div>
					<div className={'user-list__user-name ' + (player ? 'user-list__user--buzzed' : 'user-list__user--no-buzzed')}>{player.name}</div>
				</div>
			))}
		</div>
	);
};

export default UserListComponent;
