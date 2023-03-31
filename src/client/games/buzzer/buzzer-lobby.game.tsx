import React from 'react';
import { Container, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { BuzzerRoutes } from './buzzer.router';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGameHook } from '../../hooks/use-game.hook';
import BuzzerGameSelector from './components/buzzer-game-selector';
import { useAppDispatch } from '../../hooks/app-store.hook';
import { RoomActionTypes } from '../../../common/actions/room.actions';

const BuzzerLobbyGame = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectUser);
	const { createGame } = useGameHook(dispatch);
	const currentPath = useLocation().pathname;
	const currentPageIsLobby = currentPath.match(`${BuzzerRoutes.Lobby}$`);

	if (!currentUser) {
		return null;
	}

	const handleJoinGame = (code: string) => {
		navigate(`${BuzzerRoutes.Lobby}/${code}`);
	};

	const handleCreateGame = () => {
		if (currentUser) {
			createGame(currentUser).then((actions) => {
				const createRoomAction = actions.find(({ type }) => type === RoomActionTypes.CreateRoom);
				if (createRoomAction) {
					navigate(`${BuzzerRoutes.Lobby}/${createRoomAction.payload}`);
				}
			});
		}
	};

	return (
		<Container>
			<CssBaseline />

			{currentPageIsLobby ? (
				<BuzzerGameSelector
					currentUser={currentUser}
					onCreateGame={handleCreateGame}
					onJoinGame={handleJoinGame}
				/>
			) : null}

			<Outlet />
		</Container>
	);
};

export default BuzzerLobbyGame;
