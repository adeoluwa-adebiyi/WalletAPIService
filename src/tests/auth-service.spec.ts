import { before, describe, it, beforeEach } from "mocha";
import { expect } from "chai";
import config from "../config";
import { User } from "../entity/User";
import { AuthServiceImpl } from "../services/auth-service-impl";
import { AuthService, LoginResponse, UserTokenCredentials } from "../services/interfaces/auth-service";
import { verify } from "jsonwebtoken";
import { connect } from "../db/connection";
import { getRepository, Repository } from "typeorm";
import { UserRepository } from "../repos/interfaces/user-repo";
import { TokenService } from "../services/interfaces/token-service";
import { JwtTokenServiceImpl } from "../services/jwt-token-service-impl";
import { DataHashService } from "../services/interfaces/data-hash-service";
import { PasswordHashServiceImpl } from "../services/password-hash-service-impl";


let authService: AuthService;
let userRepo: Repository<User>;
let tokenService: TokenService = new JwtTokenServiceImpl();
let passwordHashService: DataHashService = new PasswordHashServiceImpl();

describe("Tests AuthService for functionality", () => {

    before((done) => {
        connect().then(() => {
            authService = new AuthServiceImpl();
            userRepo = getRepository(User);
            done();
        });
    });

    beforeEach((done) => {
        userRepo.delete({}).then(() => {
            done();
        });
    });

    it("Should register a user and return a valid User object", (done) => {
        authService.registerUser("tom@mail.com", "genshin_impact2000", "Tom", "Olsen").then((user: User) => {
            expect(user.email).to.equal("tom@mail.com");
            expect(user.passwordHash == null).to.equal(false);
            expect(user.firstName).to.equal("Tom");
            expect(user.lastName).to.equal("Olsen");
            done();
        }).catch(e => done(e));
    });

    it("Should login a user and return a valid JWT token", (done) => {
        passwordHashService.hash("genshin_impact2000").then((hash) => {

            userRepo.save({
                email: "tom@mail.com",
                passwordHash: hash
            }).then((user: User) => {
                authService.login("tom@mail.com", "genshin_impact2000").then((response: LoginResponse) => {
                    const { authToken } = response;
                    const decodedToken = verify(authToken, config.APP_SECRET);
                    const { sub = null, roles = null } = decodedToken as UserTokenCredentials;
                    if (!sub)
                        throw Error("UserId undefined");
                    if (!roles)
                        throw Error("UserRole undefined");
                    done();
                }).catch(e => done(e));
            });

        });
    });

    // it("Should register a user and return a valid User object", (done)=>{
    //     authService.registerUser("tom@mail.com", "genshin_impact2000", "gi_tom", "Tom", "Olsen").then((user: User)=>{
    //         expect(user.email).to.equal("tom@mail.com");
    //         expect(user.passwordHash==null).to.be(false);
    //         expect(user.firstName).to.equal("Tom");
    //         expect(user.lastName).to.equal("Olsen");
    //         done();
    //     }).catch(e=>done(e));
    // });

});