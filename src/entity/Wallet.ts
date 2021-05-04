import { type } from "os";
import {BaseEntity, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Currency } from "./Currency";
import { User } from "./User";

export interface WalletOptions{
    id?: number;

    owner: User;

    balance?: number;
    
    currency: Currency;

}

@Entity()
export class Wallet extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne( type => User, user => user.wallets)
    owner: User;

    @Column({
        type: "numeric",
        default: 0.0,
        nullable: false
    })
    balance?: number;

    @ManyToOne(type => Currency)
    currency: Currency;


}
