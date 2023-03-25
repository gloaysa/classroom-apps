import express, { Express } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import express_ws from 'express-ws';
import cors from 'cors';

import * as path from 'path';
import connectToDB from './db';
import { WebSocket } from 'ws';
import { UserService } from './services/user/user.service';
import { User, WsMessageInterface, WsMessageType } from '@classroom-apps/common';

const PORT: number = Number(process.env.PORT) || 8050; // set our port
const CLIENT_PATH = '/build/client';

const server: Express = express();
const { app, getWss } = express_ws(server);

app.use(express.urlencoded({extended: true}) as RequestHandler);
app.use(cors({origin: '*'}));
app.use(express.json() as RequestHandler);

app.use(express.static(path.resolve("./") + CLIENT_PATH));

app.get('/', (req, res): void => {
    res.sendFile(path.resolve("./") + `${CLIENT_PATH}/index.html`);
});

const userService = UserService.getInstance();

app.ws('/', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(req);
        ws.send('Connected!');
    });

    ws.on('close', () => {
        const user: User = JSON.parse(req.query.user as string);
        userService.deleteUser(user.id);
        const response = {
            type: WsMessageType.User,
            data: userService.getAllUsers()
        }
        broadcastMessage(response);
        console.log('disconnect', user.name)
    })

    const user: User = JSON.parse(req.query.user as string);
    if (!user) {
        return ws.close();
    }
    console.log(`Received a new connection.`);

    // Store the new connection and handle messages
    const users = userService.createNewUser(user.id, user.name);
    console.log(`${user.name} connected.`);
    const response = {
        type: WsMessageType.User,
        data: users
    }
    broadcastMessage(response);
});

function broadcastMessage(json: WsMessageInterface) {
    const clients = getWss().clients;
    // We are sending the current data to all connected active clients
    const data = JSON.stringify(json);
    clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}


// START THE SERVER
// =============================================================================
app.listen((PORT), () => {
    console.info(`Express server listening on port ${PORT}`);
    connectToDB();
})



