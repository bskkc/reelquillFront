import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../styles/HomePage.scss';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemView from '../../common/ListItemView';
import { QuillController } from '../../../controllers/QuillController';
import { GetQuillRequest } from '../../../models/getQuillRequest';
import { useDispatch, useSelector } from 'react-redux';
import { Quill } from '../../../models/quill';
import { formatDateWithText } from '../../../helpers/formatter';
import uiConstantsTR from '../../../constants/uiConstantsTR';

const FriendsQuillsTab: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: any) => state.userInfo.isAuthenticated);
    const userInfo = useSelector((state: any) => state.userInfo);
    const quills = useSelector((state: any) => state.quills.friendsQuills) as Quill[];

    useEffect(() => {
        const userId = userInfo.data.id;
        const getQuillRequest: GetQuillRequest = {
            userId: userId,
        };

        QuillController.getFriendsQuills(getQuillRequest, dispatch);
    }, []);

    return (
        <div className="tab-div">
            {quills.length > 0 ? (
                <div className="tab-container">
                    <List className='list'>
                        {quills.map((quill: Quill, index: number) => (
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
                </div>
            ) : (
                <span>{uiConstantsTR.USER_MESSAGES.NO_QUILLS}</span>
            )}
        </div>
    );
};

export default FriendsQuillsTab;
