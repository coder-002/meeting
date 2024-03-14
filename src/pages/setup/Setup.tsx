import { ReactNode, useEffect, useState } from "react";
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
  People20Filled,
  PositionToBack20Filled,
  Signature16Filled,
} from "@fluentui/react-icons";
import { TrayItemRemove20Filled } from "@fluentui/react-icons/lib/fonts";
import { Navigation_Routes } from "../../routes/routes.constant";
import { useLocation } from "react-router-dom";

const Setup = ({ children }: { children: ReactNode }) => {
  const [selectedValue, setSelectedValue] = useState<TabValue>("organization");
  const { pathname } = useLocation();
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
      url: Navigation_Routes.UNIT,
    },
    {
      id: "4",
      label: "Committee",
      value: "committee",
      icon: <Group20Filled />,
      url: Navigation_Routes.COMMITTEE,
    },
    {
      id: "5",
      label: "Designation",
      value: "designation",
      icon: <PositionToBack20Filled />,
      url: Navigation_Routes.DESIGNATION,
    },
    {
      id: "6",
      label: "Deduction",
      value: "deduction",
      icon: <TrayItemRemove20Filled />,
      url: Navigation_Routes.DEDUCTION,
    },
    {
      id: "7",
      label: "Users",
      value: "user",
      icon: <People20Filled />,
      url: Navigation_Routes.USER,
    },
  ];

  useEffect(() => {
    if (!pathname) return;
    const menu = pathname.split("/")[2];
    setSelectedValue(menu);
  }, [pathname]);
  const handleSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value);
  };
  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="mt-8">
          <TabList
            tabs={tablist}
            onTabSelect={handleSelect}
            selectedValue={selectedValue}
            vertical
          />
        </div>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default Setup;
