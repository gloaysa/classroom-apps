export enum WsMessageType {
	User = 'user',
	NewUser = 'new user',
	NewGame = 'new game',
	JoinGame = 'join game',
	ForHost = 'for host',
}
export interface IWsMessage {
	[key: string]: any | undefined;
	type: WsMessageType;
	data: any;
}
