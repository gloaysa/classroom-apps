import { Dispatch } from '@reduxjs/toolkit';
import { IWsMessage } from '../../../common';
import { setHostAction, setUserAction } from '../../store/reducers/user.reducer';
import { setBuzzerOnOff } from '../../store/reducers/config.reducer';
import { BuzzerMessages, UserMessages } from '../../../common/interfaces/messages';

export const handleLastJsonMessageUtil = (message: IWsMessage, dispatch: Dispatch) => {
	if (message !== null) {
		switch (message.type) {
			case UserMessages.UserNew:
				if (message.data) {
					dispatch(setUserAction(message.data));
				}
				break;
			case UserMessages.User:
				if (message.data) {
					dispatch(setUserAction(message.data));
				}
				break;
			case UserMessages.UserForHost:
				if (message.data) {
					dispatch(setHostAction(message.data));
				}
				break;
			case BuzzerMessages.BuzzerOnOff:
				dispatch(setBuzzerOnOff(message.data));
		}
	}
};
