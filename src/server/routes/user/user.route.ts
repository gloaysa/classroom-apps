import express_ws from 'express-ws';
import { UserService } from '../../services/user/user.service';
import { verifyUsernameUtil } from '../../../common/utils/verify-username.util';

const userService = UserService.getInstance();
export const userRoute = (expressWs: express_ws.Instance) => {
	const { app } = expressWs;

	app.get('/user/:userId', (req, res) => {
		const userId = req.params.userId?.toString();

		try {
			const user = userService.getUserById(userId);

			if (!user) {
				return res.status(404).send(`It was not possible to get user with id ${userId}`);
			}
			console.info(`User requested: ${user.id} - ${user.name}`);
			return res.send(JSON.stringify(user));
		} catch (e) {
			console.error(`It was not possible to get user with id ${userId}: ${e}`);
			return res.status(500).send();
		}
	});

	app.post('/user', (req, res) => {
		try {
			const { name } = req.body;
			if (!verifyUsernameUtil(name)) {
				res.status(400).send({ message: 'Invalid username. It must have between 3 and 15 letters.' });
			}

			const user = userService.createNewUser(name);
			console.info(`New user created: ${user.id} - ${user.name}`);
			res.send(user);
		} catch (e) {
			console.error(`It was not possible to create new user: ${e}`);
			res.status(500).send(JSON.stringify(e));
		}
	});

	app.delete('/user/:userId', (req, res) => {
		const userId = req.params.userId?.toString();
		try {
			const user = userService.getUserById(userId);
			if (!user) {
				return res.status(404).send('No user found to delete');
			}
			userService.deleteUser(userId);
			console.info(`User ${user.name} - ${user.id} was deleted`);
			res.send('deleted');
		} catch (e) {
			console.error(`Error when deleting user ${userId}: ${e}`);
			res.status(500).send();
		}
	});
};
