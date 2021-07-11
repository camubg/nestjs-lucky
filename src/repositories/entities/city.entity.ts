import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Country } from "./country.entity";

@Entity()
export class City {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(() => Country, { primary: true, cascade: true })
    country: Country;
}