import { Document, model } from "mongoose";
import userSchema from "../schemas/user";

export interface User extends Document<any>{
    id?: string;

    firstName?: string;

    email: string;

    username: String;

    passwordHash: string;

    lastName?: string;

    dob?: Date;

    verified?: Boolean

    suspended?:  Boolean;
}

export default model<User>("user", userSchema);