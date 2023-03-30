import useWebSocket from 'react-use-websocket';
import { IUser } from '../../common/interfaces/user.interface';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { StoreActions } from '../../common/actions';
import { ErrorActionTypes } from '../../common/actions/error.actions';
import { ClientMessagesTypes, MainActionTypes, setMessageAction } from '../../common/actions/main.actions';
import { UserActionTypes } from '../../common/actions/user.actions';

interface IUseBuzzerSocketHook {
	sendActionMessage: (action: StoreActions) => void;
	lastMessage: StoreActions | null;
}

export const useBuzzerSocketHook = (currentUser: IUser | undefined, gameCode: string | undefined, dispatch: Dispatch): IUseBuzzerSocketHook => {
	const WS_URL = `${process.env.SOCKET_URL}/room/${gameCode}`;
	const { lastJsonMessage, sendJsonMessage } = useWebSocket(WS_URL, {
		onOpen: () => console.info('WebSocket connection established.'),
		shouldReconnect: () => true,
		queryParams: {
			userId: currentUser?.id ?? '',
		},
		share: true,
	});

	useEffect(() => {
		const action = lastJsonMessage as StoreActions | null;
		if (action?.type) {
			dispatch(action);
			if (action.type in ErrorActionTypes) {
				const errorMessage: setMessageAction = {
					type: MainActionTypes.SetMessage,
					payload: {
						type: ClientMessagesTypes.Error,
						data: action.payload as string,
					},
				};
				dispatch(errorMessage);
			}
			if (action.type === ErrorActionTypes.UserDoesNotExist) {
				dispatch({ type: UserActionTypes.RemoveUser });
			}
		}
	}, [lastJsonMessage]);

	const sendActionMessage = sendJsonMessage as (action: StoreActions) => void;
	const lastMessage = lastJsonMessage as StoreActions;
	return { sendActionMessage, lastMessage };
};
