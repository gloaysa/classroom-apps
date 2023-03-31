import { StoreActions } from '../../common/actions';
import { IRoom } from '../../common/interfaces/room.interface';
import { IUser } from '../../common/interfaces/user.interface';
import ws from 'ws';

export class RoomModel implements IRoom {
	users: Record<string, { user: IUser; client: ws.WebSocket }> = {};
	id: string;

	host: { user: IUser; client?: ws.WebSocket };
	constructor(id: string, host: IUser) {
		this.id = id;
		host.makeHost(id);
		this.host = { user: host };
	}

	getUsers(): IUser[] {
		return Object.values(this.users)
			.map(({ user }) => user)
			.sort(this.sortByDate);
	}

	addUser(user: IUser, client: ws.WebSocket): void {
		if (user.id === this.host.user.id) {
			this.host.client = client;
		}
		this.users[user.id] = {
			user,
			client,
		};
		user.addRoom(this.id);
	}

	removeUser(user: IUser): void {
		delete this.users[user.id];
		user.removeRoom(this.id);
	}

	broadcastToPlayers(message: StoreActions) {
		Object.values(this.users).forEach(({ client }) => client.send(JSON.stringify(message)));
	}

	broadcastToHost(message: StoreActions) {
		this.host.client?.send(JSON.stringify(message));
	}

	sortByDate(first: IUser, second: IUser) {
		if (first.updatedAt === undefined && second.updatedAt === undefined) {
			return 0;
		}
		if (first.updatedAt === undefined) {
			return 1;
		}
		if (second.updatedAt === undefined) {
			return -1;
		}
		const firstDate = new Date(first.updatedAt).getTime();
		const secondDate = new Date(second.updatedAt).getTime();
		return firstDate - secondDate;
	}
}
