import { RootState } from '../store';
import { IClientMessages, MainActions, MainActionTypes } from '../../../common/actions/main.actions';

// Define a type for the slice state
interface MainState {
	lastMessage: IClientMessages | undefined;
}

// Define the initial state using that type
const initialState: MainState = {
	lastMessage: undefined,
};

const userReducer = (state = initialState, action: MainActions): MainState => {
	switch (action.type) {
		case MainActionTypes.SetMessage:
			return {
				...state,
				lastMessage: action.payload,
			};
		default:
			return state;
	}
};

export const selectLastMessage = (state: RootState): IClientMessages | undefined => state.main.lastMessage;

export default userReducer;
