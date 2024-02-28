import { useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import { Button } from "@fluentui/react-components";
import { useForm } from "react-hook-form";

const Member = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();

  const cols = [
    { dataKey: "memberName", title: "Member Name" },
    { dataKey: "introducedOn", title: "Introduced On" },
    { dataKey: "terminatedOn", title: "Termination On" },
    { dataKey: "address", title: "Address" },
    { dataKey: "contact", title: "Contact" },
    { dataKey: "groupName", title: "Group Name" },
  ];
  const submitHandler = () => {};
  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add member">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input name="memberCode" register={register} label="Member Code" />
          <Input name="branchId" register={register} label="Branch Id" />
          <Input name="branchCode" register={register} label="Branch Code" />
          <Input
            name="introducedOn"
            register={register}
            label="Introduced On"
            type="date"
          />
          <Input name="memberName" register={register} label="Member Name" />
          <Input name="address" register={register} label="Address" />
          <Input name="contact" register={register} label="Contact" />
          <Input name="groupId" register={register} label="Group Id" />
          <Input name="homeAddress" register={register} label="Home Address" />
          <Input
            name="reportingBranchId"
            register={register}
            label="Reporting Branch Id"
          />
          <Input name="accountNo" register={register} label="Account No." />

          <div className=" flex gap-3 mt-3">
            <Button appearance="primary" type="submit">
              Create
            </Button>
            <Button onClick={() => setIsOpen(!open)}>Cancel</Button>
          </div>
        </form>
      </Drawer>
      <TableComp
        columns={cols}
        data={[]}
        onAction={() => setIsOpen(!isOpen)}
        btnText="Add Member"
      />
    </div>
  );
};

export default Member;
