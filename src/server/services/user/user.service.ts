import { Player, User } from '../../../common';

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

	createNewUser(userId: string, userName: string): User {
		const existingUser = this.getUserById(userId);
		if (existingUser) {
			this.connectUser(existingUser);
			return existingUser;
		}
		const newUser = { id: userId, name: userName, connected: true };
		this.users = [...this.users, newUser];
		return newUser;
	}

	getAllUsers(): User[] {
		return this.users;
	}

	getUserById(userId: string | undefined): User | undefined {
		return this.users.find(({ id }) => id === userId);
	}

	deleteUser(user: User) {
		if (user.isHost) {
			// if it's the host, remove gameId from all the players in that game
			this.users = this.users.map((player) => {
				if (user.players?.some(({ id }) => player.id === id)) {
					return { ...player, gameId: '' };
				}
				return player;
			});
		}
		this.users = this.users.filter(({ id }) => id !== user.id);
	}

	updateUser(userUpdated: User) {
		this.users = this.users.map((user) => {
			if (user.id !== userUpdated.id) {
				return user;
			}
			return userUpdated;
		});
	}

	disconnectUser(user: User) {
		this.updateUser({
			...user,
			connected: false,
		});
		if (!user.isHost) {
			this.removeUserFromGame(user.id, user.gameId);
		}
	}

	connectUser(user: User) {
		this.updateUser({
			...user,
			connected: true,
		});

		if (user.gameId && !user.isHost) {
			this.addUserToGame(user.id, user.gameId);
		}
	}

	getGameHost(gameId?: string): User | undefined {
		if (!gameId) {
			return undefined;
		}
		return this.users.find((user) => user.gameId === gameId && user.isHost);
	}

	addUserToGame(userId: string, gameId: string, isHost = false): User | undefined {
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

	resetBuzzed(gameId: string | undefined): User | undefined {
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

	userBuzzed(userId: string, gameId: string | undefined, buzzed: boolean): User | undefined {
		const sortByDate = (first: Player, second: Player) => {
			const firstDate = first.buzzed ?? '';
			const secondDate = second.buzzed ?? '';
			if (first.buzzed === undefined) {
				return 1;
			}
			if (second.buzzed === undefined) {
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
