import ws from 'ws';

export interface IUser {
	id: string;
	name: string;
	isHost: boolean;
	room: ws.WebSocket | undefined;
	connected: boolean;
	updatedAt: string | undefined;

	makeHost: (isHost: boolean) => void;
	addRoom: (room: ws.WebSocket) => void;
	roomId: string | undefined;

	updateUser: (updatedAt: string | undefined) => void;
}
