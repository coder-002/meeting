import { useMutation } from "react-query";
import { IRelation } from "../../models/member/memberDetails";
import instance from "../apiService";
import { api } from "../service-api";

const addRelation = (relation: IRelation) => {
  return instance.post(api.member.memberDetails.relation.post, relation);
};

const useAddRelation = () => {
  return useMutation(addRelation, {
    onSuccess: () => {},
    onError: (e) => {
      console.log(e);
    },
  });
};

export { useAddRelation };
