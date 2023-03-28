import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { Container } from '@mui/material';
import BuzzerHost from './components/buzzer-host';
import BuzzerPlayer from './components/buzzer-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useBuzzerSocketHook } from '../../hooks/use-buzzer-socket.hook';
import { BuzzerRoutes } from './buzzer.router';
import { setLastMessageAction } from '../../store/reducers/main.reducer';
import { ClientMessagesTypes } from '../../../common/interfaces/messages/client-messages.interface';
import { RoomMessages } from '../../../common/interfaces/messages';
import { removePlayerAction, setPlayerAction, setPlayersAction } from '../../store/reducers/room.reducer';

const BuzzerRoomGame = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const { gameId } = useParams();
	const { sendJsonMessage, lastJsonMessage } = useBuzzerSocketHook(currentUser, gameId);

	useEffect(() => {
		if (lastJsonMessage) {
			const { type, message } = lastJsonMessage;
			switch (type) {
				case ClientMessagesTypes.Success:
				case ClientMessagesTypes.Info:
				case ClientMessagesTypes.Warning:
				case ClientMessagesTypes.Error:
					dispatch(setLastMessageAction(lastJsonMessage));
					if (lastJsonMessage.type === ClientMessagesTypes.Error) {
						navigate(BuzzerRoutes.Lobby);
					}
					break;
				case RoomMessages.RoomUserJoined:
					dispatch(setPlayerAction(message));
					break;
				case RoomMessages.RoomAllRoomPlayers:
					dispatch(setPlayersAction(message));
					break;
				case RoomMessages.RoomUserDisconnected:
					dispatch(removePlayerAction(message));
					break;
			}
			console.log(lastJsonMessage);
		}
	}, [lastJsonMessage]);

	if (!currentUser) {
		return null;
	}

	return <Container>{currentUser.isHost ? <BuzzerHost /> : <BuzzerPlayer />}</Container>;
};

export default BuzzerRoomGame;
