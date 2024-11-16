import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';
import { GetNotificationResponse } from '../models/getNotificationResponse';

export const notificationDataChanged = createAction<GetNotificationResponse[]>(actionEnum.NOTIFICATION_DATA_CHANGED);

const notificationActions = {
    notificationDataChanged,
};

export default notificationActions;
