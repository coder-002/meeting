import { useForm } from "react-hook-form";
import Input from "../form/Input";
import { Button, Divider, Subtitle2 } from "@fluentui/react-components";
import Select from "../form/Select";
import { useEffect, useState } from "react";
import { IOptions } from "../../models/member/member";
import { useMemberInit } from "../../services/service-members";
import { selectOptions } from "../../helpers/selectOptions";
import { Addresss } from "../../models/member/memberDetails";
import { useAddAddress } from "../../services/memberDetails.ts/service-address";
import httpStatus from "http-status";

const initialValues = [
  {
    type: "",
    relType: "",
    street: "",
    toleName: "",
    mnVdc: "",
    ward: 0,
    districtId: 0,
    country: "",
    houseNo: "",
    landlord: "",
    landlordContact: "",
  },
];

const AddressForm = ({ id }: { id: string }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: initialValues,
  });
  const [options, setOptions] = useState<IOptions>();
  const { data: memberInit } = useMemberInit();
  const { mutateAsync: addAddress } = useAddAddress();

  useEffect(() => {
    setOptions(memberInit?.data);
  }, [memberInit]);

  const submitHandler = async (data: any) => {
    const response = await addAddress({ profileId: +id, ...data });
    if (response.status == httpStatus.OK) {
      alert("Address Added");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="w-full flex flex-col gap-4"
    >
      <Subtitle2>Permanent Address</Subtitle2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
        <Select
          name={"addresses[0].type"}
          options={selectOptions(options?.addressTypes || [])}
          register={register}
          label="Type"
          required
          placeholder="Select an address type"
        />
        <Select
          name={"addresses[0].relType"}
          options={selectOptions(options?.relationTypes || [])}
          register={register}
          label="Relation Type"
          required
          placeholder="Select an realtion type"
        />

        <Input
          register={register}
          label="Ward"
          name="addresses[0].ward"
          type="number"
          required
        />
        <Input
          register={register}
          label="House number"
          name="addresses[0].houseNo"
          type="number"
        />
        <Input
          register={register}
          label="Street name"
          name="addresses[0].street"
          required
        />
        <Input
          register={register}
          label="Tole name"
          name="addresses[0].toleName "
        />
        <Input
          register={register}
          label="Municipality / VDC"
          name="addresses[0].mnVdc"
          required
        />
        <Input
          register={register}
          label="District Id"
          name="addresses[0].districtId"
          required
        />
        <Input
          register={register}
          label="Country"
          name="addresses[0].country"
          required
        />
      </div>
      <Subtitle2>Temporary Address</Subtitle2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full">
        <Select
          name={"addresses[1].type"}
          options={selectOptions(options?.addressTypes || [])}
          register={register}
          label="Type"
          required
          placeholder="Select an address type"
        />
        <Select
          name={"addresses[1].relType"}
          options={selectOptions(options?.relationTypes || [])}
          register={register}
          label="Relation Type"
          required
          placeholder="Select an realtion type"
        />
        <Input
          register={register}
          label="Ward"
          name="addresses[1].ward"
          type="number"
          required
        />
        <Input
          register={register}
          label="House number"
          name="addresses[1].houseNo"
          type="number"
        />
        <Input
          register={register}
          label="Street name"
          name="addresses[1].street"
          required
        />
        <Input
          register={register}
          label="Tole name"
          name="addresses[1].toleName "
        />
        <Input
          register={register}
          label="Municipality / VDC"
          name="addresses[1].mnVdc"
          required
        />
        <Input
          register={register}
          label="District Id"
          name="addresses[1].districtId"
          required
        />
        <Input
          register={register}
          label="Country"
          name="addresses[1].country"
          required
        />
        <Input
          register={register}
          label="Landlord"
          name="addresses[1].landlord"
        />
        <Input
          register={register}
          label="Landlord Contact"
          name="addresses[1].landlordContact"
        />
      </div>
      <Divider />
      <div className="mt-3 flex justify-end gap-4">
        <Button appearance="primary" type="submit" >
          Save
        </Button>
        <Button>Cancel</Button>
      </div>
    </form>
  );
};

export default AddressForm;
