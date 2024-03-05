import {
  Avatar,
  Button,
  Popover,
  PopoverProps,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation_Routes } from "../../routes/routes.constant";
import { Home16Filled, SignOut24Regular } from "@fluentui/react-icons";
import { logOut } from "../../services/authService";
import { Person24Filled } from "@fluentui/react-icons/lib/fonts";

const User = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpenChange: PopoverProps["onOpenChange"] = (e, data) =>
    setOpen(data.open || false);
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger>
        <Avatar badge={{ status: "available" }} />
      </PopoverTrigger>

      <PopoverSurface style={{ maxWidth: "400px" }}>
        <div className="ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Button
                size="large"
                icon={<Person24Filled style={{ color: "blueviolet" }} />}
                appearance="transparent"
                onClick={() => {
                  setOpen(false);
                  navigate(Navigation_Routes.PROFILE);
                }}
              >
                Profile
              </Button>
            </div>
            <div className="ms-Grid-col ms-sm12 ms-md6">
              <Button
                size="large"
                icon={<SignOut24Regular style={{ color: "blueviolet" }} />}
                appearance="transparent"
                onClick={() => {
                  setOpen(false);
                  logOut();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </PopoverSurface>
    </Popover>
  );
};

export default User;
