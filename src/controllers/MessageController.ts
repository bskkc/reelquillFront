import { toast } from 'react-toastify';
import uiConstantsTR from '../constants/uiConstantsTR';
import uiActions from '../actions/uiActions';
import { MessageService } from '../services/MessageService';
import { MessageResponse } from '../models/messageResponse';
import { SendMessageRequest } from '../models/sendMessageRequest';
import messageActions from '../actions/messageActions';

export class MessageController {
    static getAllMessage(userId: number, dispatch: React.Dispatch<any>): Promise<[]> {
        return new Promise((resolve, reject) => {
            MessageService.getAllMessage(userId, (response) => {
                if (response) {
                    dispatch(messageActions.messageDataChanged(response))
                    resolve(response);
                } else {
                    toast.error('Failed to fetch quills.');
                    reject('No response from the server.');
                }
            });
        });
    }

    static sendMessage(sendMessageRequest: SendMessageRequest, dispatch: React.Dispatch<any>): Promise<MessageResponse> {
        return new Promise((resolve, reject) => {
            MessageService.sendMessage(sendMessageRequest, (response) => {
                if (response) {
                    resolve(response);
                } else {
                    reject('No response from the server.');
                }
            });
        });
    }
}
