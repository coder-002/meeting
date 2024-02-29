import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import instance from "../apiService";
import { api } from "../service-api";
import { IPostCommittee } from "../../models/setup/committee";

const getCommittee = () => {
  return instance.get(api.committee.get);
};

const useGetCommittee = () => {
  return useQuery([api.committee.get], getCommittee, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

const createCommittee = (committee: IPostCommittee) => {
  return instance.post(api.committee.post, committee);
};

const useCreateCommittee = () => {
  const queryClient = useQueryClient();
  return useMutation(createCommittee, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.committee.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const deleteCommittee = (id: string) => {
  return instance.delete(api.committee.delete.replace("{id}", id));
};

const useDeleteCommittee = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCommittee, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.committee.get);
    },
    onError: (err: any) => {
      console.log(err);
    },
  });
};

export { useGetCommittee, useCreateCommittee, useDeleteCommittee };
