import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';

export const friendsQuillDataChanged = createAction<[]>(actionEnum.FRIENDS_QUILL_DATA_CHANGED);
export const trendQuillDataChanged = createAction<[]>(actionEnum.TREND_QUILL_DATA_CHANGED);

const quillActions = {
    friendsQuillDataChanged,
    trendQuillDataChanged
};

export default quillActions;
