import { UserService } from '../services/UserService';
import { RegisterRequest } from '../models/registerRequest';
import { LoginRequest } from '../models/loginRequest';
import { LoginResponse } from '../models/loginResponse';
import { toast } from 'react-toastify';
import uiConstantsTR from '../constants/uiConstantsTR';
import userActions from '../actions/userActions';
import { User } from '../models/user';
import { UpdateProfileRequest } from '../models/updateProfileRequest';

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

    static login(loginRequest: LoginRequest, dispatch: React.Dispatch<any>): Promise<LoginResponse> {
        return new Promise((resolve, reject) => {
            UserService.login(loginRequest, (response) => {
                if (response) {
                    toast.success(uiConstantsTR.USER_MESSAGES.LOGIN_SUCCESSFUL_MESSAGE);
                    const { token, user } = response;
                    localStorage.setItem('token', token);
                    dispatch(userActions.userInfoChanged(user));
                    dispatch(userActions.isAuthenticated(true));
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

    static getUserById(userId: number, callback: (response: User | null) => void) {
        UserService.getUserById(userId, (response) => {
            if (response) {
                callback(response);
            } else {
                callback(null);
            }
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

    static updateUser(updateRequest: UpdateProfileRequest, dispatch: React.Dispatch<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            UserService.updateUser(updateRequest, (response) => {
                if (response) {
                    toast.success(uiConstantsTR.USER_MESSAGES.UPDATE_SUCCESSFUL_MESSAGE);
                    dispatch(userActions.userInfoChanged(response));
                    resolve(response);
                } else {
                    console.error('Failed to delete user.');
                    reject('Failed to delete user');
                }
            });
        });
    }

    static logout(dispatch: React.Dispatch<any>): void {
        localStorage.removeItem('token');
        dispatch(userActions.userInfoChanged({
            id: 0,
            username: '',
            email: '',
            password: '',
            creationDate: '',
            updateDate: ''
        }));

        dispatch(userActions.isAuthenticated(false));
        
        toast.success(uiConstantsTR.USER_MESSAGES.LOGOUT_SUCCESSFUL_MESSAGE);
    }

}
