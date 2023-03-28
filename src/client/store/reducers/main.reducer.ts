import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IClientErrors } from '../../interfaces/client-errors.interface';

// Define a type for the slice state
interface MainState {
	lastError: IClientErrors | undefined;
}

// Define the initial state using that type
const initialState: MainState = {
	lastError: undefined,
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setLastErrorAction: (state, action: PayloadAction<IClientErrors | undefined>) => {
			state.lastError = action.payload;
		},
	},
});

export const { setLastErrorAction } = mainSlice.actions;

export const selectLastError = (state: RootState): IClientErrors | undefined => state.main.lastError;

export default mainSlice.reducer;
