import { useCallback, useState } from 'react';
import { IUser } from '../../common';
import { Dispatch } from '@reduxjs/toolkit';
import { setUserAction } from '../store/reducers/user.reducer';

export const useUserHook = (dispatch: Dispatch) => {
	const [user, setUser] = useState<IUser | undefined>();
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	const getUser = useCallback(async (userId: string): Promise<IUser | undefined> => {
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/user/${userId}`).catch((e) => {
			setLoading(false);
			setError('User not found');
			return e;
		});

		if (response.ok) {
			const user = await response.json();
			setUser(user);
			setLoading(false);
			setError(undefined);
			dispatch(setUserAction(user));
			return user;
		}
		setError('User not found');
	}, []);

	const createUser = useCallback(async (userName: string): Promise<IUser | undefined> => {
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/user`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: userName }),
		}).catch((e) => {
			setLoading(false);
			setError('Could not create user');
			return e;
		});
		if (response.ok) {
			const user = await response.json();
			setUser(user);
			setLoading(false);
			setError(undefined);
			dispatch(setUserAction(user));
			return user;
		}
		setError('User not found');
	}, []);

	const deleteUser = useCallback(async (userId: string): Promise<void> => {
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/user/${userId}`, {
			method: 'DELETE',
		}).catch((e) => {
			setLoading(false);
			setError('User not found');
			return e;
		});
		if (response.ok) {
			setUser(undefined);
			setLoading(false);
			setError(undefined);
			dispatch(setUserAction(undefined));
		}
		setError('User not found');
	}, []);

	return { user, error, loading, getUser, createUser, deleteUser };
};
