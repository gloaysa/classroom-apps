import React, { FunctionComponent } from 'react';
import './user-list.component.scss';
import { IUser } from '../../../common/interfaces/user.interface';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

interface IUserListComponent {
	players: IUser[];
	listName: string;
	showStar?: boolean;
	buzzerOn: boolean;
}
const UserListComponent: FunctionComponent<IUserListComponent> = ({
	players,
	buzzerOn,
	listName,
	showStar,
}) => {
	const getListItemColor = (player: IUser) => {
		const userHasBuzzed = !!player.updatedAt;
		if (userHasBuzzed && buzzerOn) {
			return 'transparent';
		}
		if (buzzerOn) {
			return '#fd856b';
		}
		if (!buzzerOn) {
			return 'transparent';
		}
	};

	if (!players.length) {
		return null;
	}

	const starIconColor = (position: number): 'gold' | 'silver' | '#CD7F32' | undefined => {
		if (position === 0) {
			return 'gold';
		}
		if (position === 1) {
			return 'silver';
		}
		if (position === 2) {
			return '#CD7F32';
		}
	};
	const shouldDisplayStar = (userHasBuzzed: boolean, position: number): boolean => {
		if (!userHasBuzzed) {
			return false;
		}
		return !!showStar && position < 3;
	};
	const shouldIndent = (userHasBuzzed: boolean, position: number): boolean => {
		if (!showStar) {
			return false;
		}
		return !shouldDisplayStar(userHasBuzzed, position);
	};

	return (
		<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} aria-label="contacts">
			<ListItemText primary={listName} />
			{players.map((player, index) => {
				return (
					<ListItem
						disablePadding
						key={`${player.name}-${index}`}
						sx={{ backgroundColor: getListItemColor(player) }}
					>
						<ListItemButton>
							{shouldDisplayStar(!!player.updatedAt, index) ? (
								<ListItemIcon sx={{ color: starIconColor(index) }}>
									<StarIcon />
								</ListItemIcon>
							) : null}
							<ListItemText inset={shouldIndent(!!player.updatedAt, index)} primary={player.name} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};

export default UserListComponent;
