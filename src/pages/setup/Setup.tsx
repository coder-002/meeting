import { ReactNode, useState } from "react";
import TabList from "../../components/form/TabList";
import {
  SelectTabData,
  SelectTabEvent,
  TabValue,
} from "@fluentui/react-components";
import {
  Branch16Filled,
  Group20Filled,
  Organization16Filled,
  PositionToBack20Filled,
  Signature16Filled,
} from "@fluentui/react-icons";
import { TrayItemRemove20Filled } from "@fluentui/react-icons/lib/fonts";
import { Navigation_Routes } from "../../routes/routes.constant";

const Setup = ({ children }: { children: ReactNode }) => {
  const [selectedValue, setSelectedValue] = useState<TabValue>("organization");
  const tablist = [
    {
      id: "1",
      label: "Organization",
      value: "organization",
      icon: <Organization16Filled />,
      url: Navigation_Routes.ORGANIZATION,
    },
    {
      id: "2",
      label: "Branch",
      value: "branch",
      icon: <Branch16Filled />,
      url: Navigation_Routes.BRANCH,
    },
    {
      id: "3",
      label: "Unit",
      value: "Unit",
      icon: <Signature16Filled />,
      url: Navigation_Routes.ORGANIZATION,
    },
    {
      id: "4",
      label: "Committee",
      value: "committee",
      icon: <Group20Filled />,
      url: Navigation_Routes.ORGANIZATION,
    },
    {
      id: "5",
      label: "Designation",
      value: "designation",
      icon: <PositionToBack20Filled />,
      url: Navigation_Routes.ORGANIZATION,
    },
    {
      id: "6",
      label: "Deduction",
      value: "deduction",
      icon: <TrayItemRemove20Filled />,
      url: Navigation_Routes.ORGANIZATION,
    },
  ];
  const handleSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };
  return (
    <div>
      <TabList
        tabs={tablist}
        onTabSelect={handleSelect}
        selectedValue={selectedValue}
        vertical
      />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default Setup;
