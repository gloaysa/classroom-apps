import express_ws from 'express-ws';
import { UserService } from '../../services/user/user.service';
import { verifyUsernameUtil } from '../../../common/utils/verify-username.util';
import { ClientMessagesTypes, MainActions, MainActionTypes } from '../../../common/actions/main.actions';
import { UserActions, UserActionTypes } from '../../../common/actions/user.actions';

const userService = UserService.getInstance();
export const userRoute = (expressWs: express_ws.Instance) => {
	const { app } = expressWs;

	app.get('/user/:userId', (req, res) => {
		const userId = req.params.userId?.toString();

		try {
			const user = userService.getUserById(userId);

			if (!user) {
				const errorMessage: MainActions = {
					type: MainActionTypes.SetMessage,
					payload: { type: ClientMessagesTypes.Error, data: `It was not possible to get user with id ${userId}` },
				};
				return res.status(404).send(errorMessage);
			}

			const successMessage: UserActions = {
				type: UserActionTypes.SetUser,
				payload: user,
			};
			console.info(`User requested: ${user.id} - ${user.name}`);
			return res.send(JSON.stringify(successMessage));
		} catch (e) {
			const errorMessage: MainActions = {
				type: MainActionTypes.SetMessage,
				payload: { type: ClientMessagesTypes.Error, data: `It was not possible to get user with id ${userId}` },
			};
			console.error(`It was not possible to get user with id ${userId}: ${e}`);
			return res.status(500).send(errorMessage);
		}
	});

	app.post('/user', (req, res) => {
		try {
			const { name } = req.body;
			if (!verifyUsernameUtil(name)) {
				const message: MainActions = {
					type: MainActionTypes.SetMessage,
					payload: { type: ClientMessagesTypes.Error, data: 'Invalid username. It must have between 3 and 15 letters.' },
				};
				res.status(400).send(message);
			}

			const user = userService.createNewUser(name);
			const message: UserActions = {
				type: UserActionTypes.SetUser,
				payload: user,
			};
			console.info(`New user created: ${user.id} - ${user.name}`);
			res.send(message);
		} catch (e) {
			const message: MainActions = {
				type: MainActionTypes.SetMessage,
				payload: { type: ClientMessagesTypes.Error, data: `It was not possible to create new user: ${e}` },
			};
			console.error(message);
			res.status(500).send(message);
		}
	});

	app.delete('/user/:userId', (req, res) => {
		const userId = req.params.userId?.toString();
		try {
			const user = userService.getUserById(userId);
			if (!user) {
				const message: MainActions = {
					type: MainActionTypes.SetMessage,
					payload: { type: ClientMessagesTypes.Error, data: 'No user found to delete' },
				};
				return res.status(404).send(message);
			}

			userService.deleteUser(userId);

			const message: UserActions = {
				type: UserActionTypes.RemoveUser,
				payload: undefined,
			};
			console.info(message);
			res.send(message);
		} catch (e) {
			const message: MainActions = {
				type: MainActionTypes.SetMessage,
				payload: { type: ClientMessagesTypes.Error, data: `Error when deleting user ${userId}: ${e}` },
			};
			console.error(message);
			res.status(500).send(message);
		}
	});
};
