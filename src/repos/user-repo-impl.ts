import { User, UserOptions } from "../entity/User";
import { UserRepository } from "./interfaces/user-repo";
import { getRepository, Repository } from "typeorm";

export class UserRepositoryImpl implements UserRepository{

    private get model(): Repository<User>{
        return getRepository(User);
    };

    constructor(){
    }

    async getUserByEmail(email: string): Promise<User> {
        return await this.model.findOne({email});
    }
    
    getUserById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

    deleteUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async addUser(user: UserOptions): Promise<User> {
        return await this.model.save({...user});
    }

    saveUser(user: User): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
}

export default new UserRepositoryImpl();