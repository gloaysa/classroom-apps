import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { Container, Typography } from '@mui/material';
import BuzzerHost from './components/buzzer-host';
import BuzzerPlayer from './components/buzzer-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useBuzzerSocketHook } from '../../hooks/use-buzzer-socket.hook';
import { BuzzerGameActionTypes } from '../../../common/actions/buzzer-game.actions';
import { BuzzerRoutes } from './buzzer.router';
import { ErrorActionTypes } from '../../../common/actions/error.actions';
import { MainRoutes } from '../../index.router';
import { selectPlayers } from '../../store/reducers/room.reducer';
import { selectBuzzerOnOff } from '../../store/reducers/buzzer.reducer';

const BuzzerRoomGame = () => {
	const navigate = useNavigate();
	const currentUser = useSelector(selectUser);
	const players = useSelector(selectPlayers);
	const buzzerOn = useSelector(selectBuzzerOnOff);
	const { gameId } = useParams();
	const { sendActionMessage, action } = useBuzzerSocketHook(currentUser, gameId);

	useEffect(() => {
		if (currentUser) {
			sendActionMessage({ type: BuzzerGameActionTypes.BuzzerUserJoined, payload: currentUser });
		}
	}, [currentUser]);

	useEffect(() => {
		if (action?.type === ErrorActionTypes.RoomDoesNotExist) {
			navigate(BuzzerRoutes.Lobby);
		}
		if (action?.type === ErrorActionTypes.UserDoesNotExist) {
			navigate(MainRoutes.Login);
		}
	}, [action]);

	if (!currentUser || !gameId || buzzerOn === undefined) {
		return null;
	}

	const currentUserIsHost = (): boolean => !!currentUser?.hostingRooms.includes(gameId);

	return (
		<Container>
			<Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>
				{gameId}
			</Typography>
			{currentUserIsHost() ? (
				<BuzzerHost
					sendMessage={sendActionMessage}
					players={players.filter(({ hostingRooms }) => !hostingRooms.includes(gameId))}
					buzzerOn={buzzerOn}
				/>
			) : (
				<BuzzerPlayer player={currentUser} sendMessage={sendActionMessage} buzzerOn={buzzerOn} />
			)}
		</Container>
	);
};

export default BuzzerRoomGame;
