import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "./apiService";
import { api } from "./service-api";
import { IParticipants, IPostMeeting } from "../models/meeting";

const getMeeting = () => {
  return instance.get(api.meeting.get);
};

const useGetMeeting = () => {
  return useQuery([api.meeting.get], getMeeting, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

const createMeeting = (meeting: IPostMeeting) => {
  return instance.post(api.meeting.post, meeting);
};

const useCreateMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation(createMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.meeting.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
const deleteMeeting = (id: string) => {
  return instance.delete(api.meeting.delete.replace("{meetingId}", id));
};

const useDeleteMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.meeting.get);
    },
    onError: (e: any) => {
      console.log(e);
    },
  });
};

const approveMeeting = (id: string) => {
  return instance.post(api.meeting.approve.replace("{meetingId}", id));
};

const useApproveMeeting = () => {
  const queryClient = useQueryClient();
  return useMutation(approveMeeting, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.meeting.get);
    },
  });
};

const getParticipants = (id: string) => {
  return instance.get(api.meeting.participants.get.replace("{meetingId}", id));
};

const useGetPartipants = (id: string) => {
  return useQuery([api.meeting.participants.get], () => getParticipants(id), {
    enabled: !!id,
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

const addParticipant = (participants: IParticipants) => {
  const { meetingId, ...rest } = participants;
  return instance.post(
    api.meeting.participants.post.replace("{meetingId}", meetingId),
    rest
  );
};

const useAddParticipant = () => {
  const queryClient = useQueryClient();
  return useMutation(addParticipant, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.meeting.participants.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const updateParticipants = (participants: IParticipants) => {
  const { meetingId, ...rest } = participants;
  return instance.put(
    api.meeting.participants.update.replace("{meetingId}", meetingId),
    rest
  );
};

const useUpdateParticipants = () => {
  const queryClient = useQueryClient();
  return useMutation(updateParticipants, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.meeting.participants.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

export interface IUpdate {
  notes: string;
}

const editNotes = ({
  meetingId,
  notes,
}: {
  meetingId: string;
  notes: IUpdate;
}) => {
  return instance.put(
    api.meeting.editNotes.replace("{meetingId}", meetingId),
    notes
  );
};

const useEditNotes = () => {
  const queryClient = useQueryClient();
  return useMutation(editNotes, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.meeting.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

export {
  useGetMeeting,
  useCreateMeeting,
  useDeleteMeeting,
  useApproveMeeting,
  useGetPartipants,
  useAddParticipant,
  useUpdateParticipants,
  useEditNotes,
};
