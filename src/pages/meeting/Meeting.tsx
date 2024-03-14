import { useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useCreateMeeting,
  useDeleteMeeting,
  useGetMeeting,
} from "../../services/service-meeting";
import { Button, Subtitle1 } from "@fluentui/react-components";
import { useGetUnits } from "../../services/setup/service-unit";
import { IUnit } from "../../models/setup/unit";
import { useGetCommittee } from "../../services/setup/service-committee";
import { ICommittee } from "../../models/setup/committee";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import { useGetBranch } from "../../services/setup/service-branch";
import Select from "../../components/form/Select";
import { selectOptions } from "../../helpers/selectOptions";
import { IBranch } from "../../models/setup/branch";
import { IMeeting, IPostMeeting } from "../../models/meeting";
import httpStatus from "http-status";
import {
  ArrowLeft24Filled,
  Delete16Filled,
  Eye16Filled,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { Navigation_Routes } from "../../routes/routes.constant";
import Loading from "../../components/Loading";
import { useToast } from "../../contexts/ToastConextProvider";
import Textarea from "../../components/form/TextArea";
import { DeleteModal } from "../../components/common/DeleteModal";

const initialValues = {
  branchId: 0,
  unitId: 0,
  meetingCode: "",
  topic: "",
  description: "",
  committeeId: 0,
  notes: "",
  date: "",
  startTime: "",
  endTime: "",
};
const Meeting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("");
  const { data } = useGetMeeting();
  const { data: unitData } = useGetUnits();
  const { data: committeData } = useGetCommittee();
  const { mutateAsync: deleteMeeting } = useDeleteMeeting();
  const { data: branchData } = useGetBranch();
  const { mutateAsync: createMeeting } = useCreateMeeting();
  const { register, handleSubmit, reset } = useForm<IMeeting>({
    defaultValues: initialValues,
  });
  const navigate = useNavigate();
  const { notifyError, notifySuccess } = useToast();

  const selectUnit =
    unitData &&
    unitData.map((item: IUnit) => {
      return { id: item.id, name: item.unitName };
    });
  const selectBranch =
    branchData &&
    branchData.map((item: IBranch) => {
      return { id: item.id, name: item.branchName };
    });
  const selectCommittee =
    committeData &&
    committeData.map((item: ICommittee) => {
      return { id: item.id, name: item.committeeName };
    });
  const cols = [
    {
      dataKey: "meetingCode",
      title: "Meeting Code",
    },
    {
      dataKey: "topic",
      title: "Topic",
    },

    {
      dataKey: "committeeId",
      title: "Committee",
      render: (item: any) => {
        return (
          <>
            {
              committeData?.find(
                (committee: ICommittee) => committee.id == item?.committeeId
              )?.committeeName
            }
          </>
        );
      },
    },
    {
      dataKey: "branchId",
      title: "Branch",
      render: (item: any) => {
        return (
          <>
            {
              branchData?.find((branch: IBranch) => branch.id == item?.branchId)
                ?.branchName
            }
          </>
        );
      },
    },
    {
      dataKey: "unitId",
      title: "Unit",
      render: (item: any) => {
        return (
          <>
            {unitData?.find((unit: IUnit) => unit.id == item?.unitId)?.unitName}
          </>
        );
      },
    },
    {
      dataKey: "Date",
      title: "Date",
      render: (item: any) => {
        return <>{item.date.slice(0, 10)}</>;
      },
    },
    {
      dataKey: "startTime",
      title: "Start Time",
      render: (item: any) => {
        return <>{item.startTime.slice(0, 8)}</>;
      },
    },
    {
      dataKey: "endTime",
      title: "End Time",
      render: (item: any) => {
        return <>{item.startTime.slice(0, 8)}</>;
      },
    },
    {
      dataKey: "description",
      title: "Description",
    },
  ];

  const onSubmitHandler = async (data: IPostMeeting) => {
    const response = await createMeeting(data);
    if (response.status == httpStatus.OK) {
      setIsOpen(false);
      reset(initialValues);
      notifySuccess("Meeting Created Successfully");
    } else notifyError("Meeting Creation Failed");
  };

  const handleRowClick = (items: any) => {
    setView(items?.id);
  };
  const handleView = () => {
    navigate(Navigation_Routes.MEETING_DETAILS.replace(":id", view));
  };
  const handleDelete = async (view: string) => {
    const response = await deleteMeeting(view);
    if (response.status === httpStatus.OK) {
      notifySuccess("Deleted Successfully");
    }
  };

  if (!unitData || !committeData || !branchData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex gap-2">
        <Button
          appearance="transparent"
          type="button"
          onClick={() => navigate(-1)}
          icon={<ArrowLeft24Filled />}
        />
        <Subtitle1>Meeting Table</Subtitle1>
      </div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Meeting">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
            <Input
              name="meetingCode"
              register={register}
              label="Meeting Code"
              required
            />
            <Input name="topic" register={register} label="Topic" required />
            <Select
              name="branchId"
              register={register}
              label="Branch Name"
              options={selectOptions(selectBranch || [])}
              placeholder="Select Branch Name"
              required
            />
            <Select
              name="unitId"
              register={register}
              label="Unit Name"
              options={selectOptions(selectUnit || [])}
              placeholder="Select Unit Name"
              required
            />
            <Select
              name="committeeId"
              register={register}
              label="Committee Name"
              options={selectOptions(selectCommittee || [])}
              placeholder="Select Committee Name"
              required
            />
            <Input
              name="date"
              register={register}
              label="Date"
              required
              type="date"
            />
            <Input
              name="startTime"
              register={register}
              label="Start Time"
              required
              type="time"
              step="10"
            />
            <Input
              name="endTime"
              register={register}
              label="End Time"
              required
              type="time"
              step="10"
            />
            <Textarea
              name="description"
              register={register}
              label="Description"
            />
            <Input name="notes" register={register} label="Notes" />
            <div className=" flex gap-3 mt-3">
              <Button appearance="primary" type="submit">
                Create
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(!open);
                  reset(initialValues);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </Drawer>
      <div className="relative">
        {view && (
          <div className="flex gap-4 absolute top-4 right-0">
            <Button
              icon={<Eye16Filled />}
              appearance="primary"
              onClick={handleView}
            >
              View
            </Button>

            {/* <Button
              icon={<Delete16Filled />}
              appearance="primary"
              onClick={() => handleDelete(view)}
            >
              Delete
            </Button> */}
            <DeleteModal
              title="Delete"
              handleClick={() => handleDelete(view)}
              message="You're about to delete the meeting. Please back up any content you
              need before proceeding."
              consent="Yes, delete this meeting"
            />
          </div>
        )}
        <TableComp
          columns={cols}
          data={data || []}
          onAction={() => setIsOpen(!isOpen)}
          btnText="Add Meeting"
          onSelect={handleRowClick}
        />
      </div>
    </div>
  );
};

export default Meeting;
