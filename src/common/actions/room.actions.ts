import { IUser } from '../interfaces/user.interface';

export enum RoomActionTypes {
	SetPlayers = '[room] set players',
	PlayerDisconnected = '[room] user left the room',
}

export type setPlayersAction = {
	type: RoomActionTypes.SetPlayers;
	payload: IUser[];
};

export type setPlayerDisconnectedAction = {
	type: RoomActionTypes.PlayerDisconnected;
	payload: IUser;
};

export type RoomActions = setPlayersAction | setPlayerDisconnectedAction;
