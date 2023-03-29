import { ClientMessagesTypes, IClientMessages } from '../interfaces/messages/client-messages.interface';

export class ClientMessage implements IClientMessages {
	type: ClientMessagesTypes;
	data: string;

	getString(): string {
		return JSON.stringify({ type: this.type, message: this.data });
	}

	constructor(type: ClientMessagesTypes, message: string) {
		this.type = type;
		this.data = message;
	}
}
