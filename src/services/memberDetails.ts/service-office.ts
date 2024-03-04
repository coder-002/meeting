import { useMutation } from "react-query";
import { IOffice } from "../../models/member/memberDetails";
import instance from "../apiService";
import { api } from "../service-api";

const addOffice = (office: IOffice) => {
  return instance.post(api.member.memberDetails.office.post, office);
};

const useAddOffice = () => {
  return useMutation(addOffice, {
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
  });
};

export { useAddOffice };
