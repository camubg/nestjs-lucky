import { Address } from "./address.model";

export class Profile {
    constructor(
        public id: string, 
        public name: string, 
        public address: Address
        ) {}
}