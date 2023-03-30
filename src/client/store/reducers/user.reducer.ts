import { RootState } from '../store';
import { UserActions, UserActionTypes } from '../../../common/actions/user.actions';
import { IUser } from '../../../common/interfaces/user.interface';

// Define a type for the slice state
interface UserState {
	user: IUser | undefined;
}

// Define the initial state using that type
const initialState: UserState = {
	user: undefined,
};

const userReducer = (state = initialState, action: UserActions): UserState => {
	switch (action.type) {
		case UserActionTypes.SetUser:
			return {
				...state,
				user: action.payload,
			};
		case UserActionTypes.RemoveUser:
			return {
				...state,
				user: undefined,
			};
		default:
			return state;
	}
};

export const selectUser = (state: RootState): IUser | undefined => state.user.user;

export default userReducer;
