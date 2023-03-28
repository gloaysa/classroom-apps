import { ClientMessagesTypes, IClientMessages } from '../interfaces/messages/client-messages.interface';

export class ClientMessage implements IClientMessages {
	type: ClientMessagesTypes;
	message: string;

	getString(): string {
		return JSON.stringify({ type: this.type, message: this.message });
	}

	constructor(type: ClientMessagesTypes, message: string) {
		this.type = type;
		this.message = message;
	}
}
