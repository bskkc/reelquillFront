import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';

export const songDataChanged = createAction<any[]>(actionEnum.SONG_DATA_CHANGED);

const songActions = {
    songDataChanged,
};

export default songActions;
