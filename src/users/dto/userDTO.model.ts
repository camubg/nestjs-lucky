import { AddressDTO } from "./addressDTO.model";


export class UserDTO {
    constructor(
        public id: string, 
        public name: string, 
        public address: AddressDTO
        ) {}
}