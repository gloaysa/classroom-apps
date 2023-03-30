export enum ErrorActionTypes {
	RoomDoesNotExist = '[error]: room does not exist',
	UserDoesNotExist = '[error]: user does not exist',
}

export type ErrorActions = {
	type: ErrorActionTypes;
	payload: string;
};
