import { IUser } from '../interfaces/user.interface';

export enum UserActionTypes {
	SetUser = '[user] set user',
	RemoveUser = '[user] remove user',
}

export type setUserAction = {
	type: UserActionTypes.SetUser;
	payload: IUser;
};

export type removeUserAction = {
	type: UserActionTypes.RemoveUser;
	payload: undefined;
};

export type UserActions = setUserAction | removeUserAction;
