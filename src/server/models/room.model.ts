import { IRoom } from '../../common/interfaces/room.interface';
import { IUser, IWsMessage } from '../../common';

export class RoomModel implements IRoom {
	users: IUser[] = [];
	id: string;

	host: IUser;

	constructor(id: string, host: IUser) {
		this.id = id;
		this.host = host;
	}

	getUsers(): IUser[] {
		return this.users.sort(this.sortByDate);
	}

	addUser(user: IUser): void {
		const userAlreadyJoined = this.users.find(({ id }) => user.id === id);
		if (userAlreadyJoined || user.isHost) {
			return;
		}
		this.users.push(user);
	}

	removeUser(user: IUser): void {
		this.users = this.users.filter(({ id }) => id !== user.id);
	}

	broadcastToPlayers(message: IWsMessage) {
		this.users.forEach((user) => {
			user.room?.send(message.getString());
		});
	}

	broadcastToHost(message: IWsMessage) {
		this.host.room?.send(message.getString());
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
