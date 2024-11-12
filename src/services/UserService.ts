import axios from 'axios';
import { RegisterRequest } from '../models/registerRequest';
import { LoginRequest } from '../models/loginRequest';
import { LoginResponse } from '../models/loginResponse';
import { UpdateProfileRequest } from '../models/updateProfileRequest';
import { User } from '../models/user';

const API_URL = 'http://localhost:8080/api/users';

export class UserService {
    static createUser(user: RegisterRequest, callback: (response: RegisterRequest | null) => void): void {
        axios.post<RegisterRequest>(API_URL, user)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
                callback(null);
            });
    }

    static getAllUsers(callback: (users: RegisterRequest[] | null) => void): void {
        axios.get<RegisterRequest[]>(API_URL)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
                callback(null);
            });
    }

    static getUserById(id: number, callback: (user: User | null) => void): void {
        axios.get<User>(`${API_URL}/${id}`)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                console.error('Error fetching user:', error);
                callback(null);
            });
    }

    static deleteUser(id: number, callback: (success: boolean) => void): void {
        axios.delete(`${API_URL}/${id}`)
            .then(() => {
                callback(true);
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                callback(false);
            });
    }

    static login(loginRequest: LoginRequest, callback: (response: LoginResponse | null) => void) {
        axios.post<LoginResponse>(`${API_URL}/login`, loginRequest)
            .then(response => {
                const loginResponse = response.data;
                callback(loginResponse);
            })
            .catch(error => {
                console.error('Error logging in user:', error);
                callback(null);
            });
    }

    static updateUser(updateRequest: UpdateProfileRequest, callback: (response: User | null) => void) {
        axios.post<User>(`${API_URL}/update`, updateRequest)
            .then(response => {
                const updateResponse = response.data;
                callback(updateResponse);
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
                callback(null);
            });
    }    
}
