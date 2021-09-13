import { AuthService, LoginResponse } from "./interfaces/auth-service";
import { User } from "../db/models/user";
import { UserRepository } from "../repos/interfaces/user-repo";
import { UserRepositoryImpl } from "../repos/user-repo-impl";
import { TokenService } from "./interfaces/token-service";
import { JwtTokenServiceImpl } from "./jwt-token-service-impl";
import { DataHashService } from "./interfaces/data-hash-service";
import { PasswordHashServiceImpl } from "./password-hash-service-impl";


export class AuthServiceImpl implements AuthService{

    constructor(
        private userRepo: UserRepository = new UserRepositoryImpl(),
        private tokenService: TokenService = new JwtTokenServiceImpl(),
        private passwordHashService: DataHashService = new PasswordHashServiceImpl()
    ){}
    
    async registerUser(email: string, password: string, username: string, firstname?: string, lastname?: string):Promise<User> {
            const user: User = await this.userRepo.addUser({
                email,
                passwordHash: await this.passwordHashService.hash(password),
                username,
                firstName: firstname,
                lastName: lastname,
            });
            if(!user)
                throw Error("User registration failed");
            return user;
    }

    async login(email: string, password: string): Promise<LoginResponse> {
        const user: User = await this.userRepo.getUserByEmail(email);
        if(!user)
            throw Error("Login failed due to incorrect credentials. Please try again");
        const pwdMatchesHash = await this.passwordHashService.compare(password,user.passwordHash)
        if(pwdMatchesHash){
            return <LoginResponse>{
                authToken: await this.tokenService.encode({sub: user.id, exp: 2 * 24 * 60 * 60, roles:[]})
            }
        }
        throw Error("Login failed due to incorrect credentials. Please try again");
    }

    signout(userId: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export default new AuthServiceImpl();