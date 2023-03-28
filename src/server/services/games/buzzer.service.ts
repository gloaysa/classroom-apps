import { IUser, IWsMessage } from '../../../common';
import { IRoom } from '../../../common/interfaces/room.interface';
import { BuzzerMessages } from '../../../common/interfaces/messages';
import { WsMessage } from '../../../common/models/ws-message.model';

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

	handlePlayerMessages(user: IUser, room: IRoom, msg: IWsMessage) {
		switch (msg.type) {
			case BuzzerMessages.BuzzerOnOff:
				this.setBuzzers(room, msg.data);
				room.broadcastToPlayers(new WsMessage(BuzzerMessages.BuzzerOnOff, this.buzzersAreOpen));
				room.broadcastToHost(new WsMessage(BuzzerMessages.BuzzerOnOff, this.buzzersAreOpen));
				break;
			case BuzzerMessages.BuzzerBuzzed:
				user.updateUser(new Date().toISOString());
				room.broadcastToHost(new WsMessage(BuzzerMessages.BuzzerBuzzed, room.getUsers()));
				break;
			case BuzzerMessages.BuzzerUserJoined:
				user.room?.send(new WsMessage(BuzzerMessages.BuzzerOnOff, this.buzzersAreOpen).getString());
				break;
		}
		console.log(msg);
	}
}

interface BuzzList {
	[key: string]: Buzz[];
}

interface Buzz {
	buzzedAt: string;
	user: IUser;
}
