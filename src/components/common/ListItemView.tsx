import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import '../../styles/ListView.scss';
import { User } from '../../models/user';

interface ListItemViewProps {
    avatarSrc: string;
    primaryText: string;
    secondaryText: string;
    secondaryUser: string;
    handleSelectUser?: (userId: number) => void;
    userId?: number;
}

const ListItemView: React.FC<ListItemViewProps> = ({
    avatarSrc,
    primaryText,
    secondaryText,
    secondaryUser,
    handleSelectUser,
    userId = 0
}) => {
    return (
        <ListItem className='list-item'>
            <ListItemAvatar>
                <Avatar
                    alt={secondaryUser}
                    src={avatarSrc}
                    onClick={() => handleSelectUser && handleSelectUser(userId)}
                    sx={{ cursor: handleSelectUser ? 'pointer' : 'default' }}
                />
            </ListItemAvatar>
            <ListItemText
                primary={primaryText}
                secondary={
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <Typography
                            component="span"
                            variant="body2"
                            className='list-item-text'
                        >
                            {secondaryText}
                        </Typography>
                        <Typography
                            component="span"
                            variant="body2"
                            className='list-item-text'
                        >
                            {secondaryUser}
                        </Typography>
                    </div>
                }
            />
        </ListItem>
    );
};

export default ListItemView;
