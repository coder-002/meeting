import {
  Input,
  Toolbar,
  ToolbarDivider,
} from "@fluentui/react-components";
import { Search16Regular } from "@fluentui/react-icons";
import Breadcrumb from "./Breadcrumb";
import User from "./User";
import ThemeSelector from "./ThemeSelector";
import { NotificationComp } from "../NotificationComp";

const Header = () => {
  return (
    <div className="flex justify-between shadow-md">
      <Breadcrumb />
      <Toolbar>
        <Input
          size="medium"
          placeholder="Search..."
          contentAfter={<Search16Regular />}
          style={{ border: 0 }}
        />
        <ToolbarDivider />
        <NotificationComp />
        <ToolbarDivider />
        <ThemeSelector />
        <ToolbarDivider />
        <User />
      </Toolbar>
    </div>
  );
};

export default Header;
