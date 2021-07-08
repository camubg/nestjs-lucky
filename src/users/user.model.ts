import { Address } from "./address.model";

export class User {
    constructor(
        public id: string, 
        public name: string, 
        public address: Address
        ) {}
}