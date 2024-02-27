import { Badge, Button } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useCreateBranch,
  useGetBranch,
} from "../../services/setup/service-branch";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Select from "../../components/form/Select";
import { useGetUnits } from "../../services/setup/service-unit";
import { selectOptions } from "../../helpers/selectOptions";
import httpStatus from "http-status";
import { IPostBranch } from "../../models/setup/branch";
import { branchSchema } from "../../schema/setup/setupSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const initialValues = {
  orgUnitId: 0,
  orgUnitName: "",
  branchName: "",
  branchCode: "",
  address: "",
  contactNumber: "",
  isActive: true,
};
const Branch = () => {
  const { data } = useGetBranch();
  const { data: unitData } = useGetUnits();
  const { mutateAsync: createBranch } = useCreateBranch();
  const [isOpen, setIsOpen] = useState(false);
  const selectUnit =
    unitData &&
    unitData.map((item: any) => {
      return { id: item.id, name: item.unitName };
    });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(branchSchema),
  });

  const cols = [
    {
      dataKey: "branchCode",
      title: "Branch Code",
    },
    {
      dataKey: "branchName",
      title: "Branch Name",
    },
    {
      dataKey: "orgUnitName",
      title: "Unit Name",
    },
    {
      dataKey: "address",
      title: "Address",
    },
    {
      dataKey: "contactNumber",
      title: "Contact No.",
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

  const submitHandler = async (data: IPostBranch) => {
    const response = await createBranch({
      ...data,
      orgUnitName: unitData.find((item: any) => item?.id == data?.orgUnitId)
        ?.unitName,
      orgUnitId: +data.orgUnitId,
      isActive: true,
    });
    if (response.status === httpStatus.OK) {
      setIsOpen(false);
      reset(initialValues);
    }
  };
  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Branch">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div>
            <Input
              name="branchCode"
              register={register}
              label="Branch Code"
              required
            />
            <Input
              name="branchName"
              register={register}
              label="Branch Name"
              required
            />
            <Select
              name="orgUnitId"
              register={register}
              label="Unit Name"
              options={selectOptions(selectUnit || [])}
              placeholder="Select Unit Name"
            />
            <Input
              name="address"
              register={register}
              label="Address"
              required
            />
            <Input
              name="contactNumber"
              register={register}
              label="Contact Number"
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
        btnText="Add Branch"
        onAction={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Branch;
