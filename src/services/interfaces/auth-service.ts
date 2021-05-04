import { User } from "../../db/models/user";

export interface LoginResponse{
   authToken: string;
}

export interface LoginResponse{
    token: string;
}

export interface UserTokenCredentials{
    sub: string;
    roles: Array<string>;
    exp: number;
}

export interface AuthService{
    registerUser(email:string, password:string, username?:string, firstname?: string, lastname?:string): Promise<User>;
    login(email:string, password:string):Promise<LoginResponse>;
    signout(userId: number): Promise<void>;
}