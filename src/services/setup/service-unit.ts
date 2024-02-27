import { useQuery } from "react-query";
import instance from "../apiService";
import { api } from "../service-api";
import { dataGridBodyClassNames } from "@fluentui/react-components";

const getUnits = () => {
  return instance.get(api.unit.get);
};

const useGetUnits = () => {
  return useQuery([api.unit.get], getUnits, {
    select: (data) => data?.data,
    onError: (error) => console.log(error),
  });
};

export { useGetUnits };
