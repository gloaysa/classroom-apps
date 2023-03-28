import { IUser, IWsMessage, WsMessageType } from '../../common';

export class WsMessage implements IWsMessage {
	type: WsMessageType;
	data: IUser | any;

	getString(): string {
		return JSON.stringify({ type: this.type, message: this.data }, (key, value) => {
			if (key === 'room') {
				return undefined;
			}
			return value;
		});
	}

	constructor(type: WsMessageType, data?: any) {
		this.type = type;
		this.data = data;
	}
}
