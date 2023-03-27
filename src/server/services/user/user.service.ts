import { IUser, Player } from '../../../common';
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
		const existingUser = this.getUserById(userId);
		if (existingUser) {
			this.connectUser(existingUser);
			return existingUser;
		}
		const user = new UserModel(userId, userName);
		this.users = [...this.users, user];
		return user;
	}

	getAllUsers(): IUser[] {
		return this.users;
	}

	getUserById(userId: string | undefined): IUser | undefined {
		return this.users.find(({ id }) => id === userId);
	}

	deleteUser(userId: string) {
		this.users = this.users.filter(({ id }) => id !== userId);
	}

	updateUser(userUpdated: IUser) {
		this.users = this.users.map((user) => {
			if (user.id !== userUpdated.id) {
				return user;
			}
			return userUpdated;
		});
	}

	disconnectUser(user: IUser) {
		this.updateUser({
			...user,
			connected: false,
		});
		if (!user.isHost) {
			this.removeUserFromGame(user.id, user.gameId);
		}
	}

	connectUser(user: IUser) {
		this.updateUser({
			...user,
			connected: true,
		});

		if (user.gameId && !user.isHost) {
			this.addUserToGame(user.id, user.gameId);
		}
	}

	getGameHost(gameId?: string): IUser | undefined {
		if (!gameId) {
			return undefined;
		}
		return this.users.find((user) => user.gameId === gameId && user.isHost);
	}

	addUserToGame(userId: string, gameId: string, isHost = false): IUser | undefined {
		const user = this.getUserById(userId);
		if (!user) {
			return;
		}

		if (isHost) {
			this.updateUser({
				...user,
				gameId,
				isHost,
				players: this.users.filter((user) => user.gameId === gameId),
			});
		} else {
			const host = this.getGameHost(gameId);
			if (!host) {
				return;
			}
			this.updateUser({
				...user,
				gameId,
				isHost,
			});
			const players = host.players ?? [];
			this.updateUser({
				...host,
				players: [...players, { name: user.name, id: user.id, connected: user.connected }],
			});
		}

		return this.getUserById(user.id);
	}

	removeUserFromGame(userId: string, gameId: string | undefined) {
		if (!gameId) {
			return;
		}
		const host = this.getGameHost(gameId);
		if (!host) {
			return;
		}
		const players = host.players?.filter(({ id }) => id !== userId) ?? [];
		this.updateUser({
			...host,
			players,
		});
	}

	resetBuzzed(gameId: string | undefined): IUser | undefined {
		const host = this.getGameHost(gameId);
		if (!host) {
			return;
		}
		const players = host?.players?.map((user) => {
			return { ...user, buzzed: '' };
		});
		const updatedHost = {
			...host,
			players,
		};
		this.updateUser(updatedHost);

		return updatedHost;
	}

	userBuzzed(userId: string, gameId: string | undefined, buzzed: boolean): IUser | undefined {
		const sortByDate = (first: Player, second: Player) => {
			const firstDate = first.buzzed ?? '';
			const secondDate = second.buzzed ?? '';
			if (!first.buzzed) {
				return 1;
			}
			if (!second.buzzed) {
				return -1;
			}
			return new Date(firstDate).getTime() - new Date(secondDate).getTime();
		};

		const host = this.getGameHost(gameId);
		if (!host) {
			return;
		}
		const players = host?.players
			?.map((user) => {
				if (user.id === userId) {
					return { ...user, buzzed: buzzed ? new Date().toISOString() : '' };
				}
				return user;
			})
			.sort(sortByDate);
		const updatedHost = {
			...host,
			players,
		};
		this.updateUser(updatedHost);

		return updatedHost;
	}
}
