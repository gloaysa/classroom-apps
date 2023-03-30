import { IUser } from '../../common/interfaces/user.interface';
import { ISocketHook, useSocketHook } from './use-socket.hook';

export const useBuzzerSocketHook = (currentUser: IUser | undefined, gameCode: string | undefined): ISocketHook => {
	const socketUrl = currentUser?.id ? `${process.env.SOCKET_URL}/room/${gameCode}` : null;
	const { action, sendActionMessage } = useSocketHook(socketUrl, currentUser?.id ?? '');

	return { sendActionMessage, action };
};
