import React from 'react';
import { Button, Container, CssBaseline } from '@mui/material';
import MainInputComponent from '../../components/main-input/main-input.component';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/reducers/user.reducer';
import { IWsMessage } from '../../../common';
import { useSocketHook } from '../../hooks/use-socket.hook';
import { UserMessages } from '../../../common/interfaces/messages';
import { BuzzerRoutes } from './buzzer.router';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const BuzzerGame = () => {
	const currentUser = useSelector(selectUser);
	const navigate = useNavigate();
	const currentPath = useLocation().pathname;
	const currentPageIsHost = currentPath.match(`${BuzzerRoutes.Host}$`);
	const currentPageIsMain = currentPath.match(`${BuzzerRoutes.Main}$`);
	const validateInput = (input: string): boolean => {
		const codeValidation = /^[a-zA-Z0-9]{4}$/;
		return !!input.match(codeValidation);
	};

	const { sendJsonMessage } = useSocketHook(currentUser);

	const handleJoinGame = (code: string) => {
		const message: IWsMessage = {
			type: UserMessages.UserJoinGame,
			data: {
				gameName: code,
			},
		};
		sendJsonMessage(message);
		navigate(`${BuzzerRoutes.Game}/gameId`);
	};

	const handleGoToHost = () => {
		navigate(BuzzerRoutes.Host);
	};

	const handleGoToMain = () => {
		navigate(BuzzerRoutes.Main);
	};

	const hostSelector = () => {
		if (currentPageIsMain) {
			return currentPageIsHost ? <Button onClick={handleGoToMain}>Join game</Button> : <Button onClick={handleGoToHost}>Host</Button>;
		}
		return (
			<Button onClick={handleGoToMain} startIcon={<ArrowBackIosIcon />}>
				Back
			</Button>
		);
	};

	return (
		<Container>
			<CssBaseline />
			{hostSelector()}

			{currentPageIsMain ? (
				<MainInputComponent
					title="Ask your teacher for the code"
					ctaLabel="join game"
					placeholder="Code of the game"
					icon={<SportsEsportsIcon />}
					onSubmit={handleJoinGame}
					validateInput={validateInput}
					helperText="4 letters and/or numbers. E.g: eCT4"
					minLength={4}
				/>
			) : null}

			<Outlet />
		</Container>
	);
};

export default BuzzerGame;
