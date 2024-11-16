import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../constants/initialState';
import { notificationDataChanged } from '../actions/notificationActions';

const notificationReducer = createReducer(initialState.notification, (builder) => {
    builder
        .addCase(notificationDataChanged, (state, action) => {
            state.data = action.payload;
        })
});

export default notificationReducer;
