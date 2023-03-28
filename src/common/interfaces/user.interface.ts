import ws from 'ws';

export interface IUser {
	id: string;
	name: string;
	isHost: boolean;
	room: ws.WebSocket | undefined;
	connected: boolean;

	makeHost: (isHost: boolean) => void;
	addRoom: (room: ws.WebSocket) => void;
}
