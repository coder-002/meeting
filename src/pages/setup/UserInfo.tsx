import { useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import Drawer from "../../components/Drawer/Drawer";
import { useGetUser } from "../../services/setup/service-user";
import { Button } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";

const initialValues = {
  role: {},
  userName: "",
  email: "",
  fullName: "",
};
const UserInfo = () => {
  const { data } = useGetUser();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm();
  const cols = [
    {
      dataKey: "fullName",
      title: "Full Name",
    },
    {
      dataKey: "userName",
      title: "User Name",
    },
    {
      dataKey: "email",
      title: "Email",
    },
    { dataKey: "roles", title: "Role" },
  ];

  const submitHandler = () => {};
  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add User">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="fullName"
            register={register}
            label="Full Name"
            required
          />
          <Input
            name="userName"
            register={register}
            label="User Name"
            required
          />
          <Input name="email" register={register} label="Email" required />
          <div className=" flex gap-3 mt-3">
            <Button appearance="primary" type="submit">
              Create
            </Button>
            <Button onClick={() => setIsOpen(!isOpen)}>Cancel</Button>
          </div>
        </form>
      </Drawer>
      <TableComp
        columns={cols}
        data={data || []}
        btnText="Add User"
        onAction={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default UserInfo;
