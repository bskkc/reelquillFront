import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

interface ListItemViewProps {
    avatarSrc: string;
    primaryText: string;
    secondaryText: string;
    secondaryUser: string;
}

const ListItemView: React.FC<ListItemViewProps> = ({
    avatarSrc,
    primaryText,
    secondaryText,
    secondaryUser,
}) => {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={secondaryUser} src={avatarSrc} />
            </ListItemAvatar>
            <ListItemText
                primary={primaryText}
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            sx={{ color: 'text.primary', display: 'inline' }}
                        >
                            {secondaryUser}
                        </Typography>
                        {" — " + secondaryText}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
};

export default ListItemView;
