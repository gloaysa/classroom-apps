import ws from 'ws';
import { IUser } from '../../common/interfaces/user.interface';

export class UserModel implements IUser {
	readonly id: string;
	readonly name: string;
	room: ws.WebSocket | undefined;
	connected = false;
	isHost = false;
	updatedAt: string | undefined;
	roomId: string | undefined;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	makeHost(isHost: boolean) {
		this.isHost = isHost;
	}

	addRoom(room: ws.WebSocket) {
		this.room = room;
	}

	updateUser(updatedAt: string | undefined) {
		this.updatedAt = updatedAt;
	}
}
