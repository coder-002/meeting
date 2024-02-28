export interface IMember {
  id: number;
  memberCode: string;
  introducedOn: string;
  branchId: number;
  branchCode: string;
  status: boolean;
  terminatedOn: string;
  memberType: string;
  memberName: string;
  address: string;
  contact: string;
  groupId: number;
  groupName: string;
}
export type IPostMember = {
  memberCode: string;
  introducedOn: string;
  branchId: number;
  branchCode: string;
  memberType: string;
  memberName: string;
  address: string;
  contact: string;
  homeAddress: string;
  reportingBranchId: number;
  accountNo: string;
  salutation: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dobNp: string;
  maritalStatus: string;
  pan: string;
};

export interface IOptions {
  panTypes: PanType[];
  relationTypes: RelationType[];
  contactTypes: ContactType[];
  addressTypes: AddressType[];
  salutationTypes: SalutationType[];
  maritalStatusTypes: MaritalStatusType[];
  genderTypes: GenderType[];
  religionTypes: ReligionType[];
  idTypes: IdType[];
  ethnicGroupTypes: EthnicGroupType[];
}

export interface PanType {
  id: number;
  name: string;
}

export interface RelationType {
  id: number;
  name: string;
}

export interface ContactType {
  id: number;
  name: string;
}

export interface AddressType {
  id: number;
  name: string;
}

export interface SalutationType {
  id: number;
  name: string;
}

export interface MaritalStatusType {
  id: number;
  name: string;
}

export interface GenderType {
  id: number;
  name: string;
}

export interface ReligionType {
  id: number;
  name: string;
}

export interface IdType {
  id: number;
  name: string;
}

export interface EthnicGroupType {
  id: number;
  name: string;
}
