import { useCallback, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { IUser } from '../../common/interfaces/user.interface';
import { RoomActions } from '../../common/actions/room.actions';
import { ErrorActions } from '../../common/actions/error.actions';
import { MainActions } from '../../common/actions/main.actions';
import { UserActions } from '../../common/actions/user.actions';

export const useGameHook = (dispatch: Dispatch) => {
	const [loading, setLoading] = useState<boolean>(false);

	const createGame = useCallback(async (user: IUser): Promise<UserActions | RoomActions | ErrorActions | MainActions> => {
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/room`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-user-id': user.id,
			},
		}).catch((e) => {
			setLoading(false);
			return e;
		});
		const action: RoomActions | ErrorActions | MainActions = await response.json();
		setLoading(false);
		dispatch(action);
		return action;
	}, []);

	return { loading, createGame };
};
