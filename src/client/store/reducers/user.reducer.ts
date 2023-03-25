import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from '../../../common';

// Define a type for the slice state
interface ConfigState {
	userList: User[];
	user: User | undefined;
}

// Define the initial state using that type
const initialState: ConfigState = {
	userList: [],
	user: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		updateUserList: (state, action: PayloadAction<User[]>) => {
			state.userList = action.payload;
		},
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

export const { updateUserList, setUser } = userSlice.actions;

export const selectUserList = (state: RootState): User[] => state.user.userList;
export const selectUser = (state: RootState): User => state.user.user;

export default userSlice.reducer;
