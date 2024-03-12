import { TableComp } from "../../components/DataGrid/TableComp";
import Drawer from "../../components/Drawer/Drawer";
import { Badge, Button } from "@fluentui/react-components";
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
import { IMeeting } from "../../models/meeting";

const Participants = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: meetingData } = useGetMeeting();
  // const { mutateAsync: getMember, isLoading } = useGetMember();
  const { data: memberData } = useGetAllMember();
  const { data: participants } = useGetPartipants(id || "");
  const { mutateAsync: addParticipants } = useAddParticipant();
  const { register, handleSubmit } = useForm();

  const selectMember =
    memberData &&
    memberData.map((member: IMember) => {
      return { id: member.id, name: member.memberName };
    });

  const cols = [
    {
      dataKey: "meetingId",
      title: "Meeting Topic",
      render: (item: any) => {
        return (
          <>
            {
              meetingData?.find(
                (meeting: IMeeting) => meeting.id == item.meetingId
              ).topic
            }
          </>
        );
      },
    },
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
      title: "Description",
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            // color={item.attended ? "success" : "danger"}
            style={{
              backgroundColor: item.isActive ? "primary" : "red",
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
      attended: true,
    });
    if (response.status == httpStatus.OK) {
      alert("Added Successfully");
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

      <TableComp
        columns={cols}
        data={participants || []}
        onAction={() => setIsOpen(!isOpen)}
        btnText="Add Participants"
        onSelect={() => {}}
      />
    </div>
  );
};

export default Participants;
