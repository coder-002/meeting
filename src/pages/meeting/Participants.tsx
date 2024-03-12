import { TableComp } from "../../components/DataGrid/TableComp";
import Drawer from "../../components/Drawer/Drawer";
import { Badge, Button, Subtitle2 } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import Select from "../../components/form/Select";
import { selectOptions } from "../../helpers/selectOptions";
import {
  useAddParticipant,
  useGetMeeting,
  useGetPartipants,
} from "../../services/service-meeting";
import { useGetAllMember } from "../../services/service-members";
import { IMember } from "../../models/member/member";
import { useState } from "react";
import httpStatus from "http-status";
import Loading from "../../components/Loading";

const Participants = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: meetingData } = useGetMeeting();
  const { data: memberData } = useGetAllMember();
  const { data: participants } = useGetPartipants(id || "");
  const { mutateAsync: addParticipants } = useAddParticipant();
  const { register, handleSubmit, reset } = useForm();

  const selectMember =
    memberData &&
    memberData.map((member: IMember) => {
      return { id: member.id, name: member.memberName };
    });

  const cols = [
    {
      dataKey: "memberId",
      title: "Member Name",
      render: (item: any) => {
        return (
          <>
            {
              memberData?.find((member: IMember) => member.id == item.memberId)
                .memberName
            }
          </>
        );
      },
    },
    {
      dataKey: "attended",
      title: "Attended",
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            // color={item.attended ? "success" : "danger"}
            style={{
              backgroundColor: item.attended ? "primary" : "red",
            }}
            size="large"
          >
            {item.attended ? "Present" : "Absent"}
          </Badge>
        );
      },
    },
  ];

  const submitHandler = async (data: any) => {
    const response = await addParticipants({
      ...data,
      meetingId: id,
      memberId: +data.memberId,
      attended: false,
    });
    if (response.status == httpStatus.CREATED) {
      setIsOpen(!open);
      reset();
    }
  };

  if (!memberData || !meetingData) {
    return <Loading />;
  }

  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Participants">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Select
            name="memberId"
            register={register}
            label="Member Name"
            options={selectOptions(selectMember || [])}
            placeholder="Select Member Name"
            required
          />

          <div className=" flex gap-3 mt-3">
            <Button appearance="primary" type="submit">
              Add
            </Button>
            <Button
              onClick={() => {
                setIsOpen(!open);
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Drawer>

      <div className="p-4 w-full ">
        <Subtitle2>Participants List</Subtitle2>
        <div>
          <TableComp
            columns={cols}
            data={participants || []}
            onAction={() => setIsOpen(!isOpen)}
            btnText="Add"
            onSelect={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

export default Participants;
