import { useQuery } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";

const getDeduct = () => {
  return instance.get(api.deduct.get);
};

const useGetDeduct = () => {
  return useQuery([api.designation.get], getDeduct, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

export { useGetDeduct };
