import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { City } from "./city.entity";

@Entity()
export class Address {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    street: string;

    @OneToOne(() => City, { primary: true, cascade: true })
    city: City;
}