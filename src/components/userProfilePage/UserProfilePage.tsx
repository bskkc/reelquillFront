import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { UserController } from '../../controllers/UserController';
import { User } from '../../models/user';
import { Box, Divider, List, Typography } from '@mui/material';
import { QuillController } from '../../controllers/QuillController';
import { Quill } from '../../models/quill';
import uiConstantsTR from '../../constants/uiConstantsTR';
import { formatDateWithText } from '../../helpers/formatter';
import ListItemView from '../common/ListItemView';


const UserProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const [userDetail, setUserDetail] = useState<User>({
        id: 0,
        username: '',
        email: '',
        password: '',
        creationDate: '',
        updateDate: ''
    });
    const [userQuill, setUserQuill] = useState<Quill[]>([]);
    const { selectedUserId } = location.state || {};

    useEffect(() => {
        UserController.getUserById(selectedUserId, (response: User | null) => {
            if (response) {
                setUserDetail(response);
            } else {
                console.error('Failed to fetch comments');
            }
        });
        QuillController.getUserQuills(selectedUserId, (response: Quill[] | null) => {
            if (response) {
                setUserQuill(response);
            } else {
                console.error('Failed to fetch comments');
            }
        });
    }, [selectedUserId]);

    return (
        <div className='home-page'>
            {userDetail ? (
                <>
                    <Box sx={{ p: 2 }}>
                        <Box sx={{ p: 2 }}>
                            <Typography variant="h5" gutterBottom>User Details</Typography>
                            <Typography variant="body1" color="text.secondary">Name: {userDetail.username}</Typography>
                            <Typography variant="body1" color="text.secondary">{formatDateWithText(userDetail.creationDate)}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {userQuill.length > 0 ? (
                                <List className='list'>
                                    {userQuill.map((quill: Quill, index: number) => (
                                        <React.Fragment key={index}>
                                            <ListItemView
                                                avatarSrc="/static/images/avatar/1.jpg"
                                                primaryText={quill.quill}
                                                secondaryText={quill.username}
                                                secondaryUser={formatDateWithText(quill.createdAt)}
                                            />
                                            <Divider variant="inset" component="li" />
                                        </React.Fragment>
                                    ))}
                                </List>
                            ) : (
                                <span>{uiConstantsTR.USER_MESSAGES.NO_QUILLS}</span>
                            )}
                        </Box>
                    </Box>
                </>
            ) : (
                <p>Kullanıcı bilgisi bulunamadı.</p>
            )}
        </div>
    );
}
export default UserProfilePage;
