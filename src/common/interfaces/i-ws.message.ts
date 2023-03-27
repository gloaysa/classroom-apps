import { BuzzerMessages, ErrorMessages, UserMessages } from './messages';

export type WsMessageType = BuzzerMessages | UserMessages | ErrorMessages;

export interface IWsMessage {
	[key: string]: any | undefined;
	type: WsMessageType;
	data: any;
}
