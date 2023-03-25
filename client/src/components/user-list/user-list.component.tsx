import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { selectUserList } from '../../store/reducers/user.reducer';

const UserListComponent: FunctionComponent = () => {
	const userList = useSelector(selectUserList);

	return (
		<div className="user-list">
			{userList.map((user) => (
				<div key={user.id} className="user-list__user">
					{user.name}
				</div>
			))}
		</div>
	);
};

export default UserListComponent;
