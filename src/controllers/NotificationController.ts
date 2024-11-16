import { toast } from 'react-toastify';
import { NotificationService } from '../services/NotificationService';
import { GetNotificationResponse } from '../models/getNotificationResponse';
import notificationActions from '../actions/notificationActions';

const getAllNotification = (userId: number, dispatch: React.Dispatch<any>): Promise<GetNotificationResponse[]> => {
    return new Promise((resolve, reject) => {
        NotificationService.getAllNotification(userId, (response) => {
            if (response) {
                dispatch(notificationActions.notificationDataChanged(response));
                resolve(response);
            } else {
                toast.error('Failed to fetch notifications.');
            }
        });
    });
};

export const NotificationController = { getAllNotification };