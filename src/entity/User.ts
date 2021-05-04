import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, AfterInsert, EventSubscriber, EntitySubscriberInterface, InsertEvent } from "typeorm";
import { Wallet } from "./Wallet";
import WalletService from "../services/wallet-service-impl";

export interface UserOptions {

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
export class User extends BaseEntity implements UserOptions {

    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        nullable: true
    })
    firstName: string;

    @Column({
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        nullable: false
    })
    passwordHash: string;

    @Column({
        nullable: true
    })
    lastName: string;

    @Column({
        nullable: true
    })
    dob?: Date;

    @OneToMany(type => Wallet, wallet => wallet.owner)
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


@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {


    /**
     * Indicates that this subscriber only listen to User events.
     */
    listenTo() {
        return User;
    }

    /**
     * Called before user insertion.
     */
    // async afterInsert(event: InsertEvent<User>): Promise<void> {
    //     console.log(event.entity.id);
    //     await WalletService.createUserWallet(event.entity.id);
    // }

}
