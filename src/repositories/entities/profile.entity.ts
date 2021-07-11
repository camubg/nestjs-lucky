import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { User } from "./user.entity";

@Entity()
export class Profile {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToOne(() => User, { primary: false, eager: true })
    @JoinColumn()
    user: User;

    @OneToOne(() => Address, { primary: false, eager: true })
    @JoinColumn()
    address: Address;

}