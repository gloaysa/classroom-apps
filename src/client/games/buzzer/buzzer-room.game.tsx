import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { Container } from '@mui/material';
import BuzzerHost from './components/buzzer-host';
import BuzzerPlayer from './components/buzzer-player';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorMessages } from '../../../common/interfaces/messages';
import { useBuzzerSocketHook } from '../../hooks/use-buzzer-socket.hook';
import { BuzzerRoutes } from './buzzer.router';
import { setLastErrorAction } from '../../store/reducers/main.reducer';

const BuzzerRoomGame = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const { gameId } = useParams();
	const { sendJsonMessage, lastJsonMessage } = useBuzzerSocketHook(currentUser, gameId);

	useEffect(() => {
		if (lastJsonMessage) {
			switch (lastJsonMessage.type) {
				case ErrorMessages.ErrorRoomDoestNotExist:
					dispatch(
						setLastErrorAction({
							type: 'error',
							message: `Game ${gameId} does not exist!`,
						})
					);
					navigate(BuzzerRoutes.Lobby);
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
