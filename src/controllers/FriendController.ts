import { toast } from 'react-toastify';
import { FriendService } from '../services/FriendService';
import { AddFriendRequest } from '../models/addFriendRequest';
import uiConstantsTR from '../constants/uiConstantsTR';

const addFriend = (addFriendRequest: AddFriendRequest): Promise<any> => {
    return new Promise((resolve, reject) => {
        FriendService.addFriend(addFriendRequest, (response) => {
            if (response) {
                toast.success(uiConstantsTR.USER_MESSAGES.ADD_FRIEND_SUCCESSFUL_MESSAGE);
                resolve(response);
            } else {
                toast.error(uiConstantsTR.USER_MESSAGES.ERROR_MESSAGE);
                reject('No response from the server.');
            }
        });
    });
};

const checkFriend = (checkFriendRequest: AddFriendRequest, callback: (response: boolean | null) => void) => {
    FriendService.checkFriend(checkFriendRequest, (response) => {
        if (response) {
            callback(response);
        } else {
            callback(null);
        }
    });
};

export const FriendController = { addFriend, checkFriend };