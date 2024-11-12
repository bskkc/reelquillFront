import { createReducer } from '@reduxjs/toolkit';
import { friendsQuillDataChanged, trendQuillDataChanged } from '../actions/quillActions';
import { initialState } from '../constants/initialState';

const quillReducer = createReducer(initialState.quills, (builder) => {
    builder
        .addCase(friendsQuillDataChanged, (state, action) => {
            state.friendsQuills = action.payload; 
        })
        .addCase(trendQuillDataChanged, (state, action) => {
            state.trendQuills = action.payload; 
        })
});

export default quillReducer;
