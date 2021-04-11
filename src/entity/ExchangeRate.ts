import {Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique} from "typeorm";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { Currency } from "./Currency";

@Entity()
@Unique(["from", "to"])
export class ExchangeRate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    from: number;

    @Column()
    to: number;

}
