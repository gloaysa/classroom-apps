import useWebSocket from 'react-use-websocket';
import { IUser } from '../../common';
import { useLocalStorage } from 'usehooks-ts';

const WS_URL = `${process.env.SOCKET_URL}/buzz`;
export const useSocketHook = (currentUser?: IUser) => {
	const [userLocalStorage, setUserLocalStorage] = useLocalStorage<IUser | undefined>('user', undefined);

	return useWebSocket<any>(WS_URL, {
		onOpen: () => console.info('WebSocket connection established.'),
		shouldReconnect: () => true,
		queryParams: {
			user: currentUser ? JSON.stringify(userLocalStorage) : '',
		},
		share: true,
	});
};
