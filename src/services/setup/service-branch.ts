import { useQuery } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";

const getBranch = () => {
  return instance.get(api.branch.get);
};

const useGetBranch = () => {
  return useQuery([api.branch.get], getBranch, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

export { useGetBranch };
