import useWebSocket from 'react-use-websocket';
import { IUser, IWsMessage } from '../../common';
import { IClientMessages } from '../../common/interfaces/messages/client-messages.interface';

export const useBuzzerSocketHook = (currentUser: IUser | undefined, gameCode: string | undefined) => {
	const WS_URL = `${process.env.SOCKET_URL}/room/${gameCode}`;
	return useWebSocket<IWsMessage | IClientMessages>(WS_URL, {
		onOpen: () => console.info('WebSocket connection established.'),
		shouldReconnect: () => true,
		queryParams: {
			userId: currentUser?.id ?? '',
		},
		share: true,
	});
};
