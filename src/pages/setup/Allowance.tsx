import { Button, Subtitle1 } from "@fluentui/react-components";

import { TableComp } from "../../components/DataGrid/TableComp";
import {
  useGetDefaultAllowance,
  usePostDefaultAllowance,
  useUpdateDefaultAllowance,
} from "../../services/service-allowance";
import { useGetDesignation } from "../../services/setup/service-designation";
import { IDesignation } from "../../models/setup/designation";
import { useEffect, useState } from "react";
import Drawer from "../../components/Drawer/Drawer";
import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import Select from "../../components/form/Select";
import { selectOptions } from "../../helpers/selectOptions";
import { useParams } from "react-router-dom";
import httpStatus from "http-status";
import { IAllowance } from "../../models/allowance";

const initialValues = {
  committeeId: "",
  designationId: "",
  allowanceName: "",
  amount: "",
  rate: "",
};

const Allowance = () => {
  const { committeeId } = useParams();
  const [updateId, setUpdateId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetDefaultAllowance();
  const { data: designationData } = useGetDesignation();
  const { mutateAsync: addAllowance } = usePostDefaultAllowance();
  const { mutateAsync: updateAllowance } = useUpdateDefaultAllowance();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
  });

  const selectDesignation =
    designationData &&
    designationData.map((item: IDesignation) => {
      return { id: item.id, name: item.designationName };
    });

  const cols = [
    {
      dataKey: "allowanceName",
      title: "Allowance",
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

    {
      dataKey: "amount",
      title: "Amount",
    },
    {
      dataKey: "rate",
      title: "Rate",
    },
  ];

  useEffect(() => {
    if (updateId !== null) {
      const filterData = data?.find(
        (item: IAllowance) => item.id === +updateId
      );
      if (filterData) {
        reset({ ...filterData });
      }
    }
  }, [updateId]);

  const submitHandler = async (data: typeof initialValues) => {
    const id = committeeId || "";
    if (updateId) {
      const response = await updateAllowance({
        ...data,
        id: +updateId,
        committeeId: +data.committeeId,
        designationId: +data.designationId,
        amount: +data.amount,
        rate: +data.rate,
      });
      if (response.status === httpStatus.OK) {
        //TO-DO api issue
        setIsOpen(false);
        setUpdateId("");
        reset(initialValues);
        console.log("updated");
      }
    } else {
      const response = await addAllowance({
        ...data,
        committeeId: +id,
        amount: +data.amount,
        rate: +data.rate,
        designationId: +data.designationId,
      });

      if (response.status === httpStatus.OK) {
        // TO-DO api issue
        setIsOpen(false);
        reset(initialValues);
        console.log("heelo");
      }
    }
  };

  const handleEditClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex justify-between">
        <Subtitle1>Allowance </Subtitle1>
        <div className="flex gap-4">
          {updateId && <Button onClick={handleEditClick}>Edit</Button>}
          <Button onClick={() => setIsOpen(!isOpen)}>Add Allowance</Button>
        </div>
      </div>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={updateId ? "Edit Allowance" : "Add Allowance"}
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Select
            name="designationId"
            register={register}
            label="Designation"
            options={selectOptions(selectDesignation || [])}
            placeholder="Select Branch Name"
          />
          <Input name="allowanceName" register={register} label="Allowance" />
          <Input name="amount" register={register} label="Amount" />
          <Input name="rate" register={register} label="Rate" />
          <div className=" flex gap-3 mt-3">
            <Button appearance="primary" type="submit">
              {updateId ? "Update" : "Create"}
            </Button>
            <Button
              onClick={() => {
                setIsOpen(!open);
                setUpdateId("");
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
        onSelect={(items: any) => {
          setUpdateId(items?.id);
        }}
      />
    </div>
  );
};

export default Allowance;
