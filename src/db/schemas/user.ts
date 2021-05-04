import { CallbackError, Schema } from "mongoose";
import { TableInheritance } from "typeorm";
import { User } from "../models/user";
import { v4 as uuidv4 } from "uuid";
import WalletRepository from "../../repos/wallet-repo-impl";

const userSchema = new Schema({
    id: {
        type: String,
        unique: true,
        default: ()=>uuidv4()
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

    suspended:  {
        type: Boolean,
        required: [true, "User suspended is required"],
        default: false
    },
}, {
    timestamps: true
});

userSchema.pre<User>("save", async(next)=>{
    // this.id = uuidv4();
    WalletRepository.addWallet(this,"NGN").then((res)=>{
        console.log("Running Pre-Save Hook for UserSchema")
        next();
    })
});

export default userSchema;
