import { useNavigate, useParams } from "react-router-dom";
import {
  useApproveMeeting,
  useGetMeeting,
} from "../../services/service-meeting";
import { useEffect, useState } from "react";
import { IMeeting } from "../../models/meeting";
import {
  Body2,
  Button,
  Divider,
  Subtitle2,
  Title3,
} from "@fluentui/react-components";
import { useGetUnits } from "../../services/setup/service-unit";
import { IUnit } from "../../models/setup/unit";
import { useGetBranch } from "../../services/setup/service-branch";
import { useGetCommittee } from "../../services/setup/service-committee";
import { IBranch } from "../../models/setup/branch";
import { ICommittee } from "../../models/setup/committee";
import httpStatus from "http-status";
import { Navigation_Routes } from "../../routes/routes.constant";

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: unitData } = useGetUnits();
  const { data: branchData } = useGetBranch();
  const { data: committeData } = useGetCommittee();

  const [singleMeeting, setSingleMeeting] = useState<IMeeting>();
  const { data } = useGetMeeting();
  const { mutateAsync: approveMeeting } = useApproveMeeting();

  useEffect(() => {
    if (data && id) {
      const meeting = data.find((item: IMeeting) => item.id == +id);
      setSingleMeeting(meeting);
    }
  }, []);

  const handleApprove = async (id: string) => {
    const response = await approveMeeting(id);
    if (response.status === httpStatus.OK) {
      navigate(Navigation_Routes.MEETING);
    }
  };

  return (
    <div className="flex flex-col gap-3 shadow-md p-6">
      <Title3>Meeting Details</Title3>
      <Divider />
      <div className=" flex gap-4">
        <Subtitle2>Meeting Code :</Subtitle2>
        <Body2>{singleMeeting?.meetingCode}</Body2>
      </div>
      <div className=" flex gap-4">
        <Subtitle2>Topic :</Subtitle2>
        <Body2>{singleMeeting?.topic}</Body2>
      </div>
      <div className=" flex gap-4">
        <Subtitle2>Unit :</Subtitle2>
        <Body2>
          {
            unitData.find((item: IUnit) => item.id == singleMeeting?.unitId)
              ?.unitName
          }
        </Body2>
      </div>
      <div className=" flex gap-4">
        <Subtitle2>Branch :</Subtitle2>
        <Body2>
          {
            branchData.find(
              (item: IBranch) => item.id == singleMeeting?.branchId
            )?.branchName
          }
        </Body2>
      </div>
      <div className=" flex gap-4">
        <Subtitle2>Committee :</Subtitle2>
        <Body2>
          {
            committeData.find(
              (item: ICommittee) => item.id == singleMeeting?.committeeId
            )?.committeeName
          }
        </Body2>
      </div>
      <div className=" flex gap-4">
        <Subtitle2>Description :</Subtitle2>
        <Body2>{singleMeeting?.description}</Body2>
      </div>
      <div className=" flex gap-4">
        <Subtitle2>Notes :</Subtitle2>
        <Body2>{singleMeeting?.notes}</Body2>
      </div>
      <div className="flex justify-end">
        <Button appearance="primary" onClick={() => handleApprove(id || "")}>
          Approve
        </Button>
      </div>
    </div>
  );
};

export default MeetingDetails;
