import { useEffect, useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useGetCommitteeMember,
  useGetCommittee,
  useAddCommitteeMember,
} from "../../services/setup/service-committee";
import { useParams } from "react-router-dom";
import Drawer from "../../components/Drawer/Drawer";
import Select from "../../components/form/Select";
import { useForm } from "react-hook-form";
import { useGetDesignation } from "../../services/setup/service-designation";
import { selectOptions } from "../../helpers/selectOptions";
import Input from "../../components/form/Input";
import { Button } from "@fluentui/react-components";
import { useGetMember } from "../../services/service-members";
import { IMember } from "../../models/member/member";
import { IDesignation } from "../../models/setup/designation";
import { ICommittee } from "../../models/setup/committee";
import httpStatus from "http-status";

const CommitteeMember = () => {
  const { committeeId: id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const { data: committeeData } = useGetCommittee();
  const { data: committeeMember } = useGetCommitteeMember(id || "");
  const { data: designationData } = useGetDesignation();
  const { mutateAsync: getMember } = useGetMember();
  const { mutateAsync: addMember } = useAddCommitteeMember();
  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    async function getData() {
      const data = await getMember({
        pageNumber: 1,
        pageSize: 100,
        searchText: "",
      });
      setData(data.data.data);
    }
    getData();
  }, []);
  const selectDesignation =
    designationData &&
    designationData.map((item: IDesignation) => {
      return { id: item.id, name: item.designationName };
    });
  const selectMember =
    data &&
    data.map((item: IMember) => {
      return { id: item.id, name: item.memberName };
    });

  const selectCommittee =
    committeeData &&
    committeeData.map((item: ICommittee) => {
      return { id: item.id, name: item.committeeName };
    });

  const cols = [
    { dataKey: "memberId", title: "Member Name" },
    { dataKey: "designationId", title: "Designation" },
    { dataKey: "committee", title: "Committee Name" },
    { dataKey: "startDate", title: "Start Date" },
    { dataKey: "endDate", title: "End Date" },
  ];

  const submitHandler = async (data: any) => {
    const response = await addMember(data);
    if (response.status == httpStatus.OK) {
      setIsOpen(false);
      reset();
    }
  };

  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Member">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Select
            name="committeeId"
            register={register}
            label="Committee Name"
            options={selectOptions(selectCommittee || [])}
            placeholder="Select Committee "
            defaultValue={id}
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
      <TableComp
        columns={cols}
        data={committeeMember || []}
        btnText="Add Member"
        onAction={() => setIsOpen(!isOpen)}
        onSelect={() => {}}
      />
    </div>
  );
};

export default CommitteeMember;
