import axios from 'axios';
import { GetQuillRequest } from '../models/getQuillRequest';
import { QuillResponse } from '../models/quillResponse';
import { AddQuillRequest } from '../models/addQuillRequest';
import { Quill } from '../models/quill';

const API_URL = 'http://localhost:8080/api/quills';


export class QuillService {
    static getAllQuills(callback: (quills: QuillResponse | null) => void): void {
        axios.get<QuillResponse>(API_URL)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching quills:', error);
                callback(null);
            });
    }

    static getFriendsQuills(userId: number, callback: (response: QuillResponse | null) => void): void {
        axios.get<QuillResponse>(`${API_URL}/friends/${userId}`)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends\' quills:', error);
                callback(null);
            });
    }

    static addNewQuill(request: AddQuillRequest, callback: (response: QuillResponse | null) => void): void {
        axios.post<QuillResponse>(API_URL, request)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends\' quills:', error);
                callback(null);
            });
    }

    static getGeneralInfoQuills(generalInfoId: number, callback: (response: Quill[] | null) => void): void {
        axios.get<Quill[]>(`${API_URL}/generalInfo/${generalInfoId}`)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends\' quills:', error);
                callback(null);
            });
    }

    static getUserQuills(userId: number, callback: (response: Quill[] | null) => void): void {
        axios.get<Quill[]>(`${API_URL}/getUserQuills/${userId}`)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching friends\' quills:', error);
                callback(null);
            });
    }
}
