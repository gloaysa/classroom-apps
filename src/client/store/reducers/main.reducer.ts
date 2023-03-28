import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IClientMessages } from '../../../common/interfaces/messages/client-messages.interface';

// Define a type for the slice state
interface MainState {
	lastMessage: IClientMessages | undefined;
}

// Define the initial state using that type
const initialState: MainState = {
	lastMessage: undefined,
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setLastMessageAction: (state, action: PayloadAction<IClientMessages | undefined>) => {
			state.lastMessage = action.payload;
		},
	},
});

export const { setLastMessageAction } = mainSlice.actions;

export const selectLastMessage = (state: RootState): IClientMessages | undefined => state.main.lastMessage;

export default mainSlice.reducer;
