import { IWsMessage, WsMessageType } from '../../common';

export class WsMessage implements IWsMessage {
	type: WsMessageType;
	data: any;

	constructor(type: WsMessageType, data?: any) {
		this.type = type;
		this.data = data;
	}
}
