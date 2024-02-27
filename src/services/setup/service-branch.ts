import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";
import { IPostBranch } from "../../models/setup/branch";

const getBranch = () => {
  return instance.get(api.branch.get);
};

const useGetBranch = () => {
  return useQuery([api.branch.get], getBranch, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

const createBranch = (branch: IPostBranch) => {
  return instance.post(api.branch.post, branch);
};

const useCreateBranch = () => {
  const queryClient = useQueryClient();
  return useMutation(createBranch, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.branch.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

export { useGetBranch, useCreateBranch };
