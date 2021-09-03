import { FilterQuery, Schema } from "mongoose";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import WalletRepository from "../../repos/wallet-repo-impl";
import UserModel from "../models/user";
import WalletModel from "../models/wallet";
import walletServiceImpl from "../../services/wallet-service-impl";

const userSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: () => uuidv4()
    },

    firstName: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true
    },
    passwordHash: {
        type: String,
        required: [true, "User passwordHash is required"]
    },

    lastName: {
        type: String,
        required: false
    },

    dob: {
        type: Schema.Types.Date,
        required: false
    },

    verified: {
        type: Boolean,
        required: [true, "User verified is required"],
        default: false
    },

    suspended: {
        type: Boolean,
        required: [true, "User suspended is required"],
        default: false
    },
}, {
    timestamps: true
});

userSchema.pre("deleteMany",{document: false, query: true}, async function (next) { 
    const docs = await UserModel.find(this.getFilter() as FilterQuery<User>); 
    const users = docs.map((item) => item.id); 
    await WalletModel.deleteMany({ owner: { $in: users } }); next(null); 
    // await WalletRepository.deleteWalletByUser(this as User);
});

userSchema.post<User>("save", async (user: User, next) => {
    console.log("Running post-save hook");
    const wallet = await WalletRepository.addWallet(user, "NGN");
    await walletServiceImpl.notifyOnWalletCreation(wallet.id, wallet.owner, wallet.currency);
    wallet && next();
});

export default userSchema;
