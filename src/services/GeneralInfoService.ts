import axios from 'axios';
import { GeneralInfoResponse } from '../models/generalInfoResponse';
import { RateGeneralInfoRequest } from '../models/rateGeneralInfoRequest';

const API_URL = 'http://localhost:8080/api/generalInfo';


export class GeneralInfoService {
    static getAllGeneralInfo(callback: (response: GeneralInfoResponse | null) => void): void {
        axios.get<GeneralInfoResponse>(API_URL)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages', error);
                callback(null);
            });
    }

    static rateGeneralInfo(request: RateGeneralInfoRequest, callback: (response: GeneralInfoResponse | null) => void): void {
        axios.post<GeneralInfoResponse>(`${API_URL}/rating`, request)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages', error);
                callback(null);
            });
    }
}
