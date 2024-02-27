import { useMutation, useQuery, useQueryClient } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";
import { IPostUnit } from "../../models/setup/unit";

const getUnits = () => {
  return instance.get(api.unit.get);
};

const useGetUnits = () => {
  return useQuery([api.unit.get], getUnits, {
    select: (data) => data?.data,
    onError: (error) => console.log(error),
  });
};

const createUnit = (unit: IPostUnit) => {
  return instance.post(api.unit.post, unit);
};

const useCreateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation(createUnit, {
    onSuccess: () => {
      queryClient.invalidateQueries(api.unit.get);
    },
    onError: (e) => {
      console.log(e);
    },
  });
};
export { useGetUnits, useCreateUnit };
