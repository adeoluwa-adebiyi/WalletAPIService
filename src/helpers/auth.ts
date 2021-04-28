import { USER_DOES_NOT_EXIST_ERROR } from "../common/errors";
import { APP_SECRET } from "../config";
import { verify, decode } from "jsonwebtoken";

const authorize = (jwt:string) => {
    const valid = 
    if(!auth){
        throw Error(USER_DOES_NOT_EXIST_ERROR);
    }
    return auth.user
}

const extractJwtToken = (authHeader: string) => {
    return authHeader.split(" ")[1].trim();
}