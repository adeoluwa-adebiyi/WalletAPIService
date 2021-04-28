import { Repository } from "./repo";
import { User, UserOptions } from "../../entity/User";

export interface UserRepository extends Repository<User>{
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    deleteUser(user: User): Promise<void>;
    addUser(user: UserOptions): Promise<User>;
    saveUser(user: User):Promise<User>;
}