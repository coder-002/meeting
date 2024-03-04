export interface IAddress {
  profileId: number;
  addresses: Addresss[];
}

export interface Addresss {
  type: string;
  relType?: string;
  street: string;
  toleName: string;
  mnVdc: string;
  ward: number;
  districtId: number;
  country: string;
  houseNo: string;
  landlord?: string;
  landlordContact?: string;
}

export interface IContact {
  profileId: number;
  contacts: Contact[];
}

export interface Contact {
  type: string;
  relType?: string;
  value: string;
}

export interface IOffice {
  profileId: number;
  offices: Office[];
}

export interface Office {
  orgType: string;
  orgName: string;
  orgAddress: string;
  orgContact: string;
  designation: string;
  joinedOn: string;
}

export interface IIdentification {
  profileId: number;
  ids: Id[];
}

export interface Id {
  relType?: string;
  type: string;
  idNumber: string;
  issuerCountry: string;
  issuerAuthority: string;
  issuedPlace: string;
  issueDate: string;
  expiryDate: string;
}

export interface IRelation {
  profileId: number;
  relations: Relation[];
}

export interface Relation {
  type: string;
  salutation: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  dobNp: string;
}
