import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";
import { IDeduction, IPostDeduction } from "../../models/setup/deduction";

const getDeduct = () => {
  return instance.get(api.deduct.get);
};

const useGetDeduct = () => {
  return useQuery([api.designation.get], getDeduct, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};
const createDeduction = (deduct: IPostDeduction) => {
  return instance.post(api.deduct.post, deduct);
};

const useCreateDeduction = () => {
  const queryClient = useQueryClient();
  return useMutation(createDeduction, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.deduct.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};

export { useGetDeduct, useCreateDeduction };
