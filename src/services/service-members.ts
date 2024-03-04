import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "./apiService";
import { api } from "./service-api";
import { IPostMember } from "../models/member/member";

interface IPagination {
  pageNumber: number;
  pageSize: number;
  searchText: string;
}

const getMember = (props: IPagination) => {
  return instance.post(api.member.getMember, props);
};

const useGetMember = () => {
  const queryClient = useQueryClient();
  return useMutation(getMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.member.getMember);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const addMember = (member: IPostMember) => {
  return instance.post(api.member.post, member);
};

// const useAddMember = () => {
//   const queryClient = useQueryClient();
//   return useMutation(addMember, {
//     onSuccess: () => {
//       // queryClient.invalidateQueries(api.member.getMember);
//       console.log("success");
//     },
//     onError: (e) => {
//       console.log(e);
//     },
//   });
// };
const useAddMember = () => {
  const queryClient = useQueryClient();
  return useMutation(addMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.member.getMember);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const getMemberById = (id: string) => () => {
  return instance.get(api.member.getById.replace("{id}", id));
};

const useGetMemberById = (id: string) => {
  return useQuery([api.member.getById, id], getMemberById(id), {
    enabled: !!id,
    select: (data) => data?.data,
  });
};

const memberInit = () => {
  return instance.get(api.member.init);
};

const useMemberInit = () => {
  return useQuery([api.member.init], memberInit, {
    onSuccess: (data) => data.data,
    onError: (error) => console.log(error),
  });
};
export { useGetMember, useAddMember, useMemberInit, useGetMemberById };
