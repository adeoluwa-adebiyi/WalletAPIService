import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

export enum CurrencySymbols{
    NGN="NGN",
    USD="USD"
}

@Entity()
export class Currency {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type:"enum",
        enum: CurrencySymbols,
        nullable: false
    })
    symbol: string;

    @Column({
        nullable: true
    })
    description: string;
}
