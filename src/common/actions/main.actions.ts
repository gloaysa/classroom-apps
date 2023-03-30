export enum ClientMessagesTypes {
	Error = 'error',
	Warning = 'warning',
	Info = 'info',
	Success = 'success',
}
export interface IClientMessages {
	type: ClientMessagesTypes;
	data: string;
}

export enum MainActionTypes {
	SetMessage = '[main] set message',
}

export type setMessageAction = {
	type: MainActionTypes.SetMessage;
	payload: IClientMessages | undefined;
};

export type MainActions = setMessageAction;
