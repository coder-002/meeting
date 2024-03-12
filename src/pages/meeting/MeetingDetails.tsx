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
  Subtitle1,
  Subtitle2,
} from "@fluentui/react-components";
import { useGetUnits } from "../../services/setup/service-unit";
import { IUnit } from "../../models/setup/unit";
import { useGetBranch } from "../../services/setup/service-branch";
import { useGetCommittee } from "../../services/setup/service-committee";
import { IBranch } from "../../models/setup/branch";
import { ICommittee } from "../../models/setup/committee";
import { ArrowLeft24Filled } from "@fluentui/react-icons";
import Participants from "./Participants";
import Loading from "../../components/Loading";
import Upload from "../../components/form/Upload";
import httpStatus from "http-status";
import { Navigation_Routes } from "../../routes/routes.constant";
import Modal from "../../components/common/Modal";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";

const initialValues = {
  notes: "",
};

const MeetingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: unitData } = useGetUnits();
  const { data: branchData } = useGetBranch();
  const { data: committeData } = useGetCommittee();
  const { register, reset, handleSubmit } = useForm<typeof initialValues>({
    defaultValues: initialValues,
  });

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

  useEffect(() => {
    reset({ notes: singleMeeting?.notes || "" });
  }, [id, singleMeeting]);

  // const onSubmitHandler = async (notes: string) => {
  //   const response = await editNotes(notes);
  //   if (response.status === httpStatus.OK) {
  //     console.log("heelo");
  //   }
  // };

  if (!unitData || !branchData || !committeData || !data) {
    return <Loading />;
  }

  return (
    <div className="grid lg:grid-cols-3 md: grid-cols-1 gap-3">
      <div className="col-span-2">
        <div className="flex flex-col gap-3 shadow-md p-2">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                appearance="transparent"
                type="button"
                onClick={() => navigate(-1)}
                icon={<ArrowLeft24Filled />}
              />
              <Subtitle1>Meeting Details</Subtitle1>
            </div>
            {/* <Modal
              btnText="Edit Notes"
              title="Edit Notes"
              submitButtonText="Update"
              resetButtonText="Cancel"
              submitHandler={handleSubmit(onSubmitHandler)}
            >
              <Input name="notes" register={register} label="Notes" />
            </Modal> */}
          </div>
          <Divider />
          <div className="grid grid-cols-3 gap-4">
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
                  unitData.find(
                    (item: IUnit) => item.id == singleMeeting?.unitId
                  )?.unitName
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
              <Subtitle2>Date :</Subtitle2>
              <Body2>{singleMeeting?.date}</Body2>
            </div>
            <div className=" flex gap-4">
              <Subtitle2>Start Time :</Subtitle2>
              <Body2>{singleMeeting?.startTime}</Body2>
            </div>
            <div className=" flex gap-4">
              <Subtitle2>End Time :</Subtitle2>
              <Body2>{singleMeeting?.endTime}</Body2>
            </div>
            <div className=" flex gap-4">
              <Subtitle2>Notes :</Subtitle2>
              <Body2>{singleMeeting?.notes}</Body2>
            </div>
          </div>

          <div className="flex justify-end p-5">
            <Button
              appearance="primary"
              onClick={() => handleApprove(id || "")}
            >
              Approve
            </Button>
          </div>
        </div>

        <Subtitle2>Upload Attachment</Subtitle2>
        <Upload />
      </div>
      <div className=" h-full shadow-md">
        <Participants id={id || ""} />
      </div>
    </div>
  );
};

export default MeetingDetails;
