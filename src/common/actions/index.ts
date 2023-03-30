import { BuzzerGameActions } from './buzzer-game.actions';
import { RoomActions } from './room.actions';
import { UserActions } from './user.actions';
import { MainActions } from './main.actions';
import { ErrorActions } from './error.actions';

export type StoreActions = BuzzerGameActions | RoomActions | UserActions | MainActions | ErrorActions;
