import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IUser, Player } from '../../../common';

// Define a type for the slice state
interface ConfigState {
	user: IUser | undefined;
}

// Define the initial state using that type
const initialState: ConfigState = {
	user: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserAction: (state, action: PayloadAction<IUser | undefined>) => {
			state.user = action.payload;
		},
		setHostAction: (state, action: PayloadAction<IUser>) => {
			if (state.user?.isHost) {
				state.user = action.payload;
			}
		},
		cleanStateAction: (state) => {
			state.user = undefined;
		},
	},
});

export const { setUserAction, setHostAction, cleanStateAction } = userSlice.actions;

export const selectPlayerList = (state: RootState): Player[] => state.user.user?.players ?? [];
export const selectUser = (state: RootState): IUser | undefined => state.user.user;

export default userSlice.reducer;
