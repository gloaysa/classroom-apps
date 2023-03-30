import { IUser } from './user.interface';
import { StoreActions } from '../actions';

export interface IRoom {
	id: string;
	host: IUser;

	broadcastToPlayers(action: StoreActions): void;
	broadcastToHost(action: StoreActions): void;
	addUser(user: IUser): void;
	removeUser(user: IUser): void;
	getUsers(): IUser[];
}
