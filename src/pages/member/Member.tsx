import { useEffect, useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import Drawer from "../../components/Drawer/Drawer";
import Input from "../../components/form/Input";
import {
  Button,
  Divider,
  Spinner,
  Subtitle1,
} from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import {
  useAddMember,
  useGetMember,
  useMemberInit,
} from "../../services/service-members";
import { useGetBranch } from "../../services/setup/service-branch";
import { IBranch } from "../../models/setup/branch";
import Select from "../../components/form/Select";
import { selectOptions } from "../../helpers/selectOptions";
import { IOptions, IPostMember } from "../../models/member/member";
import httpStatus from "http-status";

const Member = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState<IOptions>();
  const { data: memberInit } = useMemberInit();
  const { mutateAsync: getMember, isLoading } = useGetMember();
  const { mutateAsync: addMember } = useAddMember();
  const { data: branchData } = useGetBranch();
  const { register, handleSubmit } = useForm();
  const selectBranch =
    branchData &&
    branchData.map((item: IBranch) => {
      return { id: item.id, name: item.branchName };
    });

  useEffect(() => {
    async function getData() {
      const data = await getMember({
        pageNumber: 1,
        pageSize: 100,
        searchText: "",
      });
      setData(data.data.data);
    }
    getData();
  }, []);

  useEffect(() => {
    console.log(memberInit);
    setOptions(memberInit?.data);
  }, [memberInit]);

  const cols = [
    { dataKey: "memberCode", title: "Member Code" },
    { dataKey: "memberName", title: "Member Name" },
    {
      dataKey: "branchId",
      title: "Branch Name",
      render: (item: any) => {
        return (
          <>
            {
              branchData?.find((branch: IBranch) => branch.id == item?.branchId)
                ?.branchName
            }
          </>
        );
      },
    },
    { dataKey: "groupName", title: "Group Name" },
    { dataKey: "introducedOn", title: "Introduced On" },
    { dataKey: "address", title: "Address" },
    { dataKey: "contact", title: "Contact" },
  ];
  // const submitHandler = async (data: IPostMember) => {
  //   const requestbody = { ...data };
  //   const response = await addMember(requestbody);
  //   if (response.status === httpStatus.OK) {
  //     alert("success");
  //   }
  //   console.log(data);
  // };
  if (!branchData || !memberInit || isLoading) {
    return <Spinner size="large" />;
  }
  return (
    <div>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add member"
        size="lg"
      >
        <form onSubmit={() => {}}>
          <div className=" flex flex-col gap-3 mt-3">
            <div className="grid lg:grid-cols-2 md:grid-cols-1">
              <div>
                <Subtitle1>Member Info</Subtitle1>
                <Input
                  name="memberCode"
                  register={register}
                  required
                  label="Member Code"
                />
                <Input
                  name="memberName"
                  register={register}
                  required
                  label="Member Name"
                />
                <Input
                  name="accountNo"
                  register={register}
                  required
                  label="Account Number"
                />
                <Select
                  name="branchId"
                  register={register}
                  label="Branch Name"
                  options={selectOptions(selectBranch || [])}
                  placeholder="Select Branch Name"
                  required
                />
                <Input
                  name="address"
                  register={register}
                  required
                  label="Address"
                />
                <Input
                  name="homeAddress"
                  register={register}
                  required
                  label="Home Address"
                />
                <Input
                  name="contact"
                  register={register}
                  required
                  label="Contact"
                />
              </div>
              <div>
                <Subtitle1>Personal Info</Subtitle1>
                <Select
                  name="salutation"
                  register={register}
                  label="Salutation"
                  options={selectOptions(options?.salutationTypes || [])}
                  placeholder="Please select Salutation"
                  required
                />
                memberInit
                <Input
                  name="firstName"
                  register={register}
                  required
                  label="First Name"
                />
                <Input
                  name="middleName"
                  register={register}
                  label="Middle Name"
                />
                <Input
                  name="lastName"
                  register={register}
                  required
                  label="Last Name"
                />
                <Input
                  name="dobNp"
                  register={register}
                  required
                  label="Date of Birth"
                  type="date"
                />
                <Select
                  name="gender"
                  register={register}
                  label="Gender"
                  options={selectOptions(options?.genderTypes || [])}
                  placeholder="Please select gender"
                  required
                />
                <Select
                  name="maritalStatus"
                  register={register}
                  label="Marital Status"
                  options={selectOptions(options?.maritalStatusTypes || [])}
                  placeholder="Please select Marital Status"
                  required
                />
                <Input
                  name="pan"
                  register={register}
                  required
                  label="PAN No."
                />
              </div>
            </div>
            <Divider />
            <div className="flex flex-col gap-3">
              <Button appearance="primary" type="submit">
                Create
              </Button>
              <Button onClick={() => setIsOpen(!open)}>Cancel</Button>
            </div>
          </div>
        </form>
      </Drawer>
      <TableComp
        columns={cols}
        data={data || []}
        onAction={() => setIsOpen(!isOpen)}
        btnText="Add Member"
      />
    </div>
  );
};

export default Member;
