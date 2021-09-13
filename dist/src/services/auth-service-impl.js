"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repo_impl_1 = require("../repos/user-repo-impl");
const jwt_token_service_impl_1 = require("./jwt-token-service-impl");
const password_hash_service_impl_1 = require("./password-hash-service-impl");
class AuthServiceImpl {
    constructor(userRepo = new user_repo_impl_1.UserRepositoryImpl(), tokenService = new jwt_token_service_impl_1.JwtTokenServiceImpl(), passwordHashService = new password_hash_service_impl_1.PasswordHashServiceImpl()) {
        this.userRepo = userRepo;
        this.tokenService = tokenService;
        this.passwordHashService = passwordHashService;
    }
    async registerUser(email, password, firstname, lastname) {
        const user = await this.userRepo.addUser({
            email,
            passwordHash: await this.passwordHashService.hash(password),
            firstName: firstname,
            lastName: lastname,
        });
        if (!user)
            throw Error("User registration failed");
        return user;
    }
    async login(email, password) {
        const user = await this.userRepo.getUserByEmail(email);
        if (!user)
            throw Error("Login failed due to incorrect credentials. Please try again");
        const pwdMatchesHash = await this.passwordHashService.compare(password, user.passwordHash);
        if (pwdMatchesHash) {
            return {
                authToken: await this.tokenService.encode({ sub: user.id, exp: 2 * 24 * 60 * 60, roles: [] })
            };
        }
        throw Error("Login failed due to incorrect credentials. Please try again");
    }
    signout(userId) {
        throw new Error("Method not implemented.");
    }
}
exports.AuthServiceImpl = AuthServiceImpl;
exports.default = new AuthServiceImpl();
//# sourceMappingURL=auth-service-impl.js.map