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
import { IOptions } from "../../models/member/member";
import { Edit16Filled } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { Navigation_Routes } from "../../routes/routes.constant";
import httpStatus from "http-status";
import Loading from "../../components/Loading";

const Member = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [options, setOptions] = useState<IOptions>();
  const { data: memberInit } = useMemberInit();
  const { mutateAsync: addMember } = useAddMember();
  const { mutateAsync: getMember, isLoading } = useGetMember();
  // const { data: singleMember } = useGetMemberById(updateId);
  const { data: branchData } = useGetBranch();
  const navigate = useNavigate();
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
  const submitHandler = async (data: any) => {
    const requestBody = {
      ...data,
      memberType: "Personal",
      branchCode: branchData.find((item: IBranch) => item.id == data.branchId)
        ?.branchCode,
      branchId: +data.branchId,
      reportingBranchId: +data.reportingBranchId,
    };

    const response = await addMember(requestBody);
    if (response.status === httpStatus.OK) {
      alert("success");
    }

    console.log(response.status);
  };

  const handleSelect = (item: any) => {
    setEdit(true);
    setUpdateId(item?.id);
  };

  const handleAddDetails = () => {
    navigate(Navigation_Routes.MEMBER_DETAILS.replace(":id", updateId));
  };
  if (!branchData || !memberInit || isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Drawer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Add member"
        size="lg"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
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
                <Input
                  name="introducedOn"
                  register={register}
                  required
                  label="Introduced On"
                  type="date"
                />
                <Select
                  name="branchId"
                  register={register}
                  label="Branch Name"
                  options={selectOptions(selectBranch || [])}
                  placeholder="Select Branch Name"
                  required
                />

                <Select
                  name="reportingBranchId"
                  register={register}
                  label="Reporting Branch"
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
                <Select
                  name="profileRisk"
                  register={register}
                  label="Profile Risk"
                  options={selectOptions(options?.riskCategoryTypes || [])}
                  placeholder="Please select profile risk"
                  required
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
      <div className="relative">
        {edit && (
          <div className="flex gap-4 absolute top-0 right-0">
            <Button
              icon={<Edit16Filled />}
              appearance="primary"
              onClick={handleAddDetails}
            >
              Add Details
            </Button>
          </div>
        )}
        <TableComp
          columns={cols}
          data={data || []}
          onAction={() => setIsOpen(!isOpen)}
          btnText="Add Member"
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
};

export default Member;
