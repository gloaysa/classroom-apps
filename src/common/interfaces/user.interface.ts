export interface User {
	id: string;
	name: string;
	isHost?: boolean;
	gameId?: string;
	connected?: boolean;

	players?: {
		id: string;
		name: string;
		connected?: boolean;
	}[];
}
