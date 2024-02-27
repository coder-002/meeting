import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";
import { IPostDesignation } from "../../models/setup/designation";

const getDesignation = () => {
  return instance.get(api.designation.get);
};

const useGetDesignation = () => {
  return useQuery([api.designation.get], getDesignation, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

const createDesignation = (designation: IPostDesignation) => {
  return instance.post(api.designation.post, designation);
};

const useCreateDesignation = () => {
  const queryClient = useQueryClient();
  return useMutation(createDesignation, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.designation.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
export { useGetDesignation, useCreateDesignation };
