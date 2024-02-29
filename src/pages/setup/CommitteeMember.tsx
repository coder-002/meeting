import { useEffect, useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import { useGetCommitteeMember } from "../../services/setup/service-committee";
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

const CommitteeMember = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const { data: committeeMember } = useGetCommitteeMember(id || "");
  const { data: designationData } = useGetDesignation();
  const { mutateAsync: getMember } = useGetMember();
  const { register } = useForm();
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

  const cols = [
    { dataKey: "memberId", title: "Member Name" },
    { dataKey: "designationId", title: "Designation" },
    { dataKey: "committee", title: "Committee Name" },
    { dataKey: "startDate", title: "Start Date" },
    { dataKey: "endDate", title: "End Date" },
  ];

  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Branch">
        <form onSubmit={() => {}}>
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
                // reset(initialValues);
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
