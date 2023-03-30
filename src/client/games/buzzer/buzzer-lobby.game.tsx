import React, { useState } from 'react';
import { Button, Container, CssBaseline } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { BuzzerRoutes } from './buzzer.router';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGameHook } from '../../hooks/use-game.hook';
import BuzzerGameSelector from './components/buzzer-game-selector';
import { useAppDispatch } from '../../hooks/app-store.hook';
import { UserActionTypes } from '../../../common/actions/user.actions';

const BuzzerLobbyGame = () => {
	const [createGameMode, setCreateGameMode] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const currentUser = useSelector(selectUser);
	const { createGame } = useGameHook(dispatch);
	const currentPath = useLocation().pathname;
	const currentPageIsLobby = currentPath.match(`${BuzzerRoutes.Lobby}$`);

	const handleJoinGame = (code: string) => {
		navigate(`${BuzzerRoutes.Lobby}/${code}`);
	};

	const handleGoToCreateGame = () => {
		setCreateGameMode(true);
	};

	const handleGoToJoinGame = () => {
		setCreateGameMode(false);
	};

	const handleGoToLobby = () => {
		navigate(BuzzerRoutes.Lobby);
	};

	const handleCreateGame = () => {
		if (currentUser) {
			createGame(currentUser).then((action) => {
				if (action.type === UserActionTypes.SetUser) {
					navigate(`${BuzzerRoutes.Lobby}/${action.payload.roomId}`);
				}
			});
		}
	};

	const navigationButton = () => {
		if (currentPageIsLobby) {
			return createGameMode ? (
				<Button onClick={handleGoToJoinGame}>Join game</Button>
			) : (
				<Button onClick={handleGoToCreateGame}>Create new game</Button>
			);
		}
	};

	return (
		<Container>
			<CssBaseline />
			{navigationButton()}

			{currentPageIsLobby ? <BuzzerGameSelector onCreateGame={handleCreateGame} createGameMode={createGameMode} onJoinGame={handleJoinGame} /> : null}

			<Outlet />
		</Container>
	);
};

export default BuzzerLobbyGame;
