import { IRoom } from '../../../common/interfaces/room.interface';
import { RoomModel } from '../../models/room.model';
import { IUser } from '../../../common/interfaces/user.interface';

export class RoomService {
	private static instance: RoomService;
	private rooms: { [key: string]: IRoom } = {};

	static getInstance() {
		if (!this.instance) {
			this.instance = new RoomService();
			return this.instance;
		}
		return this.instance;
	}

	createRoom(roomId: string, host: IUser): IRoom | undefined {
		if (!this.rooms[roomId]) {
			const newRoom = new RoomModel(roomId, host);
			this.rooms[roomId] = newRoom;
			return newRoom;
		}
		return undefined;
	}

	getRoomById(roomId: string): IRoom | undefined {
		return this.rooms[roomId];
	}

	deleteRoom(roomId: string): void {
		delete this.rooms[roomId];
	}
}
