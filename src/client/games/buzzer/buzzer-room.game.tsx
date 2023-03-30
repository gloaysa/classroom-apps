import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { Container, Typography } from '@mui/material';
import BuzzerHost from './components/buzzer-host';
import BuzzerPlayer from './components/buzzer-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useBuzzerSocketHook } from '../../hooks/use-buzzer-socket.hook';
import { useAppDispatch } from '../../hooks/app-store.hook';
import { BuzzerGameActionTypes } from '../../../common/actions/buzzer-game.actions';
import { BuzzerRoutes } from './buzzer.router';
import { ErrorActionTypes } from '../../../common/actions/error.actions';

const BuzzerRoomGame = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const { gameId } = useParams();
	const { sendActionMessage, lastMessage } = useBuzzerSocketHook(currentUser, gameId, dispatch);

	useEffect(() => {
		if (currentUser) {
			sendActionMessage({ type: BuzzerGameActionTypes.BuzzerUserJoined, payload: currentUser });
		}
	}, [currentUser]);

	useEffect(() => {
		if (lastMessage?.type === ErrorActionTypes.RoomDoesNotExist) {
			navigate(BuzzerRoutes.Lobby);
		}
	}, [lastMessage]);

	if (!currentUser) {
		return null;
	}

	return (
		<Container>
			<Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
				{gameId}
			</Typography>
			{currentUser.isHost ? <BuzzerHost sendMessage={sendActionMessage} /> : <BuzzerPlayer player={currentUser} sendMessage={sendActionMessage} />}
		</Container>
	);
};

export default BuzzerRoomGame;
