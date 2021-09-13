"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../db/models/user");
class UserRepositoryImpl {
    get model() {
        return user_1.default;
    }
    ;
    constructor() {
    }
    async deleteAll() {
        await this.model.deleteMany({}).exec();
    }
    async getUserByEmail(email) {
        return await this.model.findOne({ email });
    }
    async getUserById(id) {
        try {
            const user = await this.model.findOne({ id });
            console.log(`RETRIEVED: ${user}`);
            return user;
        }
        catch (e) {
            console.log(e);
        }
    }
    deleteUser(user) {
        throw new Error("Method not implemented.");
    }
    async addUser(user) {
        return await new user_1.default({ ...user }).save();
    }
    saveUser(user) {
        return new user_1.default({ ...user }).save();
    }
}
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.default = new UserRepositoryImpl();
//# sourceMappingURL=user-repo-impl.js.map