import { Divider, Subtitle2 } from "@fluentui/react-components";
import {
  useGetMeeting,
  useGetPartipants,
  useUpdateParticipants,
} from "../../services/service-meeting";
import { useGetAllMember } from "../../services/service-members";
import Loading from "../../components/Loading";
import { IParticipants } from "../../models/meeting";
import { IMember } from "../../models/member/member";
import Switch from "../../components/common/Switch";

const Attended = ({ id }: { id: string }) => {
  const { data: meetingData } = useGetMeeting();
  const { data: memberData } = useGetAllMember();
  const { data: participants } = useGetPartipants(id || "");
  const { mutateAsync: updateAttendance } = useUpdateParticipants();

  const handleSwitchChange = async (switchdata: boolean, updatedId: number) => {
    const filterData = participants?.find(
      (item: IParticipants) => item.id === +updatedId
    );

    if (filterData) {
      await updateAttendance({
        ...filterData,
        attended: switchdata,
      });
    }
  };

  if (!memberData || !meetingData) {
    return <Loading />;
  }

  return (
    <div>
      <div className="p-4 w-full ">
        <Subtitle2>Attendance</Subtitle2>
        <Divider />
        <div>
          {participants.map((item: IParticipants) => {
            const checked = item.attended;
            return (
              <div className="flex p-2 justify-between" key={item.id}>
                {
                  memberData?.find(
                    (member: IMember) => member.id == item.memberId
                  ).memberName
                }
                <Switch
                  value={checked}
                  toggleSwitch={(e) => {
                    handleSwitchChange(e.target.checked, item.id);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Attended;
