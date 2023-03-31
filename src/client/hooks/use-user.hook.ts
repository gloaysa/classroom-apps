import { useCallback, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { IUser } from '../../common/interfaces/user.interface';
import { UserActions } from '../../common/actions/user.actions';
import {
	ClientMessagesTypes,
	MainActions,
	MainActionTypes,
	setLoadingAction,
} from '../../common/actions/main.actions';
import { ErrorActions } from '../../common/actions/error.actions';

export const useUserHook = (dispatch: Dispatch) => {
	const [user, setUser] = useState<IUser | undefined>();
	const genericError: MainActions = {
		type: MainActionTypes.SetMessage,
		payload: {
			type: ClientMessagesTypes.Error,
			data: 'There was an error when getting the user',
		},
	};

	const getUser = useCallback(async (userId: string): Promise<UserActions | MainActions | ErrorActions> => {
		dispatch(setLoadingAction(true));
		const response = await fetch(`${process.env.API_URL}/user/${userId}`).catch((e) => {
			dispatch(setLoadingAction(false));
			dispatch(genericError);
			return e;
		});

		const userAction: UserActions = await response.json();

		dispatch(setLoadingAction(false));
		dispatch(userAction);
		return userAction;
	}, []);

	const createUser = useCallback(
		async (userName: string): Promise<UserActions | MainActions | ErrorActions> => {
			dispatch(setLoadingAction(true));
			const response = await fetch(`${process.env.API_URL}/user`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: userName }),
			}).catch((e) => {
				dispatch(setLoadingAction(false));
				dispatch(genericError);
				return e;
			});

			const userAction: UserActions = await response.json();
			dispatch(setLoadingAction(false));
			dispatch(userAction);
			const notification: MainActions = {
				type: MainActionTypes.SetMessage,
				payload: {
					type: ClientMessagesTypes.Success,
					data: `${userAction.payload?.name} logged in!`,
				},
			};
			dispatch(notification);
			return userAction;
		},
		[]
	);

	const deleteUser = useCallback(
		async (userId: string): Promise<UserActions | MainActions | ErrorActions> => {
			dispatch(setLoadingAction(true));
			const response = await fetch(`${process.env.API_URL}/user/${userId}`, {
				method: 'DELETE',
			}).catch((e) => {
				dispatch(setLoadingAction(false));
				dispatch(genericError);
				return e;
			});
			const userAction: UserActions = await response.json();

			setUser(undefined);
			dispatch(setLoadingAction(false));
			dispatch(userAction);
			return userAction;
		},
		[]
	);

	return { user, getUser, createUser, deleteUser };
};
