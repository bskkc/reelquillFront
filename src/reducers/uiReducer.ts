import { createReducer } from '@reduxjs/toolkit';
import { addQuillModalStatusChanged, messageDrawerStatusChanged, messageDetailDrawerStatusChanged, mainContentStatusChanged, themeChanged } from '../actions/uiActions';
import { initialState } from '../constants/initialState';

const uiReducer = createReducer(initialState.ui, (builder) => {
    builder
        .addCase(addQuillModalStatusChanged, (state, action) => {
            state.isAddQuillModalOpen = action.payload;
        })
        .addCase(messageDrawerStatusChanged, (state, action) => {
            state.isMessageDrawerOpen = action.payload;
        })
        .addCase(messageDetailDrawerStatusChanged, (state, action) => {
            state.isMessageDetailDrawerOpen = action.payload;
        })
        .addCase(mainContentStatusChanged, (state, action) => {
            state.isMainContentInProgress = action.payload;
        })
        .addCase(themeChanged, (state, action) => {
            state.theme = action.payload;
        })
});

export default uiReducer;
