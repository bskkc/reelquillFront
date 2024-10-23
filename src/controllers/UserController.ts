import { UserService } from '../services/UserService';
import { RegisterRequest } from '../models/registerRequest';
import { LoginRequest } from '../models/loginRequest';
import { LoginResponse } from '../models/loginResponse';
import { toast } from 'react-toastify';
import uiConstantsTR from '../constants/uiConstantsTR';

export class UserController {

    static createUser(user: RegisterRequest): Promise<any> {
        return new Promise((resolve, reject) => {
            UserService.createUser(user, (response) => {
                if (response) {
                    toast.success(uiConstantsTR.USER_MESSAGES.REGISTER_SUCCESSFUL_MESSAGE); 
                    resolve(response);
                } else {
                    toast.error(uiConstantsTR.USER_MESSAGES.REGISTER_ERROR_MESSAGE); 
                    reject('Failed to create user');
                }
            });
        });
    }

    static login(loginRequest: LoginRequest): Promise<LoginResponse> {
        return new Promise((resolve, reject) => {
            UserService.login(loginRequest, (response) => {
                if (response) {
                    toast.success(uiConstantsTR.USER_MESSAGES.LOGIN_SUCCESSFUL_MESSAGE); 
                    const { token } = response;
                    localStorage.setItem('token', token);
                    resolve(response);
                } else {
                    toast.error(uiConstantsTR.USER_MESSAGES.LOGIN_ERROR_MESSAGE); 
                    reject('Login failed');
                }
            });
        });
    }

    static fetchAllUsers(): Promise<any> {
        return new Promise((resolve, reject) => {
            UserService.getAllUsers((users) => {
                if (users) {
                    console.log('Fetched users:', users);
                    resolve(users);
                } else {
                    console.error('Failed to fetch users.');
                    reject('Failed to fetch users');
                }
            });
        });
    }

    static fetchUserById(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            UserService.getUserById(id, (user) => {
                if (user) {
                    console.log('Fetched user:', user);
                    resolve(user);
                } else {
                    console.error('Failed to fetch user.');
                    reject('Failed to fetch user');
                }
            });
        });
    }

    static deleteUser(id: number): Promise<any> {
        return new Promise((resolve, reject) => {
            UserService.deleteUser(id, (success) => {
                if (success) {
                    console.log('User deleted successfully!');
                    resolve('User deleted successfully');
                } else {
                    console.error('Failed to delete user.');
                    reject('Failed to delete user');
                }
            });
        });
    }
}
