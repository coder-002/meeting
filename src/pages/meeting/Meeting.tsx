import { useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useCreateMeeting,
  useDeleteMeeting,
  useGetMeeting,
} from "../../services/service-meeting";
import { Badge, Button } from "@fluentui/react-components";
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
import { Delete16Filled, Eye16Filled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { Navigation_Routes } from "../../routes/routes.constant";
import Loading from "../../components/Loading";

const initialValues = {
  branchId: 0,
  unitId: 0,
  meetingCode: "",
  topic: "",
  description: "",
  committeeId: 0,
  notes: "",
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
      dataKey: "description",
      title: "Description",
    },
    {
      dataKey: "notes",
      title: "Notes",
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
      dataKey: "createdOn",
      title: "Created On.",
      render: (item: any) => {
        return <>{item.createdOn.slice(0, 10)}</>;
      },
    },
    {
      dataKey: "isCompleted",
      title: "Status",
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            color={item.isCompleted ? "success" : "warning"}
            size="large"
          >
            {item.isCompleted ? "Complete" : "Process"}
          </Badge>
        );
      },
    },
  ];

  const onSubmitHandler = async (data: IPostMeeting) => {
    const response = await createMeeting(data);
    if (response.status == httpStatus.OK) {
      setIsOpen(false);
      reset(initialValues);
    }
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
      alert("Deleted");
    }
  };

  if (!unitData || !committeData || !branchData) {
    return <Loading />;
  }

  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Meeting">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div>
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
            <Input
              name="meetingCode"
              register={register}
              label="Meeting Code"
              required
            />
            <Input name="topic" register={register} label="Topic" required />
            <Input name="description" register={register} label="Description" />
            <Select
              name="committeeId"
              register={register}
              label="Committee Name"
              options={selectOptions(selectCommittee || [])}
              placeholder="Select Committee Name"
              required
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
          <div className="flex gap-4 absolute top-0 right-0">
            <Button
              icon={<Eye16Filled />}
              appearance="primary"
              onClick={handleView}
            >
              View
            </Button>
            <Button
              icon={<Delete16Filled />}
              appearance="primary"
              onClick={() => handleDelete(view)}
            >
              Delete
            </Button>
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
