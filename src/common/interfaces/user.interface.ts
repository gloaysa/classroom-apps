export interface IUser {
	id: string;
	name: string;
	hostingRooms: string[];
	roomIds: string[];
	connected: boolean;
	updatedAt: string | undefined;

	makeHost: (roomId: string) => void;
	addRoom: (roomId: string) => void;
	removeRoom: (roomId: string) => void;
	isHost: (roomId: string) => boolean;

	updateUser: (updatedAt: string | undefined) => void;
}
