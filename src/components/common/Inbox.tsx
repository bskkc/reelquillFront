import React, { useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import uiActions from '../../actions/uiActions';
import { MessageController } from '../../controllers/MessageController';
import { MessageResponse } from '../../models/messageResponse';
import messageActions from '../../actions/messageActions';
import { formatDateWithText } from '../../helpers/formatter';
import '../../styles/Messaging.scss';
import uiConstantsTR from '../../constants/uiConstantsTR';


export default function Inbox() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const isMessageDrawerOpen = useSelector((state: any) => state.ui.isMessageDrawerOpen);
    const userInfo = useSelector((state: any) => state.userInfo);
    const messages = useSelector((state: any) => state.message.data);

    useEffect(() => {
        if (userInfo.data) {
            const userId = userInfo.data.id;
            MessageController.getAllMessage(userId, dispatch);
        }
    }, [userInfo.data, dispatch, isMessageDrawerOpen]);

    const toggleDrawer = (open: boolean) => () => {
        dispatch(uiActions.messageDrawerStatusChanged(open));
    };

    return (
        <div>
            <Drawer anchor="right" open={isMessageDrawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 500, p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        {uiConstantsTR.MESSAGE_DRAWER.INBOX_TITLE}
                    </Typography>
                    <Divider />

                    <List sx={{ mt: 2 }}>
                        {messages.map((message: MessageResponse, index: number) => (
                            <React.Fragment key={index}>
                                {message.timestamp && (
                                    new Date(message.timestamp).toLocaleDateString() === new Date().toLocaleDateString() ?
                                        <ListSubheader>
                                            {uiConstantsTR.MESSAGE_DRAWER.TODAY_LABEL}
                                        </ListSubheader>
                                        :
                                        <ListSubheader>
                                            {uiConstantsTR.MESSAGE_DRAWER.PREV_LABEL}
                                        </ListSubheader>
                                )}

                                <ListItemButton onClick={() => {
                                    let updatedMessage = { ...message };
                                    const currentUserId = userInfo.data.id;
                                    if (updatedMessage.senderId !== currentUserId) {
                                        updatedMessage.senderId = currentUserId;
                                        updatedMessage.receiverId = message.senderId;
                                        updatedMessage.senderUsername = userInfo.data.username;
                                        updatedMessage.receiverUsername = message.senderUsername;
                                    }
                                    const selectedMessage = updatedMessage;
                                    dispatch(uiActions.messageDrawerStatusChanged(false));
                                    dispatch(uiActions.messageDetailDrawerStatusChanged(true));
                                    dispatch(messageActions.selectedMessageChanged(selectedMessage));
                                }}>

                                    <ListItemAvatar>
                                        <Avatar alt={message.senderUsername || "Profile Picture"} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <div className="inbox-header">
                                                <span>{message.receiverUsername}</span>
                                                <span className="inbox-timestamp">{formatDateWithText(message.timestamp)}</span>
                                            </div>
                                        }
                                        secondary={
                                            <div className="inbox-message-content">
                                                {message.content}
                                            </div>
                                        }
                                    />
                                </ListItemButton>
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}
