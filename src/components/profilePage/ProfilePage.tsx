import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Divider, Paper } from '@mui/material';
import { User } from '../../models/user';
import { UserController } from '../../controllers/UserController';
import { useDispatch, useSelector } from 'react-redux';
import TextFieldView from '../common/TextFieldView';
import uiConstantsTR from '../../constants/uiConstantsTR';
import { formatDateWithText } from '../../helpers/formatter';
import ButtonView from '../common/ButtonView';
import Inbox from '../common/Inbox';
import Messaging from '../common/Messaging';

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.userInfo);

    const [profile, setProfile] = useState<User>({
        id: 1,
        username: '',
        email: '',
        password: '',
        creationDate: '',
        updateDate: ''
    });

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: profile.username,
        email: profile.email,
        password: ''
    });

    useEffect(() => {
        if (userInfo.data) {
            setProfile(userInfo.data);
            setFormData({
                username: userInfo.data.username,
                email: userInfo.data.email,
                password: userInfo.data.password
            });
        }
    }, [userInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        UserController.updateUser({ ...formData, id: userInfo.data.id }, dispatch);
        setProfile({ ...profile, ...formData, updateDate: new Date().toISOString() });
        setEditMode(false);
    };

    return (
        <div>
            <Paper className='m-5 p-4'>
                <Typography variant="h4" gutterBottom>{uiConstantsTR.PROFILE_PAGE.PROFILE}</Typography>
                <Divider sx={{ my: 2 }} />

                <Typography color="text.secondary">{uiConstantsTR.PROFILE_PAGE.CREATION_DATE} {formatDateWithText(profile.creationDate)}</Typography>
                <Typography color="text.secondary">{uiConstantsTR.PROFILE_PAGE.UPDATED_DATE} {formatDateWithText(profile.updateDate)}</Typography>

                <Divider sx={{ my: 2 }} />

                {editMode ? (
                    <>
                        <TextFieldView
                            label={uiConstantsTR.PROFILE_PAGE.USERNAME}
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextFieldView
                            label={uiConstantsTR.PROFILE_PAGE.MAIL_ADDRESS}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextFieldView
                            label={uiConstantsTR.PROFILE_PAGE.NEW_PASSWORD}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <ButtonView
                                color="primary"
                                variant='outlined'
                                label={uiConstantsTR.PROFILE_PAGE.CANCEL_BUTTON}
                                onClickCallback={() => setEditMode(false)}
                            />
                            <ButtonView
                                label={uiConstantsTR.PROFILE_PAGE.SAVE_BUTTON}
                                onClickCallback={handleSave}
                            />
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography color="text.secondary">{uiConstantsTR.PROFILE_PAGE.USERNAME} {profile.username}</Typography>
                        <Typography color="text.secondary">{uiConstantsTR.PROFILE_PAGE.MAIL_ADDRESS} {profile.email}</Typography>
                        <Button variant="contained" onClick={() => setEditMode(true)} className='mt-5'>
                            {uiConstantsTR.PROFILE_PAGE.EDIT_PROFILE_BUTTON}
                        </Button>
                    </>
                )}
            </Paper>
        </div>
    );
};

export default ProfilePage;
