import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "./apiService";
import { api } from "./service-api";
import { IMeeting, IPostMeeting } from "../models/meeting";

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

export { useGetMeeting, useCreateMeeting, useDeleteMeeting, useApproveMeeting };
