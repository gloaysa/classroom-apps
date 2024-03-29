import express, { Express } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import express_ws from 'express-ws';
import cors from 'cors';

import * as path from 'path';
import connectToDB from './db';
import { roomRoute } from './routes/room/room.route';
import { userRoute } from './routes/user/user.route';

const PORT: number = Number(process.env.PORT) || 8050; // set our port
const CLIENT_PATH = '/dist';

const server: Express = express();
const expressWs = express_ws(server);

const { app } = expressWs;

app.use(express.urlencoded({ extended: true }) as RequestHandler);
app.use(cors({ origin: '*' }));
app.use(express.json() as RequestHandler);

roomRoute(expressWs);
userRoute(expressWs);

app.use(express.static(path.resolve('./') + `${CLIENT_PATH}/public`));
app.use(express.static(path.resolve('./') + `${CLIENT_PATH}/assets`));
app.get('/', (req, res): void => {
	res.sendFile(path.resolve('./') + `${CLIENT_PATH}/public/index.html`);
});
app.get('*', (req, res) => {
	res.sendFile(path.resolve('./') + `${CLIENT_PATH}/public/index.html`);
});

// START THE SERVER
// =============================================================================
app.listen(PORT, () => {
	console.info(`Express server listening on port ${PORT}`);
	connectToDB();
});
