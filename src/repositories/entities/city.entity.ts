import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Country } from "./country.entity";

@Entity()
export class City {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Country, {primary: false, eager: true})
    country: Country;
}