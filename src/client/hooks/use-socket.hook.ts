import { useEffect } from 'react';
import useWebSocket from 'react-use-websocket';
import { useDispatch } from 'react-redux';
import { StoreActions } from '../../common/actions';
import { ErrorActionTypes } from '../../common/actions/error.actions';
import { UserActionTypes } from '../../common/actions/user.actions';
import { ClientMessagesTypes, MainActionTypes, setMessageAction } from '../../common/actions/main.actions';

export interface ISocketHook {
	sendActionMessage: (action: StoreActions) => void;
	action: StoreActions | null;
}
export const useSocketHook = (socketUrl: string | null, userId: string) => {
	const dispatch = useDispatch();
	const socket = useWebSocket(socketUrl, {
		onOpen: () => console.info('WebSocket connection established.'),
		shouldReconnect: () => true,
		queryParams: {
			userId: userId,
		},
	});
	const { lastJsonMessage, sendJsonMessage } = socket;
	const action = lastJsonMessage as StoreActions | null;
	const sendActionMessage = sendJsonMessage as (action: StoreActions) => void;

	useEffect(() => {
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

	return { action, sendActionMessage };
};
