import React, { useState } from 'react';
import { Button, Container, CssBaseline } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { BuzzerRoutes } from './buzzer.router';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useGameHook } from '../../hooks/use-game.hook';
import BuzzerGameSelector from './components/buzzer-game-selector';

const BuzzerLobbyGame = () => {
	const [createGameMode, setCreateGameMode] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
			createGame(currentUser).then((gameId) => {
				if (gameId) {
					navigate(`${BuzzerRoutes.Lobby}/${gameId}`);
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
		return (
			<Button onClick={handleGoToLobby} startIcon={<ArrowBackIosIcon />}>
				Back
			</Button>
		);
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
