import { User } from "./user";

export interface LoginResponse {
    token: string;
    message: string;
    user: User;
}
