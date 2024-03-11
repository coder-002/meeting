import {
  Input,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";
import { Alert24Regular, Search16Regular } from "@fluentui/react-icons";
import Breadcrumb from "./Breadcrumb";
import User from "./User";
import ThemeSelector from "./ThemeSelector";

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
        <ToolbarButton icon={<Alert24Regular />}></ToolbarButton>
        <ToolbarDivider />
        <ThemeSelector />
        <ToolbarDivider />
        <User />
      </Toolbar>
    </div>
  );
};

export default Header;
