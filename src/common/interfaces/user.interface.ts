export interface IUser {
	id: string;
	name: string;
	isHost: boolean;
	gameId?: string;
	connected: boolean;

	players?: Player[];

	makeHost: (isHost: boolean) => void;
}

export interface Player {
	id: string;
	name: string;
	connected?: boolean;
	buzzed?: string;
}
