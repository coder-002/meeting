import { Badge, Button } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useCreateDesignation,
  useGetDesignation,
} from "../../services/setup/service-designation";
import { useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import { IDesignation, IPostDesignation } from "../../models/setup/designation";
import httpStatus from "http-status";
import { useToast } from "../../contexts/ToastConextProvider";
import Loading from "../../components/Loading";

const initialValues = {
  designationCode: "",
  designationName: "",
  isActive: true,
};
const Designation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetDesignation();
  const { mutateAsync: createDesignation } = useCreateDesignation();

  const { register, handleSubmit, reset } = useForm<IDesignation>({
    defaultValues: initialValues,
  });

  const { notifyError, notifySuccess } = useToast();
  const cols = [
    { dataKey: "designationName", title: "Designation Name" },
    {
      dataKey: "isActive",
      title: "Status",
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            // color={item.isActive ? "success" : "danger"}
            style={{
              backgroundColor: item.isActive ? "primary" : "red",
            }}
          >
            {item.isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
  ];

  const submitHandler = async (data: IPostDesignation) => {
    const response = await createDesignation(data);
    if (response.status === httpStatus.OK) {
      setIsOpen(false);
      reset(initialValues);
      notifySuccess("Designation Created Successfully");
    } else notifyError("Designation Creation Failed");
  };

  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Designation">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="designationCode"
            register={register}
            label="Designation Code"
            required
          />
          <Input
            name="designationName"
            register={register}
            label="Designation Name"
            required
          />
          <div className="flex gap-3 mt-3">
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
        </form>
      </Drawer>
      <TableComp
        columns={cols}
        data={data || []}
        btnText="Add Designation"
        onAction={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Designation;
