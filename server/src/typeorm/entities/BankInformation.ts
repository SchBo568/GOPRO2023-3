
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tool } from "./Tool";

@Entity( {name:'BankInformation'})
export class BankInformation {

    @PrimaryGeneratedColumn()
    PK_bank_id: number;

    @Column()
    name: string;

    @Column()
    Iban: string;
}