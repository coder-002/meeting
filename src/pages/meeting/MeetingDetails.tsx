import { useNavigate, useParams } from "react-router-dom";
import {
  IUpdate,
  useApproveMeeting,
  useEditNotes,
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
import Loading from "../../components/Loading";
import Upload from "../../components/form/Upload";
import httpStatus from "http-status";
import { Navigation_Routes } from "../../routes/routes.constant";
import Modal from "../../components/common/Modal";
import { useForm } from "react-hook-form";
import Textarea from "../../components/form/TextArea";
import Attended from "./Attended";
import Participants from "./Participants";
import { useToast } from "../../contexts/ToastConextProvider";

const initialValues = {
  notes: "",
};

const MeetingDetails = () => {
  const { id } = useParams();
  const [approved, setApproved] = useState(false);
  const navigate = useNavigate();
  const { data: unitData } = useGetUnits();
  const { data: branchData } = useGetBranch();
  const { data: committeData } = useGetCommittee();
  const { mutateAsync: editNotes } = useEditNotes();
  const { register, reset, handleSubmit } = useForm<typeof initialValues>({
    defaultValues: initialValues,
  });

  const { notifySuccess, notifyError } = useToast();
  const [singleMeeting, setSingleMeeting] = useState<IMeeting>();
  const { data } = useGetMeeting();
  // const { mutateAsync: approveMeeting } = useApproveMeeting();

  useEffect(() => {
    if (data && id) {
      const meeting = data.find((item: IMeeting) => item.id == +id);
      setSingleMeeting(meeting);
    }
  }, [data]);

  // const handleApprove = async (id: string) => {
  //   const response = await approveMeeting(id);
  //   if (response.status === httpStatus.OK) {
  //     navigate(Navigation_Routes.MEETING);
  //   }
  // };

  useEffect(() => {
    reset({ notes: singleMeeting?.notes || "" });
  }, [id, singleMeeting]);

  const onSubmitHandler = async (data: IUpdate) => {
    const meetingId = id || "";
    const response = await editNotes({ meetingId, notes: data });
    if (response.status == httpStatus.OK) {
      notifySuccess("Notes successfully updated");
    } else notifyError("Notes update failed");
  };

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
            <Modal
              btnText="Edit Notes"
              title="Edit Notes"
              submitButtonText="Update"
              resetButtonText="Cancel"
              submitHandler={handleSubmit(onSubmitHandler)}
            >
              <Textarea name="notes" register={register} label="Notes" />
            </Modal>
          </div>
          <Divider />
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
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
              <Subtitle2>Date :</Subtitle2>
              <Body2>{singleMeeting?.date}</Body2>
            </div>
            <div className=" flex gap-4">
              <Subtitle2>Start Time :</Subtitle2>
              <Body2>{singleMeeting?.startTime.slice(0, 8)}</Body2>
            </div>
            <div className=" flex gap-4">
              <Subtitle2>End Time :</Subtitle2>
              <Body2>{singleMeeting?.endTime.slice(0, 8)}</Body2>
            </div>
            <div className=" flex gap-4">
              <Subtitle2>Description :</Subtitle2>
              <Body2>{singleMeeting?.description}</Body2>
            </div>
            <div className=" flex gap-4">
              <Subtitle2>Notes :</Subtitle2>
              <Body2>{singleMeeting?.notes}</Body2>
            </div>
          </div>

          <div className="flex justify-end p-5">
            <Button
              appearance="primary"
              // onClick={() => handleApprove(id || "")}
              onClick={() => setApproved(!approved)}
            >
              Approve
            </Button>
          </div>
        </div>

        <div className="shadow-md p-2 mt-4">
          <Subtitle2>Upload Attachment</Subtitle2>
          <Upload id={id || ""} />
        </div>
      </div>
      <div className=" h-full shadow-md">
        {approved ? <Attended id={id || ""} /> : <Participants id={id || ""} />}
      </div>
    </div>
  );
};

export default MeetingDetails;
