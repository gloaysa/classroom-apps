import { RootState } from '../store';
import { BuzzerGameActions, BuzzerGameActionTypes } from '../../../common/actions/buzzer-game.actions';

// Define a type for the slice state
interface BuzzerGameState {
	buzzerOn: boolean | undefined;
}

// Define the initial state using that type
const initialState: BuzzerGameState = {
	buzzerOn: undefined,
};

const buzzerGameReducer = (state = initialState, action: BuzzerGameActions): BuzzerGameState => {
	switch (action.type) {
		case BuzzerGameActionTypes.SetBuzzerOnOff:
			return {
				...state,
				buzzerOn: action.payload,
			};
		default:
			return state;
	}
};

export const selectBuzzerOnOff = (state: RootState): boolean | undefined => state.buzzerGame.buzzerOn;

export default buzzerGameReducer;
