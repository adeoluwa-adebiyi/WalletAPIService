import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn} from "typeorm";
import { Wallet } from "./Wallet";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

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
    dob: Date;

    @OneToMany( type => Wallet, wallet => wallet.owner)
    @JoinColumn()
    wallets: Wallet[];

}
