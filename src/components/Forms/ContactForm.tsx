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
import { Dismiss16Filled } from "@fluentui/react-icons";

const initialValues = {
  type: "",
  relType: "Self",
  value: "",
};
const ContactForm = ({ id }: { id: string }) => {
  const [options, setOptions] = useState<IOptions>();
  const { data: memberInit } = useMemberInit();
  const { mutateAsync: addContact } = useAddContact();
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      contacts: [initialValues],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  useEffect(() => {
    setOptions(memberInit?.data);
  }, [memberInit]);

  const self = options?.relationTypes
    .find((item) => item?.name === "Self")
    ?.id.toString();

  const submitHandler = async (data: any) => {
    const requestBody = await data.contacts.map((item: any) => ({
      ...item,
      relType: "Self",
    }));
    const response = await addContact([
      {
        profileId: +id,
        contacts: requestBody,
      },
    ]);
    if (response.status == httpStatus.OK) {
      alert("Contact Added");
    }
  };

  return (
    <form className="w-full p-4" onSubmit={handleSubmit(submitHandler)}>
      <div>
        {fields.map((item, index) => {
          return (
            <div key={item.id}>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
                <Select
                  name={`contacts[${index}].type`}
                  options={selectOptions(options?.contactTypes || [])}
                  register={register}
                  placeholder="Select Contact types"
                  label="Type"
                  required
                />
                <Input
                  name={`contacts[${index}].value`}
                  register={register}
                  label="Value"
                  required
                />
                <div className=" flex items-end">
                  <Button
                    appearance="transparent"
                    type="button"
                    onClick={() => remove(index)}
                    icon={<Dismiss16Filled />}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" flex mt-4 justify-between">
        <Button
          type="button"
          onClick={() => append({ type: "", relType: "Self", value: "" })}
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
