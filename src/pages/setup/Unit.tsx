import { Badge, Button } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import { useCreateUnit, useGetUnits } from "../../services/setup/service-unit";
import { useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import { IPostUnit, IUnit } from "../../models/setup/unit";
import { useForm } from "react-hook-form";
import httpStatus from "http-status";

const initialValues = {
  unitName: "",
  registrationDate: "",
  address: "",
  isActive: true,
};

const Unit = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetUnits();
  const { mutateAsync: createUnit } = useCreateUnit();

  const { register, handleSubmit, reset } = useForm<IUnit>({
    defaultValues: initialValues,
  });
  const cols = [
    {
      dataKey: "unitName",
      title: "Unit Name",
    },
    {
      dataKey: "registrationDate",
      title: "Registration Date",
      render: (item: any) => {
        return <>{item.registrationDate.slice(0, 10)}</>;
      },
    },
    {
      dataKey: "address",
      title: "Address",
    },
    {
      dataKey: "isActive",
      title: "Status",
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            color={item.isActive ? "success" : "danger"}
          >
            {item.isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
    },
  ];

  const submitHandler = async (data: IPostUnit) => {
    const response = await createUnit(data);
    if (response.status === httpStatus.OK) {
      setIsOpen(false);
      reset(initialValues);
    }
  };
  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Unit">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <Input
              name="unitName"
              register={register}
              label="Unit Name"
              required
            />
            <Input
              name="registrationDate"
              register={register}
              label="Registration Date"
              type="date"
              required
            />
            <Input
              name="address"
              register={register}
              label="Address"
              required
            />
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
      <TableComp
        columns={cols}
        data={data || []}
        btnText="Add Unit"
        onAction={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Unit;
