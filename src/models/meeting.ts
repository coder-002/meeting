export interface IMeeting {
  id: number;
  branchId: number;
  unitId: number;
  meetingCode: string;
  topic: string;
  description: string;
  committeeId: number;
  notes: string;
}

export type IPostMeeting = Omit<IMeeting, "id">;
