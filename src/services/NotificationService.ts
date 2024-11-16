import axios from 'axios';
import { GetNotificationResponse } from '../models/getNotificationResponse';

const API_URL = 'http://localhost:8080/api/notifications';


export class NotificationService {
    static getAllNotification(userId: number, callback: (response: GetNotificationResponse[] | null) => void): void {
        axios.get<GetNotificationResponse[]>(`${API_URL}/user/${userId}`)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching notifications.', error);
                callback(null);
            });
    }
}
