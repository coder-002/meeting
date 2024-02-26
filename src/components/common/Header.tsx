import {
  Input,
  Toolbar,
  ToolbarButton,
  ToolbarDivider,
} from "@fluentui/react-components";
import {
  Alert24Regular,
  Search16Regular,
  SignOut24Regular,
} from "@fluentui/react-icons";
import { logOut } from "../../services/authService";
import Breadcrumb from "./Breadcrumb";

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
        <ToolbarButton
          style={{ color: "#003060" }}
          icon={<SignOut24Regular />}
          onClick={logOut}
        ></ToolbarButton>
      </Toolbar>
    </div>
  );
};

export default Header;
