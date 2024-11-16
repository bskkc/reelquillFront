import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { UserController } from '../../controllers/UserController';
import { User } from '../../models/user';
import { Box, Divider, List, Paper, Typography } from '@mui/material';
import { QuillController } from '../../controllers/QuillController';
import { Quill } from '../../models/quill';
import uiConstantsTR from '../../constants/uiConstantsTR';
import { formatDateWithText } from '../../helpers/formatter';
import ListItemView from '../common/ListItemView';
import ButtonView from '../common/ButtonView';
import { AddFriendRequest } from '../../models/addFriendRequest';
import { FriendController } from '../../controllers/FriendController';
import { useSelector } from 'react-redux';


const UserProfilePage: React.FC = () => {
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
    const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(false);
    const { selectedUserId } = location.state || {};
    const userInfo = useSelector((state: any) => state.userInfo);

    useEffect(() => {
        const checkRequest: AddFriendRequest = {
            userId: userInfo.data.id,
            friendId: selectedUserId,
        };
        FriendController.checkFriend(checkRequest, (response: boolean | null) => {
            if (response) {
                setIsAddBtnDisabled(response);
            } else {
                setIsAddBtnDisabled(false);
            }
        });
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
            {userDetail ? (
                <>
                    <Box sx={{ p: 2 }}>
                        <Paper sx={{ p: 2 }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Typography variant="h5" color="text.secondary">{userDetail.username}</Typography>
                                    <Typography variant="body1" color="text.secondary">{formatDateWithText(userDetail.creationDate)}</Typography>
                                </div>

                                <ButtonView
                                    label={uiConstantsTR.NOTIFICATION_DRAWER.ADD_BUTTON}
                                    onClickCallback={() => handleAddFriend(userDetail.id)}
                                    variant='outlined'
                                    isDisabled={isAddBtnDisabled}
                                />
                            </div>
                        </Paper>

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
                <span>{uiConstantsTR.USER_MESSAGES.NO_USER}</span>
            )}
        </div>
    );
}
export default UserProfilePage;
