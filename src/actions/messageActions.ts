import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';
import { MessageResponse } from '../models/messageResponse';

export const messageDataChanged = createAction<[]>(actionEnum.MESSAGE_DATA_CHANGED);
export const selectedMessageChanged = createAction<MessageResponse>(actionEnum.SELECTED_MESSAGE_CHANGED);

const messageActions = {
    messageDataChanged,
    selectedMessageChanged
};

export default messageActions;
