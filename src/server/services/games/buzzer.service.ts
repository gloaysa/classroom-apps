import { IRoom } from '../../../common/interfaces/room.interface';
import { BuzzerGameActions, BuzzerGameActionTypes } from '../../../common/actions/buzzer-game.actions';
import { IUser } from '../../../common/interfaces/user.interface';
import { RoomActionTypes } from '../../../common/actions/room.actions';
import { MessageModel } from '../../models/message.model';

export class BuzzerService {
	private static instance: BuzzerService;

	static getInstance(): BuzzerService {
		if (!this.instance) {
			this.instance = new BuzzerService();
			return this.instance;
		}
		return this.instance;
	}
	private buzzersAreOpen = false;

	private setBuzzers(room: IRoom, state: boolean) {
		room.getUsers().forEach((user) => {
			user.updateUser(undefined);
		});
		this.buzzersAreOpen = state;
	}

	handlePlayerMessages(user: IUser, room: IRoom, action: BuzzerGameActions) {
		switch (action.type) {
			case BuzzerGameActionTypes.SetBuzzerOnOff:
				this.setBuzzers(room, action.payload);
				room.broadcastToPlayers({ type: BuzzerGameActionTypes.SetBuzzerOnOff, payload: action.payload });
				room.broadcastToHost({ type: BuzzerGameActionTypes.SetBuzzerOnOff, payload: action.payload });
				room.broadcastToHost({ type: RoomActionTypes.SetPlayers, payload: room.getUsers() });
				break;
			case BuzzerGameActionTypes.BuzzerBuzzed:
				user.updateUser(new Date().toISOString());
				room.broadcastToHost({ type: RoomActionTypes.SetPlayers, payload: room.getUsers() });
				break;
			case BuzzerGameActionTypes.BuzzerUserJoined:
				user.room?.send(
					new MessageModel({
						type: BuzzerGameActionTypes.SetBuzzerOnOff,
						payload: this.buzzersAreOpen,
					}).toString()
				);
				break;
		}
	}
}
