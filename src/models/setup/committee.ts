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
