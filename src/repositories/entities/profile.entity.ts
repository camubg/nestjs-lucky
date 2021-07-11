import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./address.entity";
import { User } from "./user.entity";

@Entity()
export class Profile {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToOne(() => User, { primary: true, cascade: true })
    user: User;

    @OneToOne(() => Address, { primary: true, cascade: true })
    address: Address;

}