import { useCallback, useState } from 'react';
import { IUser } from '../../common';
import { Dispatch } from '@reduxjs/toolkit';

export const useGameHook = (dispatch: Dispatch) => {
	const [error, setError] = useState<string | undefined>();
	const [loading, setLoading] = useState<boolean>(false);

	const createGame = useCallback(async (user: IUser): Promise<string | undefined> => {
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/room`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-user-id': user.id,
			},
		}).catch((e) => {
			setLoading(false);
			setError('Could not create user');
			return e;
		});
		if (response.ok) {
			const { roomId } = await response.json();
			setLoading(false);
			setError(undefined);
			return roomId;
		}
		setError('User not found');
	}, []);

	const joinGame = useCallback(async (user: IUser): Promise<string | undefined> => {
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/room`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-user-id': user.id,
			},
		}).catch((e) => {
			setLoading(false);
			setError('Could not create user');
			return e;
		});
		if (response.ok) {
			const { roomId } = await response.json();
			setLoading(false);
			setError(undefined);
			return roomId;
		}
		setError('User not found');
	}, []);

	return { error, loading, createGame };
};
