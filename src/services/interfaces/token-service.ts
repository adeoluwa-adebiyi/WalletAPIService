import { UserTokenCredentials } from "./auth-service";

export interface TokenService{
    verify(jwt: string): object;
    decode(jwt: string): object;
    encode(claims: UserTokenCredentials, expiresIn?:string): string;
}