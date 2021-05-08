import { Repository } from "./repo";
import UserModel,{ User } from "../../db/models/user";
import { Model } from "mongoose";
// import { UserOptions } from "../../entity/User";

export interface UserRepository extends Repository<Model<any>>{
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    deleteUser(user: User): Promise<void>;
    deleteAll(): Promise<void>;
    addUser(user: Partial<User>): Promise<User>;
    saveUser(user: Partial<User>):Promise<User>;
}