import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Player, User } from '../../../common';

// Define a type for the slice state
interface ConfigState {
	user: User | undefined;
}

// Define the initial state using that type
const initialState: ConfigState = {
	user: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
		setHost: (state, action: PayloadAction<User>) => {
			if (state.user?.isHost) {
				state.user = action.payload;
			}
		},
		cleanState: (state) => {
			state.user = undefined;
		},
	},
});

export const { setUser, setHost, cleanState } = userSlice.actions;

export const selectPlayerList = (state: RootState): Player[] => state.user.user.players ?? [];
export const selectUser = (state: RootState): User | undefined => state.user.user;

export default userSlice.reducer;
