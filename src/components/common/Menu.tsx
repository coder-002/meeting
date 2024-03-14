import {
  Button,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
  ToolbarButton,
} from "@fluentui/react-components";
import {
  Apps24Filled,
  Calendar24Filled,
  Home16Filled,
  PeopleAudienceFilled,
  Settings24Filled,
} from "@fluentui/react-icons";
import { Memory16Filled } from "@fluentui/react-icons/lib/fonts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation_Routes } from "../../routes/routes.constant";

export const Menu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpenChange: PopoverProps["onOpenChange"] = (_, data) =>
    setOpen(data.open || false);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <ToolbarButton icon={<Apps24Filled />} />
      </PopoverTrigger>

      <PopoverSurface style={{ maxWidth: "400px" }}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Button
                size="large"
                icon={<Home16Filled style={{ color: "blueviolet" }} />}
                appearance="transparent"
                onClick={() => {
                  setOpen(false);
                  navigate(Navigation_Routes.DASHBOARD);
                }}
              >
                Home
              </Button>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Button
                size="large"
                icon={<PeopleAudienceFilled style={{ color: "blueviolet" }} />}
                appearance="transparent"
                onClick={() => {
                  setOpen(false);
                  navigate(Navigation_Routes.MEETING);
                }}
              >
                Meeting
              </Button>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Button
                size="large"
                icon={<Memory16Filled style={{ color: "burlywood" }} />}
                appearance="transparent"
                onClick={() => {
                  setOpen(false);
                  navigate(Navigation_Routes.MEMBER);
                }}
              >
                Members
              </Button>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Button
                size="large"
                icon={<Calendar24Filled />}
                appearance="transparent"
                onClick={() => {
                  setOpen(false);
                  navigate(Navigation_Routes.CALENDAR);
                }}
              >
                Calendar
              </Button>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Button
                size="large"
                icon={<Settings24Filled style={{ color: "darkgray" }} />}
                appearance="transparent"
                onClick={() => {
                  setOpen(false);
                  navigate(Navigation_Routes.ORGANIZATION);
                }}
              >
                Setup
              </Button>
            </div>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  );
};
