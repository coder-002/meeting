import { useQuery } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";

const getDesignation = () => {
  return instance.get(api.designation.get);
};

const useGetDesignation = () => {
  return useQuery([api.designation.get], getDesignation, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

export { useGetDesignation };
