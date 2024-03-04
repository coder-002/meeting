import { useFieldArray, useForm } from "react-hook-form";
import { Button, Divider } from "@fluentui/react-components";
import Input from "../form/Input";
import Select from "../form/Select";
import { useEffect, useState } from "react";
import { IOptions } from "../../models/member/member";
import { useMemberInit } from "../../services/service-members";
import { selectOptions } from "../../helpers/selectOptions";
import { useAddIdentification } from "../../services/memberDetails.ts/service-identification";
import httpStatus from "http-status";

const initialValues = {
  type: "",
  relType: "",
  idNumber: "",
  issuerAuthority: "",
  issuedPlace: "",
  issuerCountry: "",
  issueDate: "",
  expiryDate: "",
};
const IdentificationForm = ({ id }: { id: string }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      ids: [initialValues],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ids",
  });
  const [options, setOptions] = useState<IOptions>();
  const { data: memberInit } = useMemberInit();
  const { mutateAsync: addIdentification } = useAddIdentification();

  useEffect(() => {
    setOptions(memberInit?.data);
  }, [memberInit]);

  const submitHandler = async (ids: any) => {
    const response = await addIdentification({
      profileId: +id,
      ...ids,
    });
    if (response.status == httpStatus.OK) {
      alert("identification Added");
    }
  };

  return (
    <form className="w-full p-4" onSubmit={handleSubmit(submitHandler)}>
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="mt-2 flex flex-col gap-4">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
              <Select
                name={`ids[${index}].type`}
                options={selectOptions(options?.idTypes || [])}
                register={register}
                label="Identity Type"
                placeholder="Select an identity type"
              />
              <Select
                name={`ids[${index}].type`}
                options={selectOptions(options?.relationTypes || [])}
                register={register}
                label="Relation Type"
                required
                placeholder="Select an realtion type"
              />
              <Input
                register={register}
                label="Id Number"
                name={`ids[${index}].idNumber`}
                type="number"
                required
              />
              <Input
                register={register}
                label="Issuer Authority"
                name={`ids[${index}].issuerAuthority`}
                required
              />
              <Input
                register={register}
                label="Issued Place"
                name={`ids[${index}].issuedPlace`}
                required
              />

              <Input
                register={register}
                label="Issued Country"
                name={`ids[${index}].issuerCountry`}
                required
              />
              <Input
                register={register}
                label="Issued Date"
                name={`ids[${index}].issueDate`}
                type="date"
                required
              />
              <Input
                register={register}
                label="Expiry Date"
                name={`ids[${index}].expiryDate`}
                type="date"
              />
              <div className="flex justify-start mt-8 h-8">
                <Button type="button" onClick={() => remove(index)}>
                  Delete
                </Button>
              </div>
            </div>
            <Divider />
          </div>
        );
      })}
      <div className="mt-4 flex justify-between">
        <Button
          type="button"
          onClick={() =>
            append({
              type: "",
              relType: "",
              idNumber: "",
              issuerAuthority: "",
              issuedPlace: "",
              issuerCountry: "",
              issueDate: "",
              expiryDate: "",
            })
          }
        >
          + Add more
        </Button>
        <div className="flex justify-end gap-4">
          <Button appearance="primary" type="submit">
            Save
          </Button>
          <Button>Cancel</Button>
        </div>
      </div>
    </form>
  );
};

export default IdentificationForm;
