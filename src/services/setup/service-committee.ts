import { useQuery } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";

const getCommittee = () => {
  return instance.get(api.committee.get);
};

const useGetCommittee = () => {
  return useQuery([api.committee.get], getCommittee, {
    select: (data) => data.data,
    onError: (error) => console.log(error),
  });
};

export { useGetCommittee };
