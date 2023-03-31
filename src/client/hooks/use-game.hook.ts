import { useCallback } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { IUser } from '../../common/interfaces/user.interface';
import { RoomActions } from '../../common/actions/room.actions';
import { ErrorActions } from '../../common/actions/error.actions';
import { MainActions, setLoadingAction } from '../../common/actions/main.actions';
import { UserActions } from '../../common/actions/user.actions';

export const useGameHook = (dispatch: Dispatch) => {
	const createGame = useCallback(
		async (user: IUser): Promise<Array<UserActions | RoomActions | ErrorActions | MainActions>> => {
			dispatch(setLoadingAction(true));
			const response = await fetch(`${process.env.API_URL}/room`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-user-id': user.id,
				},
			}).catch((e) => {
				dispatch(setLoadingAction(false));
				return e;
			});
			const actions: Array<RoomActions | ErrorActions | MainActions> = await response.json();
			dispatch(setLoadingAction(false));
			actions.forEach((action) => dispatch(action));
			return actions;
		},
		[]
	);

	return { createGame };
};
