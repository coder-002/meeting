import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "./apiService";
import { api } from "./service-api";
import { IPostMeeting } from "../models/meeting";

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

export { useGetMeeting, useCreateMeeting };
