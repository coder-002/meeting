export interface IBranch {
  id: number;
  orgUnitId: number;
  orgUnitName: string;
  branchName: string;
  branchCode: string;
  address: string;
  contactNumber: string;
  isActive: boolean;
}

export type IPostBranch = Omit<IBranch, "id">;
