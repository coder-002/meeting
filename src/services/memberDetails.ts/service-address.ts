import { useMutation } from "react-query";
import { IAddress } from "../../models/member/memberDetails";
import instance from "../apiService";
import { api } from "../service-api";

const addAddresss = (address: IAddress[]) => {
  return instance.post(api.member.memberDetails.address.post, address);
};

const useAddAddress = () => {
  return useMutation(addAddresss, {
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
  });
};

export { useAddAddress };
