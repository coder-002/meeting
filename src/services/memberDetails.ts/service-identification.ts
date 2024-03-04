import { useMutation } from "react-query";
import { IIdentification } from "../../models/member/memberDetails";
import instance from "../apiService";
import { api } from "../service-api";

const addIdentification = (ids: IIdentification) => {
  return instance.post(api.member.memberDetails.id.post, ids);
};

const useAddIdentification = () => {
  return useMutation(addIdentification, {
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
  });
};

export { useAddIdentification };
