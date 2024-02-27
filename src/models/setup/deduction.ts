export interface IDeduction {
  id: number;
  deductTitle: string;
  rate: string;
}

export type IPostDeduction = Omit<IDeduction, "id">;
