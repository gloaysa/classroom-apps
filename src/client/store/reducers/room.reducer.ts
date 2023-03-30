import { RootState } from '../store';
import { RoomActions, RoomActionTypes } from '../../../common/actions/room.actions';
import { IUser } from '../../../common/interfaces/user.interface';

// Define a type for the slice state
interface RoomState {
	roomCode: string | undefined;
	players: IUser[];
}

// Define the initial state using that type
const initialState: RoomState = {
	roomCode: undefined,
	players: [],
};

const roomReducer = (state = initialState, action: RoomActions): RoomState => {
	switch (action.type) {
		case RoomActionTypes.SetPlayers:
			return {
				...state,
				players: action.payload,
			};
		case RoomActionTypes.PlayerDisconnected:
			return {
				...state,
				players: state.players.filter(({ id }) => action.payload.id !== id),
			};
		default:
			return state;
	}
};

export const selectPlayers = (state: RootState): IUser[] => state.room.players;

export default roomReducer;
