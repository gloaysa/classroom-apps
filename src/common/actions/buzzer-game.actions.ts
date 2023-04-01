import { IUser } from '../interfaces/user.interface';

export enum BuzzerGameActionTypes {
	SetBuzzerOnOff = '[buzzer game] set buzzer on off',
	BuzzerUserJoined = '[buzzer game] user joined',
	UserBuzzed = '[buzzer game] user buzzed',
}

export type setBuzzerOnOff = {
	type: BuzzerGameActionTypes.SetBuzzerOnOff;
	payload: boolean;
};

export type buzzerUserJoined = {
	type: BuzzerGameActionTypes.BuzzerUserJoined;
	payload: IUser;
};

export type buzzerUserBuzzed = {
	type: BuzzerGameActionTypes.UserBuzzed;
	payload: string;
};

export type BuzzerGameActions = setBuzzerOnOff | buzzerUserJoined | buzzerUserBuzzed;
