import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../constants/initialState';
import { bookDataChanged } from '../actions/bookActions';

const bookReducer = createReducer(initialState.book, (builder) => {
    builder
        .addCase(bookDataChanged, (state, action) => {
            state.data = action.payload;
        })
});

export default bookReducer;
