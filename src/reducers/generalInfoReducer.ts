import { createReducer } from '@reduxjs/toolkit';
import { initialState } from '../constants/initialState';
import { generalInfoDataChanged, detailedGeneralInfoChanged } from '../actions/generalInfoActions';

const generalInfoReducer = createReducer(initialState.generalInfo, (builder) => {
    builder
        .addCase(generalInfoDataChanged, (state, action) => {
            state.data = action.payload;
        })
        .addCase(detailedGeneralInfoChanged, (state, action) => {
            state.detailedGeneralInfo = action.payload;
        })
});

export default generalInfoReducer;
