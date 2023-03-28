import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser } from '../../../common';

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

export const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		setPlayersAction: (state, action: PayloadAction<IUser[]>) => {
			state.players = action.payload;
		},
		setPlayerAction: (state, action: PayloadAction<IUser>) => {
			state.players = [...state.players, action.payload];
		},
		removePlayerAction: (state, action: PayloadAction<IUser>) => {
			state.players = state.players.filter(({ id }) => action.payload.id !== id);
		},
	},
});

export const { setPlayersAction, setPlayerAction, removePlayerAction } = roomSlice.actions;

export const selectPlayers = (state: RootState): IUser[] => state.room.players;

export default roomSlice.reducer;
