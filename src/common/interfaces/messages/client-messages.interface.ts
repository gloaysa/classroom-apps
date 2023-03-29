export enum ClientMessagesTypes {
	Error = 'error',
	Warning = 'warning',
	Info = 'info',
	Success = 'success',
}
export interface IClientMessages {
	[key: string]: any | undefined;
	type: ClientMessagesTypes;
	data: string;

	getString: () => string;
}
