import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class Address {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    street: string;

    @ManyToOne(() => City, { primary: true, cascade: true })
    city: City;
}