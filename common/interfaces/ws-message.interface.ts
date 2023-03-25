export enum WsMessageType {
	User = 'user',
}
export interface WsMessageInterface {
	type: WsMessageType;
	data: any;
}
