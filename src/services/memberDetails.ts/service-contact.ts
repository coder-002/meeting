import { useMutation } from "react-query";
import { IContact } from "../../models/member/memberDetails";
import instance from "../apiService";
import { api } from "../service-api";

const addContact = (contact: IContact[]) => {
  return instance.post(api.member.memberDetails.contact.post, contact);
};

const useAddContact = () => {
  return useMutation(addContact, {
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
  });
};

export { useAddContact };
