import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "./apiService";
import { api } from "./service-api";
import { IAllowance, IPostAllowance } from "../models/allowance";

const getDefaultAllowance = () => {
  return instance.get(api.allowance.getDefaultAllowance);
};

const useGetDefaultAllowance = () => {
  return useQuery([api.allowance.getDefaultAllowance], getDefaultAllowance, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

const postDefaultAllowance = (allowance: IPostAllowance) => {
  return instance.post(api.allowance.postDefaultAllowance, allowance);
};

const usePostDefaultAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation(postDefaultAllowance, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.allowance.getDefaultAllowance);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

const updateDefaultAllowance = (update: IAllowance) => {
  return instance.put(
    api.allowance.updateDefaultAllowance.replace("{id}", update.id.toString()),
    update
  );
};

const useUpdateDefaultAllowance = () => {
  const queryClient = useQueryClient();
  return useMutation(updateDefaultAllowance, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.allowance.getDefaultAllowance);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

export {
  useGetDefaultAllowance,
  usePostDefaultAllowance,
  useUpdateDefaultAllowance,
};
