import { useParams } from "react-router-dom";
import { useGetMemberById } from "../../services/service-members";

const MemberDetails = () => {
  const { id } = useParams();
  const { data } = useGetMemberById(id || "");
  return <div>{data?.memberName}</div>;
};

export default MemberDetails;
