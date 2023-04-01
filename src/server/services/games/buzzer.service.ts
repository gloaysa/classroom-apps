import { IRoom } from '../../../common/interfaces/room.interface';
import { BuzzerGameActions, BuzzerGameActionTypes } from '../../../common/actions/buzzer-game.actions';
import { IUser } from '../../../common/interfaces/user.interface';
import { RoomActionTypes } from '../../../common/actions/room.actions';
import { MessageModel } from '../../models/message.model';
import ws from 'ws';
import { BuzzerGameModel } from '../../models/buzzer.game.model';

export class BuzzerService {
	private static instance: BuzzerService;

	static getInstance(): BuzzerService {
		if (!this.instance) {
			this.instance = new BuzzerService();
			return this.instance;
		}
		return this.instance;
	}
	games: Record<string, BuzzerGameModel> = {};

	private setBuzzers(room: IRoom, buzzerSstate: boolean) {
		room.getUsers().forEach((user) => {
			user.updateUser(undefined);
		});
		this.games[room.id].buzzerOn = buzzerSstate;
	}

	createGame(roomId: string) {
		this.games[roomId] = new BuzzerGameModel(roomId);
	}

	handlePlayerMessages(user: IUser, room: IRoom, client: ws.WebSocket, action: BuzzerGameActions) {
		switch (action.type) {
			case BuzzerGameActionTypes.SetBuzzerOnOff:
				this.setBuzzers(room, action.payload);
				room.broadcastToPlayers({ type: BuzzerGameActionTypes.SetBuzzerOnOff, payload: action.payload });
				room.broadcastToHost({ type: BuzzerGameActionTypes.SetBuzzerOnOff, payload: action.payload });
				room.broadcastToHost({ type: RoomActionTypes.SetPlayers, payload: room.getUsers() });
				break;
			case BuzzerGameActionTypes.UserBuzzed:
				user.updateUser(new Date().toISOString());
				room.broadcastToHost({ type: RoomActionTypes.SetPlayers, payload: room.getUsers() });
				break;
			case BuzzerGameActionTypes.BuzzerUserJoined:
				client.send(
					new MessageModel({
						type: BuzzerGameActionTypes.SetBuzzerOnOff,
						payload: this.games[room.id].buzzerOn,
					}).toString()
				);
				break;
		}
	}
}
