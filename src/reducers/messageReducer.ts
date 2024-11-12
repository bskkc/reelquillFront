import { createReducer } from '@reduxjs/toolkit';
import { messageDataChanged, selectedMessageChanged } from '../actions/messageActions';
import { initialState } from '../constants/initialState';

const messageReducer = createReducer(initialState.message, (builder) => {
    builder
        .addCase(messageDataChanged, (state, action) => {
            state.data = action.payload;
        })
        .addCase(selectedMessageChanged, (state, action) => {
            state.selectedMessage = action.payload;
        })
});

export default messageReducer;
