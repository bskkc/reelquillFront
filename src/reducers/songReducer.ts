import { createReducer } from '@reduxjs/toolkit';
import { songDataChanged } from '../actions/songActions';
import { initialState } from '../constants/initialState';

const songReducer = createReducer(initialState.song, (builder) => {
    builder
        .addCase(songDataChanged, (state, action) => {
            state.data = action.payload;
        })
});

export default songReducer;
