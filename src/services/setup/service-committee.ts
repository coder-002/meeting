import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";
import {
  IPostCommittee,
  IPostCommitteeMember,
} from "../../models/setup/committee";

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

const getCommitteeMember = (id: string) => {
  return instance.get(
    api.committee.member.getMember.replace("{committeeId}", id)
  );
};

const useGetCommitteeMember = (id: string) => {
  return useQuery(
    [api.committee.member.getMember],
    () => getCommitteeMember(id),
    {
      enabled: !!id,
      select: (data) => data.data,
      onError: (error) => console.log(error),
    }
  );
};

const addCommitteeMember = (committeeMember: IPostCommitteeMember) => {
  return instance.post(api.committee.member.postMember, committeeMember);
};

const useAddCommitteeMember = () => {
  const queryClient = useQueryClient();
  return useMutation(addCommitteeMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.committee.member.getMember);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const deleteCommitteMember = (id: string) => {
  return instance.delete(api.committee.member.deleteMember.replace("{id}", id));
};

const useDeleteCommitteeMember = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteCommitteMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.committee.member.getMember);
    },
    onError: (e: any) => {
      console.log(e);
    },
  });
};
export {
  useGetCommittee,
  useCreateCommittee,
  useGetCommitteeMember,
  useAddCommitteeMember,
  useDeleteCommitteeMember,
};
