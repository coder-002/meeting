export interface ICommittee {
  id: number;
  unitId: number;
  branchId: number;
  committeeCode: string;
  committeeName: string;
  description: string;
  isActive: boolean;
  branchName: string;
  unitName: string;
}

export type IPostCommittee = Omit<ICommittee, "id">;

export interface ICommitteeMember {
  id: number;
  committeeId: number;
  designationId: number;
  memberId: number;
  startDate: string;
  endDate: string;
  committee: string;
  designation: string;
}

export type IPostCommitteeMember = Omit<
  ICommitteeMember,
  "id" | "committee" | "designation"
>;

export interface IAllowance {
  id: number;
  memberId: number;
  committeeId: number;
  meetingId: number;
  allowanceName: string;
  amount: number;
  rate: number;
}
export type IPostAllowance = Omit<ICommitteeMember, "id">;
