import UserModel, {User} from "../db/models/user";
import { UserRepository } from "./interfaces/user-repo";
import { getRepository, Repository } from "typeorm";
import { Model } from "mongoose";
import { UserOptions } from "../entity/User";

export class UserRepositoryImpl implements UserRepository{

    private get model(): Model<any>{
        return UserModel;
    };

    constructor(){
    }
    
    async getUserByUsername(username: string): Promise<User> {
        return await this.model.findOne({username});
    }
    
    async deleteAll(): Promise<void> {
        await this.model.deleteMany({}).exec();
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.model.findOne({email});
    }
    
    async getUserById(id: string): Promise<User> {
        try{
            const user =  await this.model.findOne({id});
            console.log(`RETRIEVED: ${user}`);
            return user;
        }catch(e){
            console.log(e);
        }
    }

    deleteUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addUser(user: any): Promise<User> {
        return await new UserModel({...user}).save();
    }

    saveUser(user: Partial<User>): Promise<User> {
        return new UserModel({...user}).save();
    }
    
}

export default new UserRepositoryImpl();