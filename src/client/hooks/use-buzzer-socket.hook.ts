import useWebSocket from 'react-use-websocket';
import { IUser } from '../../common';

export const useBuzzerSocketHook = (currentUser: IUser | undefined, gameCode: string | undefined) => {
	const WS_URL = `${process.env.SOCKET_URL}/room/${gameCode}`;
	return useWebSocket<any>(WS_URL, {
		onOpen: () => console.info('WebSocket connection established.'),
		shouldReconnect: () => true,
		queryParams: {
			userId: currentUser?.id ?? '',
		},
		share: true,
	});
};
