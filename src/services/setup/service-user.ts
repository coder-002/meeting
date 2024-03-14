import { useQuery } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";

const getUser = () => {
  return instance.get(api.user.get);
};

const useGetUser = () => {
  return useQuery([api.user.get], getUser, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

export { useGetUser };
