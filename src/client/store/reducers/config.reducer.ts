import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface ConfigState {
	main: string;
}

// Define the initial state using that type
const initialState: ConfigState = {
	main: '',
};

export const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		setMainConfig: (state, action: PayloadAction<string>) => {
			state.main = action.payload;
		},
	},
});

export const { setMainConfig } = configSlice.actions;

export const selectMainConfig = (state: RootState): string => state.config.main;

export default configSlice.reducer;
