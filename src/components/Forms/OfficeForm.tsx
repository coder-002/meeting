import { useForm } from "react-hook-form";
import { Button } from "@fluentui/react-components";
import Input from "../form/Input";
import { Office } from "../../models/member/memberDetails";
import { useAddOffice } from "../../services/memberDetails.ts/service-office";
import httpStatus from "http-status";

const initialValues = {
  orgType: "",
  orgName: "",
  orgAddress: "",
  orgContact: "",
  designation: "",
  joinedOn: "",
};
const OfficeForm = ({ id }: { id: string }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const { mutateAsync: addOffice } = useAddOffice();
  const submitHandler = async (data: Office) => {
    console.log(data);
    const response = await addOffice({ profileId: +id, offices: [data] });
    if (response.status == httpStatus.OK) {
      alert("Office Added");
    }
  };

  return (
    <form className="p-4" onSubmit={handleSubmit(submitHandler)}>
      <div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
          <Input
            register={register}
            label="Organization Type"
            name={`orgType`}
            required
          />
          <Input
            register={register}
            label="Organization Name"
            name={`orgName`}
            required
          />
          <Input
            register={register}
            label="Organization Address"
            name={`orgAddress`}
            required
          />
          <Input
            register={register}
            label="Organization Contact"
            name={`orgContact`}
            required
          />
          <Input
            register={register}
            label="Designation"
            name={`designation`}
            required
          />
          <Input
            register={register}
            label="Joined On"
            type="date"
            name={`joinedOn`}
            required
          />
        </div>
      </div>
      <div className="mt-3 flex justify-end gap-4">
        <Button appearance="primary" type="submit">
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </form>
  );
};

export default OfficeForm;
