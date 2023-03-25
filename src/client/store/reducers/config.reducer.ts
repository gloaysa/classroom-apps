import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface ConfigState {
	buzzerOn: boolean;
}

// Define the initial state using that type
const initialState: ConfigState = {
	buzzerOn: false,
};

export const configSlice = createSlice({
	name: 'config',
	initialState,
	reducers: {
		setBuzzerOnOff: (state, action: PayloadAction<boolean>) => {
			state.buzzerOn = action.payload;
		},
	},
});

export const { setBuzzerOnOff } = configSlice.actions;

export const selectBuzzerOnOff = (state: RootState): string => state.config.buzzerOn;

export default configSlice.reducer;
