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
	SetLoading = '[main] set loading',
}

export type setMessageAction = {
	type: MainActionTypes.SetMessage;
	payload: IClientMessages | undefined;
};

export type LoadingAction = {
	type: MainActionTypes.SetLoading;
	payload: boolean;
};

export type MainActions = setMessageAction | LoadingAction;

export const setLoadingAction = (payload: boolean) => {
	return { type: MainActionTypes.SetLoading, payload };
};
