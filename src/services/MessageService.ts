import axios from 'axios';
import { MessageResponse } from '../models/messageResponse';
import { AddQuillRequest } from '../models/addQuillRequest';
import { SendMessageRequest } from '../models/sendMessageRequest';
import { MarkMessagesAsReadRequest } from '../models/markMessageAsReadRequest';

const API_URL = 'http://localhost:8080/api/messages';


export class MessageService {
    static getAllMessage(userId: number, callback: (response: [] | null) => void): void {
        axios.get<[]>(`${API_URL}/history/${userId}`)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages', error);
                callback(null);
            });
    }

    static sendMessage(request: SendMessageRequest, callback: (response: MessageResponse | null) => void): void {
        axios.post<MessageResponse>(API_URL, request)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
                callback(null);
            });
    }
}
