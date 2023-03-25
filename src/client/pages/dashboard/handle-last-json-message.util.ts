import { updateUserList } from '../../store/reducers/user.reducer';
import { Dispatch } from '@reduxjs/toolkit';
import { WsMessageInterface, WsMessageType } from '../../../common';

export const handleLastJsonMessageUtil = (message: WsMessageInterface, dispatch: Dispatch) => {
	if (message !== null) {
		console.log(message);
		switch (message.type) {
			case WsMessageType.User:
				dispatch(updateUserList(message.data));
		}
	}
};
