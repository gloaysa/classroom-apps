import { IUser } from '../../common';

export class UserModel implements IUser {
	id: string;
	name: string;
	isHost = false;
	connected = false;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}

	makeHost(isHost: boolean) {
		this.isHost = isHost;
	}
}
