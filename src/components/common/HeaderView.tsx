import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import { AccountCircle, Mail, Notifications, Brightness4, Brightness7, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SwitchView from './Switch';
import SearchView from './SearchView';
import uiActions from '../../actions/uiActions';
import uiConstantsTR from '../../constants/uiConstantsTR';
import { applicationEnum } from '../../constants/applicationEnum';
import IconButtonView from './IconButtonView';
import { NotificationController } from '../../controllers/NotificationController';
import { message } from 'antd';


export const HeaderView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSwitchChecked, setIsSwitchChecked] = useState(false);
    const isMessageDrawerOpen = useSelector((state: any) => state.ui.isMessageDrawerOpen);
    const isNotificationDrawerOpen = useSelector((state: any) => state.ui.isNotificationDrawerOpen);
    const userInfo = useSelector((state: any) => state.userInfo);
    const notifications = useSelector((state: any) => state.notification.data);
    const messages = useSelector((state: any) => state.message.data);

    useEffect(() => {
        if (userInfo.data.id !== "") {
            NotificationController.getAllNotification(userInfo.data.id, dispatch);
        }
    }, [userInfo.data.id]);

    const handleMessageMenuOpen = () => {
        dispatch(uiActions.messageDrawerStatusChanged(!isMessageDrawerOpen));
    };

    const handleProfileOpen = () => {
        navigate('/profile');
    };

    const handleHomeOpen = () => {
        navigate('/home');
    };

    const handleNotificationMenuOpen = () => {
        dispatch(uiActions.notificationDrawerStatusChanged(!isNotificationDrawerOpen));
    };

    const handleToggle = (checked: boolean) => {
        dispatch(uiActions.themeChanged(
            checked ? applicationEnum.THEME_ENUM.LIGHT : applicationEnum.THEME_ENUM.DARK
        ));
        setIsSwitchChecked(checked);
    };

    const handleLogout = () => {
        navigate("/");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{ cursor: 'pointer' }}
                        onClick={handleHomeOpen}
                    >
                        {uiConstantsTR.HOME_PAGE.REELQUILL_LABEL}
                    </Typography>
                    <SearchView />
                    <Box sx={{ flexGrow: 1 }} />
                    <SwitchView
                        checked={isSwitchChecked}
                        onToggle={handleToggle}
                        checkedIcon={<Brightness7 />}
                        uncheckedIcon={<Brightness4 />}
                    />
                    <IconButtonView onClickCallback={handleMessageMenuOpen}>
                        <Badge badgeContent={messages.length} color="error">
                            <Mail />
                        </Badge>
                    </IconButtonView >
                    <IconButtonView onClickCallback={handleNotificationMenuOpen}>
                        <Badge badgeContent={notifications.length} color="error">
                            <Notifications />
                        </Badge>
                    </IconButtonView>
                    <IconButtonView onClickCallback={handleProfileOpen}>
                        <AccountCircle />
                    </IconButtonView>
                    <IconButtonView onClickCallback={handleLogout}>
                        <Logout />
                    </IconButtonView>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
