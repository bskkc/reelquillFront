import React, { useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import uiActions from '../../actions/uiActions';
import { formatDateWithText } from '../../helpers/formatter';
import '../../styles/Notification.scss';
import uiConstantsTR from '../../constants/uiConstantsTR';
import { GetNotificationResponse } from '../../models/getNotificationResponse';
import ButtonView from './ButtonView';
import { FriendController } from '../../controllers/FriendController';
import { AddFriendRequest } from '../../models/addFriendRequest';


export default function NotificationList() {
    const dispatch = useDispatch();
    const isNotificationDrawerOpen = useSelector((state: any) => state.ui.isNotificationDrawerOpen);
    const notifications = useSelector((state: any) => state.notification.data);
    const userInfo = useSelector((state: any) => state.userInfo);

    const toggleDrawer = (open: boolean) => () => {
        dispatch(uiActions.notificationDrawerStatusChanged(open));
    };

    const handleAddFriend = (receiverId: any) => {
        if (receiverId !== undefined || receiverId !== "") {
            const request: AddFriendRequest = {
                userId: userInfo.data.id,
                friendId: receiverId,
            };

            FriendController.addFriend(request);
        }
    };

    return (
        <div>
            <Drawer anchor="right" open={isNotificationDrawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 500, p: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        {uiConstantsTR.NOTIFICATION_DRAWER.NOTIFICATION_TITLE}
                    </Typography>
                    <Divider />

                    <List className='mt-2'>
                        {notifications.map((notification: GetNotificationResponse, index: number) => (
                            <React.Fragment key={index}>
                                {notification.createdAt && (
                                    new Date(notification.createdAt).toLocaleDateString() === new Date().toLocaleDateString() ?
                                        <ListSubheader>
                                            {uiConstantsTR.NOTIFICATION_DRAWER.TODAY_LABEL}
                                        </ListSubheader>
                                        :
                                        <ListSubheader className='mt-3'>
                                            {uiConstantsTR.NOTIFICATION_DRAWER.PREV_LABEL}
                                        </ListSubheader>
                                )}

                                <ListItemText
                                    primary={
                                        <div className="notification-header">
                                            <span>{notification.type === 0 ? `${notification.senderUsername} ${uiConstantsTR.NOTIFICATION_DRAWER.ADDED_FRIEND}` : notification.content}</span>
                                            <span className="notification-timestamp">{formatDateWithText(notification.createdAt)}</span>
                                        </div>
                                    }
                                    secondary={
                                        <div className="notification-content">
                                            {notification.type === 0 && notification.senderId ? (
                                                <ButtonView
                                                    label={uiConstantsTR.NOTIFICATION_DRAWER.ADD_BUTTON}
                                                    onClickCallback={() => handleAddFriend(notification.senderId)}
                                                    variant='outlined'
                                                />
                                            ) : (
                                                notification.type
                                            )}
                                        </div>
                                    }
                                />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}
