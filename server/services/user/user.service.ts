import { User } from 'common/interfaces/user.interface';

export class UserService {
	private static instance: UserService;
	private users: User[] = [];

	static getInstance() {
		if (!this.instance) {
			this.instance = new UserService();
			return this.instance;
		}
		return this.instance;
	}

	createNewUser(userId: string, userName: string): User[] {
		this.users = [...this.users, {id: userId, name: userName}];
		return this.users;
	}

	getAllUsers(): User[] {
		return this.users;
	}

	getUserById(userId: string): User | undefined {
		return this.users.find(({id}) => id === userId);
	}

	deleteUser(userId: string) {
		this.users = this.users.filter(({ id }) => id !== userId);
	}
}
