import { Badge, Button } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useCreateCommittee,
  useGetCommittee,
} from "../../services/setup/service-committee";
import { useGetUnits } from "../../services/setup/service-unit";
import { useGetBranch } from "../../services/setup/service-branch";
import { useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import { useForm } from "react-hook-form";
import Select from "../../components/form/Select";
import { selectOptions } from "../../helpers/selectOptions";
import httpStatus from "http-status";
import { ICommittee, IPostCommittee } from "../../models/setup/committee";

const initialValues = {
  unitId: 0,
  unitName: "",
  branchId: 0,
  branchName: "",
  committeeCode: "",
  committeeName: "",
  description: "",
  isActive: true,
};
const Committee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetCommittee();
  const { mutateAsync: createCommittee } = useCreateCommittee();
  const { data: unitData } = useGetUnits();
  const { data: branchData } = useGetBranch();
  const selectUnit =
    unitData &&
    unitData.map((item: any) => {
      return { id: item.id, name: item.unitName };
    });
  const selectBranch =
    branchData &&
    branchData.map((item: any) => {
      return { id: item.id, name: item.branchName };
    });

  const { register, handleSubmit, reset } = useForm<ICommittee>({
    defaultValues: initialValues,
  });

  const cols = [
    { dataKey: "unitName", title: "Unit Name" },
    { dataKey: "branchName", title: "Branch Name" },
    { dataKey: "committeeCode", title: "Committee Code" },
    { dataKey: "committeeName", title: "Committee Name" },
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
    { dataKey: "description", title: "Description" },
  ];

  const submitHandler = async (data: IPostCommittee) => {
    const response = await createCommittee({
      ...data,
      unitName: unitData.find((item: any) => item?.id == data?.unitId)
        ?.unitName,
      branchName: branchData.find((item: any) => item?.id == data?.branchId)
        ?.branchName,
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
          <Select
            name="unitId"
            register={register}
            label="Unit Name"
            options={selectOptions(selectUnit || [])}
            placeholder="Select Unit Name"
          />
          <Select
            name="branchId"
            register={register}
            label="Branch Name"
            options={selectOptions(selectBranch || [])}
            placeholder="Select Unit Name"
          />

          <Input
            name="committeeCode"
            register={register}
            label="Committee Code"
            required
          />
          <Input
            name="committeeName"
            register={register}
            label="Committee Name"
            required
          />
          <Input name="description" register={register} label="Description" />
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
        btnText="Add Committee"
        onAction={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Committee;
