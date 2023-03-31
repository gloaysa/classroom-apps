import { IUser } from '../../common/interfaces/user.interface';

export class UserModel implements IUser {
	readonly id: string;
	readonly name: string;
	connected = false;
	hostingRooms: string[];
	updatedAt: string | undefined;
	roomIds: string[];

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
		this.hostingRooms = [];
		this.roomIds = [];
	}

	makeHost(roomId: string) {
		this.hostingRooms.push(roomId);
		this.roomIds.push(roomId);
	}

	addRoom(roomId: string) {
		if (!this.roomIds.includes(roomId)) {
			this.roomIds.push(roomId);
		}
	}

	isHost(roomId: string): boolean {
		return this.hostingRooms.includes(roomId);
	}

	removeRoom(roomId: string) {
		this.roomIds = this.roomIds.filter((id) => id !== roomId);
	}

	updateUser(updatedAt: string | undefined) {
		this.updatedAt = updatedAt;
	}
}
