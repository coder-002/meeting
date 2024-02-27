export interface IUnit {
  id: number;
  unitName: string;
  registrationDate: string;
  address: string;
  isActive: boolean;
}

export type IPostUnit = Omit<IUnit, "id">;
