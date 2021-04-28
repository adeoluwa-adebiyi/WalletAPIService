import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn} from "typeorm";
import { Wallet } from "./Wallet";

export interface UserOptions{

    id?: number;

    firstName: string;

    email: string;

    passwordHash: string;

    lastName: string;

    dob?: Date;

    wallets?: Wallet[];

    verified?: boolean;

    suspended?: boolean;

    createdAt?: Date;

    updatedAt?: Date;

}

@Entity()
export class User extends BaseEntity implements UserOptions{

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        nullable:true
    })
    firstName: string;

    @Column({
        nullable:false,
        unique:true
    })
    email: string;

    @Column({
        nullable: false
    })
    passwordHash: string;

    @Column({
        nullable:true
    })
    lastName: string;

    @Column({
        nullable:true
    })
    dob?: Date;

    @OneToMany( type => Wallet, wallet => wallet.owner)
    @JoinColumn()
    wallets?: Wallet[];

    @Column({
        type: "boolean",
        default: false
    })
    verified?: boolean;

    @Column({
        type: "boolean",
        default: false
    })
    suspended?: boolean;

    @Column({
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP"
    })
    createdAt?: Date;

    @Column({
        type: "timestamp with time zone",
        default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt?: Date;

}
