"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const config_1 = require("../config");
const auth_service_impl_1 = require("../services/auth-service-impl");
const jsonwebtoken_1 = require("jsonwebtoken");
const connection_1 = require("../db/connection");
const jwt_token_service_impl_1 = require("../services/jwt-token-service-impl");
const password_hash_service_impl_1 = require("../services/password-hash-service-impl");
const user_repo_impl_1 = require("../repos/user-repo-impl");
let authService;
let userRepo;
let tokenService = new jwt_token_service_impl_1.JwtTokenServiceImpl();
let passwordHashService = new password_hash_service_impl_1.PasswordHashServiceImpl();
mocha_1.describe("Tests AuthService for functionality", () => {
    mocha_1.before((done) => {
        connection_1.connect().then(() => {
            authService = new auth_service_impl_1.AuthServiceImpl();
            userRepo = new user_repo_impl_1.UserRepositoryImpl();
            done();
        });
    });
    mocha_1.beforeEach((done) => {
        console.log("IN B4 EACH");
        userRepo.deleteAll().then(() => {
            done();
        });
    });
    mocha_1.it("Should register a user and return a valid User object", (done) => {
        authService.registerUser("tom@mail.com", "genshin_impact2000", "Tom", "Olsen").then((user) => {
            chai_1.expect(user.email).to.equal("tom@mail.com");
            chai_1.expect(user.passwordHash == null).to.equal(false);
            chai_1.expect(user.firstName).to.equal("Tom");
            chai_1.expect(user.lastName).to.equal("Olsen");
            done();
        }).catch(e => done(e));
    });
    mocha_1.it("Should login a user and return a valid JWT token", async () => {
        console.log("Started next test");
        const hash = await passwordHashService.hash("genshin_impact2000");
        const user = await userRepo.saveUser({
            email: "tom@mail.com",
            passwordHash: hash
        });
        console.log("User saved");
        if (user) {
            const { authToken } = await authService.login("tom@mail.com", "genshin_impact2000");
            const decodedToken = jsonwebtoken_1.verify(authToken, config_1.default.APP_SECRET);
            const { sub = null, roles = null } = decodedToken;
            if (!sub)
                throw Error("UserId undefined");
            if (!roles)
                throw Error("UserRole undefined");
            return;
        }
        else {
            throw Error("User is null");
        }
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
//# sourceMappingURL=auth-service.spec.js.map