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
import { IUnit } from "../../models/setup/unit";
import { useToast } from "../../contexts/ToastConextProvider";
import Loading from "../../components/Loading";
import { IPostBranch } from "../../models/setup/branch";

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
  const { mutateAsync: addBranch } = useCreateBranch();
  const [isOpen, setIsOpen] = useState(false);
  const { notifySuccess, notifyError } = useToast();
  const selectUnit =
    unitData &&
    unitData.map((item: IUnit) => {
      return { id: item.id, name: item.unitName };
    });

  const { register, handleSubmit, reset } = useForm<typeof initialValues>({
    defaultValues: initialValues,
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
    const response = await addBranch({
      ...data,
      orgUnitName: unitData.find((item: IUnit) => item?.id == data?.orgUnitId)
        ?.unitName,
      orgUnitId: +data.orgUnitId,
      isActive: true,
    });
    if (response.status == httpStatus.OK) {
      notifySuccess("Branch created Successfully");
      setIsOpen(false);
      reset(initialValues);
    } else notifyError("Branch creation Failed");
  };

  if (!unitData || !data) {
    return <Loading />;
  }
  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Branch">
        <form onSubmit={handleSubmit(submitHandler)}>
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
          <Input name="address" register={register} label="Address" required />
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
