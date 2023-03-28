import { IUser } from './user.interface';
import { IWsMessage } from './i-ws.message';

export interface IRoom {
	id: string;
	host: IUser;

	broadcastToPlayers(message: IWsMessage): void;
	broadcastToHost(message: IWsMessage): void;
	addUser(user: IUser): void;
	removeUser(user: IUser): void;
	getUsers(): IUser[];
}
