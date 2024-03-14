export interface IAllowance {
  id: number;
  committeeId: number;
  designationId: number;
  allowanceName: string;
  amount: number;
  rate: number;
}

export type IPostAllowance = Omit<IAllowance, "id">;
