import { useQuery } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";

const getOrganization = () => {
  return instance.get(api.organization.get);
};

const useGetOrganization = () => {
  return useQuery([api.organization.get], getOrganization, {
    select: (data) => data?.data,
    onError: (err) => console.log("Failed to fetch organization", err),
  });
};

export { useGetOrganization };
