import { IUser } from './user.interface';
import { StoreActions } from '../actions';
import ws from 'ws';

export interface IRoom {
	id: string;

	broadcastToPlayers(action: StoreActions): void;
	broadcastToHost(action: StoreActions): void;
	addUser(user: IUser, client: ws.WebSocket): void;
	removeUser(user: IUser): void;
	getUsers(): IUser[];
}
