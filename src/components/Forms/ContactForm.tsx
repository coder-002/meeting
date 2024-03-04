import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@fluentui/react-components";
import Select from "../form/Select";
import Input from "../form/Input";
import { useEffect, useState } from "react";
import { IOptions } from "../../models/member/member";
import { useMemberInit } from "../../services/service-members";
import { selectOptions } from "../../helpers/selectOptions";
import { useAddContact } from "../../services/memberDetails.ts/service-contact";
import httpStatus from "http-status";

const initialValues = {
  type: "",
  relType: "",
  value: "",
};

const ContactForm = ({ id }: { id: string }) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      contacts: [initialValues],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });
  const [options, setOptions] = useState<IOptions>();
  const { data: memberInit } = useMemberInit();
  const { mutateAsync: addContact } = useAddContact();

  useEffect(() => {
    setOptions(memberInit?.data);
  }, [memberInit]);

  const submitHandler = async (data: any) => {
    const response = await addContact({
      profileId: +id,
      ...data,
    });
    if (response.status == httpStatus.OK) {
      alert("Contact Added");
    }
  };

  return (
    <form className="w-full p-4" onSubmit={handleSubmit(submitHandler)}>
      <div>
        {fields.map((item, index) => {
          return (
            <div>
              <div key={item.id} className="grid grid-cols-4 gap-4 ">
                <Select
                  name={`contacts[${index}].type`}
                  options={selectOptions(options?.contactTypes || [])}
                  register={register}
                  placeholder="Select Contact types"
                  label="Type"
                  required
                />
                <Select
                  name={"relType"}
                  options={selectOptions(options?.relationTypes || [])}
                  register={register}
                  label="Relation Type"
                  required
                  placeholder="Select an realtion type"
                />
                <Input
                  name={`contacts[${index}].value`}
                  register={register}
                  label="Value"
                  required
                />
                <div className=" flex items-end">
                  <Button type="button" onClick={() => remove(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" flex mt-4 justify-between">
        <Button
          type="button"
          onClick={() => append({ type: "", relType: "", value: "" })}
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

export default ContactForm;
