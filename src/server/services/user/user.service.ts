import { IUser } from '../../../common';
import { UserModel } from '../../models/user.model';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
	private static instance: UserService;
	private users: IUser[] = [];

	static getInstance() {
		if (!this.instance) {
			this.instance = new UserService();
			return this.instance;
		}
		return this.instance;
	}

	createNewUser(userName: string): IUser {
		const userId = uuidv4();
		const user = new UserModel(userId, userName);
		this.users = [...this.users, user];
		return user;
	}

	getUserById(userId: string | undefined): IUser | undefined {
		return this.users.find(({ id }) => id === userId);
	}

	deleteUser(userId: string) {
		this.users = this.users.filter(({ id }) => id !== userId);
	}
}
