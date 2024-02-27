export interface IDesignation {
  id: number;
  designationCode: string;
  designationName: string;
  isActive: boolean;
}

export type IPostDesignation = Omit<IDesignation, "id">;
