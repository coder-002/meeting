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

export interface IParticipants {
  id: number;
  meetingId: string;
  memberId: number;
  attended: boolean;
}

export type IPostParticipants = Omit<IParticipants, "id" | "meetingId">;
