import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';

export const addQuillModalStatusChanged = createAction<boolean>(actionEnum.ADD_QUILL_MODAL_STATUS_CHANGED);
export const messageDrawerStatusChanged = createAction<boolean>(actionEnum.MESSAGE_DRAWER_STATUS_CHANGED);
export const messageDetailDrawerStatusChanged = createAction<boolean>(actionEnum.MESSAGE_DETAIL_DRAWER_STATUS_CHANGED);
export const notificationDrawerStatusChanged = createAction<boolean>(actionEnum.NOTIFICATION_DRAWER_STATUS_CHANGED);
export const mainContentStatusChanged = createAction<boolean>(actionEnum.MAIN_CONTENT_STATUS_CHANGED);
export const themeChanged = createAction<string>(actionEnum.THEME_CHANGED);

const uiActions = {
    addQuillModalStatusChanged,
    messageDrawerStatusChanged,
    messageDetailDrawerStatusChanged,
    notificationDrawerStatusChanged,
    mainContentStatusChanged,
    themeChanged
};

export default uiActions;
