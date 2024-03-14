import { useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useGetCommitteeMember,
  useGetCommittee,
  useAddCommitteeMember,
  useDeleteCommitteeMember,
} from "../../services/setup/service-committee";
import { useNavigate, useParams } from "react-router-dom";
import Drawer from "../../components/Drawer/Drawer";
import Select from "../../components/form/Select";
import { useForm } from "react-hook-form";
import { useGetDesignation } from "../../services/setup/service-designation";
import { selectOptions } from "../../helpers/selectOptions";
import Input from "../../components/form/Input";
import { Button, Subtitle1 } from "@fluentui/react-components";
import { useGetAllMember } from "../../services/service-members";
import { IMember } from "../../models/member/member";
import { IDesignation } from "../../models/setup/designation";
import { ICommittee } from "../../models/setup/committee";
import httpStatus from "http-status";
import { ArrowLeft24Filled, Delete16Filled } from "@fluentui/react-icons";
import Loading from "../../components/Loading";
import Allowance from "./Allowance";

const CommitteeMember = () => {
  const { committeeId: id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("");
  const { data: committeeData } = useGetCommittee();
  const { data: committeeMember } = useGetCommitteeMember(id || "");
  const { data: designationData } = useGetDesignation();
  const { mutateAsync: deleteCommitteeMember } = useDeleteCommitteeMember();
  const { data: memberData } = useGetAllMember();
  const { mutateAsync: addMember } = useAddCommitteeMember();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const selectDesignation =
    designationData &&
    designationData.map((item: IDesignation) => {
      return { id: item.id, name: item.designationName };
    });
  const selectMember =
    memberData &&
    memberData.map((item: IMember) => {
      return { id: item.id, name: item.memberName };
    });

  const selectCommittee =
    committeeData &&
    committeeData.map((item: ICommittee) => {
      return { id: item.id, name: item.committeeName };
    });

  const cols = [
    {
      dataKey: "memberId",
      title: "Member Name",
      render: (item: any) => {
        return (
          <>
            {
              memberData?.find((member: IMember) => member.id == item?.memberId)
                ?.memberName
            }
          </>
        );
      },
    },
    {
      dataKey: "designationId",
      title: "Designation",
      render: (item: any) => {
        return (
          <>
            {
              designationData?.find(
                (designation: IDesignation) =>
                  designation.id == item?.designationId
              )?.designationName
            }
          </>
        );
      },
    },
    { dataKey: "committee", title: "Committee Name" },
    { dataKey: "startDate", title: "Start Date" },
    { dataKey: "endDate", title: "End Date" },
  ];

  const submitHandler = async (data: any) => {
    const response = await addMember({ ...data, committeeId: id });
    if (response.status == httpStatus.OK) {
      setIsOpen(false);
      reset();
    }
  };
  const handleRowClick = (items: any) => {
    setView(items?.id);
  };

  const handleDelete = async (view: string) => {
    const response = await deleteCommitteeMember(view);
    if (response.status === httpStatus.OK) {
      alert("Deleted");
    }
  };

  if (!designationData || !memberData || !committeeData) {
    return <Loading />;
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-4 ">
      <div className="col-span-2 shadow-md">
        <div className="flex gap-2">
          <Button
            appearance="transparent"
            type="button"
            onClick={() => navigate(-1)}
            icon={<ArrowLeft24Filled />}
          />
          <Subtitle1>Committee Member</Subtitle1>
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Member">
          <form onSubmit={handleSubmit(submitHandler)}>
            <Select
              name="committeeId"
              register={register}
              label="Committee Name"
              options={selectOptions(selectCommittee || [])}
              placeholder="Select Committee "
              defaultValue={id}
              disabled
            />
            <Select
              name="memberId"
              register={register}
              label="Member Name"
              options={selectOptions(selectMember || [])}
              placeholder="Select Member"
              required
            />
            <Select
              name="designationId"
              register={register}
              label="Designation"
              options={selectOptions(selectDesignation || [])}
              placeholder="Select Designation"
              required
            />
            <Input
              name="startDate"
              register={register}
              label="Start Date"
              type="date"
              required
            />
            <Input
              name="endDate"
              register={register}
              label="End Date"
              type="date"
              required
            />
            <div className=" flex gap-3 mt-3">
              <Button appearance="primary" type="submit">
                Create
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(!open);
                  reset();
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Drawer>
        <div className="relative">
          {view && (
            <>
              <div className="flex gap-4 absolute top-4 right-0">
                <Button
                  icon={<Delete16Filled />}
                  appearance="primary"
                  onClick={() => handleDelete(view)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
          <TableComp
            columns={cols}
            data={committeeMember || []}
            btnText="Add Member"
            onAction={() => setIsOpen(!isOpen)}
            onSelect={handleRowClick}
          />
        </div>
      </div>
      <div className="shadow-md ">
        <div className="px-4"></div>
        <Allowance/>
      </div>
    </div>
  );
};

export default CommitteeMember;
