import { Button } from "@fluentui/react-components";
import { TableComp } from "../../components/DataGrid/TableComp";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import {
  useCreateDeduction,
  useGetDeduct,
} from "../../services/setup/service-deduct";
import { useState } from "react";
import { IDeduction, IPostDeduction } from "../../models/setup/deduction";
import { useForm } from "react-hook-form";
import httpStatus from "http-status";

const initialValues = {
  deductTitle: "",
  rate: "",
};

const Deduction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetDeduct();
  const { mutateAsync: createDeduction } = useCreateDeduction();
  const { register, handleSubmit, reset } = useForm<IDeduction>({
    defaultValues: initialValues,
  });
  const cols = [
    { dataKey: "deductTitle", title: "Deduct Title" },
    { dataKey: "rate", title: "Rate" },
  ];

  const submitHandler = async (data: IPostDeduction) => {
    const response = await createDeduction(data);
    if (response.status === httpStatus.OK) {
      setIsOpen(false);
      reset(initialValues);
    }
  };
  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Designation">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name="deductTitle"
            register={register}
            label="Deduction Title"
            required
          />
          <Input name="rate" register={register} label="Rate" required />
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
        btnText="Add Deduction"
        onAction={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default Deduction;
