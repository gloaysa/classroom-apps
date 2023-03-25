export enum WsMessageType {
	User = 'user',
}
export interface WsMessageInterface {
	type: WsMessageType;
	data: Record<any, any>;
}
