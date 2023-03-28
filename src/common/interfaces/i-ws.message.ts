import { BuzzerMessages, ErrorMessages, RoomMessages, UserMessages } from './messages';
import { IUser } from './user.interface';

export type WsMessageType = BuzzerMessages | UserMessages | ErrorMessages | RoomMessages;

export interface IWsMessage {
	[key: string]: any | undefined;
	type: WsMessageType;
	data: IUser | any;

	getString: () => string;
}
