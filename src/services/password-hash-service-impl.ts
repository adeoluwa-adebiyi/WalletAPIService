import { DataHashService } from "./interfaces/data-hash-service";
import * as bcrypt from "bcrypt";

export class PasswordHashServiceImpl implements DataHashService{

    private saltRounds: number = 10;

    async compare(data: any, hash: string): Promise<boolean> {
        return bcrypt.compare(data, hash);
    }
    
    async hash(data: any): Promise<string> {
        return bcrypt.hash(data, this.saltRounds) as Promise<string>;
    }

}