import axios from 'axios';
import { AddFriendRequest } from '../models/addFriendRequest';

const API_URL = 'http://localhost:8080/api/friends';

const addFriend = (request: AddFriendRequest, callback: (response: any | null) => void): void => {
    axios.post<any>(API_URL, request)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            console.error('Error adding friend.', error);
            callback(null);
        });
};

const checkFriend = (request: AddFriendRequest, callback: (response: boolean | null) => void): void => {
    axios.post<any>(API_URL, request)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            console.error('Error checking friend.', error);
            callback(null);
        });
};

export const FriendService = { addFriend, checkFriend };
