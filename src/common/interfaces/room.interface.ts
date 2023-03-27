import { IUser } from './user.interface';
import { IWsMessage } from './i-ws.message';

export interface IRoom {
	id: string;
	users: IUser[];
	clients: any[];
	host: IUser;

	broadcastToPlayers(message: IWsMessage): void;
}
