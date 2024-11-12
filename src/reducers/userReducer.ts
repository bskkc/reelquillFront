import { createReducer } from '@reduxjs/toolkit';
import { userInfoChanged, isAuthenticated } from '../actions/userActions';
import { initialState } from '../constants/initialState';

const userReducer = createReducer(initialState.userInfo, (builder) => {
    builder
        .addCase(userInfoChanged, (state, action) => {
            state.data = action.payload;
        })
        .addCase(isAuthenticated, (state, action) => {
            state.isAuthenticated = action.payload;
        })
});

export default userReducer;
