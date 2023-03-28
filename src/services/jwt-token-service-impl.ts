import { TokenService } from "./interfaces/token-service";
import { verify, decode, DecodeOptions, sign } from "jsonwebtoken";
import config from "../config";
import { UserTokenCredentials } from "./interfaces/auth-service";

export class JwtTokenServiceImpl implements TokenService {
    encode(claims: UserTokenCredentials, expiresIn: string = "1h"): string {
        const { exp = expiresIn, sub, ...otherClaims } = claims;
        return sign({ ...otherClaims }, Buffer.from(config.APP_SECRET), { expiresIn: exp, subject: sub.toString()});
    }

    verify(jwt: string): object {
        return verify(jwt, config.APP_SECRET) as object;
    }

    decode(jwt: string): object {
        return decode(jwt, { json: true }) as object;
    }

}

export default new JwtTokenServiceImpl();