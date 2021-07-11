import { Address } from "./address.model";

export class Profile {
    constructor(
        public id: number, 
        public name: string, 
        public address: Address
        ) {}
}