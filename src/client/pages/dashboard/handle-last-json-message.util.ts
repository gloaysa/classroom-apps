import { Dispatch } from '@reduxjs/toolkit';
import { IWsMessage, WsMessageType } from '../../../common';
import { setHost, setUser } from '../../store/reducers/user.reducer';
import { setBuzzerOnOff } from '../../store/reducers/config.reducer';

export const handleLastJsonMessageUtil = (message: IWsMessage, dispatch: Dispatch) => {
	if (message !== null) {
		switch (message.type) {
			case WsMessageType.NewUser:
				if (message.data) {
					dispatch(setUser(message.data));
				}
				break;
			case WsMessageType.User:
				if (message.data) {
					dispatch(setUser(message.data));
				}
				break;
			case WsMessageType.ForHost:
				if (message.data) {
					dispatch(setHost(message.data));
				}
				break;
			case WsMessageType.BuzzerOnOff:
				dispatch(setBuzzerOnOff(message.data));
		}
	}
};
