export interface User {
	id: string;
	name: string;
	isHost?: boolean;
	gameId?: string;
	connected?: boolean;

	players?: Player[];
}

export interface Player {
	id: string;
	name: string;
	connected?: boolean;
	buzzed?: string;
}
