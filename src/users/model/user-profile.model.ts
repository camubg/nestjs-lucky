import { AddressProfile } from './address-profile.model';

export class UserProfile {
  constructor(
    public id: number,
    public name: string,
    public address: AddressProfile,
  ) {}
}
