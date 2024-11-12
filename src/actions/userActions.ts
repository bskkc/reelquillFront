import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';
import { User } from '../models/user'; 

export const userInfoChanged = createAction<User>(actionEnum.USER_INFO_CHANGED);
export const isAuthenticated = createAction<boolean>(actionEnum.USER_AUTHENTICATED);

const userActions = {
    userInfoChanged,
    isAuthenticated
};

export default userActions;
