import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// Define a type for the slice state
interface BuzzerGameState {
	buzzerOn: boolean;
}

// Define the initial state using that type
const initialState: BuzzerGameState = {
	buzzerOn: false,
};

export const buzzerGameSlice = createSlice({
	name: 'buzzerGame',
	initialState,
	reducers: {
		setBuzzerOnOff: (state, action: PayloadAction<boolean>) => {
			state.buzzerOn = action.payload;
		},
	},
});

export const { setBuzzerOnOff } = buzzerGameSlice.actions;

export const selectBuzzerOnOff = (state: RootState): boolean => state.buzzerGame.buzzerOn;

export default buzzerGameSlice.reducer;
