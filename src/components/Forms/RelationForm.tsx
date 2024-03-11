import { useForm } from "react-hook-form";
import { Button, Divider } from "@fluentui/react-components";
import Input from "../form/Input";
import Select from "../form/Select";
import { selectOptions } from "../../helpers/selectOptions";
import { useEffect, useState } from "react";
import { IOptions } from "../../models/member/member";
import { useMemberInit } from "../../services/service-members";
import { useAddRelation } from "../../services/memberDetails.ts/service-relation";
import httpStatus from "http-status";

const initialValues = {
  salutation: "",
  firstName: "",
  middleName: "",
  lastName: "",
  type: "",
  dobNp: "",
};
const RelationForm = ({ id }: { id: string }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });
  const [options, setOptions] = useState<IOptions>();
  const { data: memberInit } = useMemberInit();

  useEffect(() => {
    setOptions(memberInit?.data);
  }, [memberInit]);

  const { mutateAsync: addRelation } = useAddRelation();

  const submitHandler = async (data: any) => {
    const response = await addRelation({
      profileId: +id,
      relations: [data],
    });
    if (response.status == httpStatus.OK) {
      alert("Office Added");
    }
  };
  return (
    <form className="flex flex-col p-4" onSubmit={handleSubmit(submitHandler)}>
      <div className="mt-2 flex flex-col gap-4">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-4 w-full">
          <Select
            name={`type`}
            options={selectOptions(options?.relationTypes || [])}
            register={register}
            label="Relation Type"
            placeholder="Select relation types"
          />
          <Select
            name={`salutation`}
            options={selectOptions(options?.salutationTypes || [])}
            register={register}
            label={"Salutation"}
            required
          />
          <Input
            register={register}
            name={`firstName`}
            label="First Name"
            placeholder="First name"
            required
          />
          <Input
            register={register}
            name={`middleName`}
            label="Middle Name"
            placeholder="Middle name"
          />
          <Input
            register={register}
            name={`lastName`}
            label="Last Name"
            placeholder="Last name"
            required
          />

          <Input
            register={register}
            name={`dobNp`}
            label="Date of Birth (NP)"
            type="date"
            required
          />
        </div>
        <Divider />
      </div>
      <div className="flex justify-end gap-4 mt-4">
        <Button appearance="primary" type="submit">
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </form>
  );
};

export default RelationForm;
