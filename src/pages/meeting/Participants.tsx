import { useEffect, useState } from "react";
import { TableComp } from "../../components/DataGrid/TableComp";
import Drawer from "../../components/Drawer/Drawer";
import { Badge, Button } from "@fluentui/react-components";
import { useForm } from "react-hook-form";
import Select from "../../components/form/Select";
import { selectOptions } from "../../helpers/selectOptions";
import {
  useGetMeeting,
  useGetPartipants,
} from "../../services/service-meeting";
import { IMeeting } from "../../models/meeting";
import { useGetMember } from "../../services/service-members";
import { IMember } from "../../models/member/member";
import Loading from "../../components/Loading";
import { useParams } from "react-router-dom";

const Participants = () => {
  const { meetingId: id } = useParams();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { data: meetingData } = useGetMeeting();
  const { mutateAsync: getMember, isLoading } = useGetMember();
  const { data: participants } = useGetPartipants(id || "");
  const { register, handleSubmit } = useForm();
  const selectMeeting =
    meetingData &&
    meetingData.map((meeting: IMeeting) => {
      return { id: meeting.id, name: meeting.topic };
    });

  const selectMember = data.map((member: IMember) => {
    return { id: member.id, name: member.memberName };
  });
  const cols = [
    {
      dataKey: "meetingId",
      title: "Meeting Topic",
    },
    {
      dataKey: "memberId",
      title: "Member Name",
    },
    {
      dataKey: "attended",
      title: "Description",
      render: (item: any) => {
        return (
          <Badge
            appearance="filled"
            color={item.attended ? "success" : "warning"}
            size="large"
          >
            {item.attended ? "Complete" : "Process"}
          </Badge>
        );
      },
    },
  ];

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

  const submitHandler = () => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Drawer isOpen={isOpen} setIsOpen={setIsOpen} title="Add Participants">
        <form onSubmit={handleSubmit(submitHandler)}>
          <Select
            name="meetingId"
            register={register}
            label="Meeting Topic"
            options={selectOptions(selectMeeting || [])}
            placeholder="Select Meeting Name"
            required
          />
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
