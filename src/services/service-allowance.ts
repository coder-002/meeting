import { useQuery } from "react-query";
import instance from "./apiService";
import { api } from "./service-api";

const getDefaultAllowance = () => {
  return instance.get(api.allowance.getDefaultAllowance);
};

const useGetDefaultAllowance = () => {
  return useQuery([api.allowance.getDefaultAllowance], getDefaultAllowance, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

export { useGetDefaultAllowance };
