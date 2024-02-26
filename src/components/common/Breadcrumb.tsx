import {
  BreadcrumbButton,
  BreadcrumbItem,
  Breadcrumb as FluentBreadcrumb,
  ToolbarDivider,
} from "@fluentui/react-components";
import { useAtom } from "jotai";
import { AppBreadCrumb } from "../../store/store";
import { Menu } from "./Menu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const [breadCrumb] = useAtom(AppBreadCrumb);
  const [menuName, setMenuName] = useState("");

  const { pathname } = useLocation();
  useEffect(() => {
    const app =
      pathname.split("/")[1].charAt(0).toUpperCase() +
      pathname.split("/")[1].slice(1);
    setMenuName(app || "Home");
  }, [pathname]);

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        <Menu />
        <ToolbarDivider />
        <strong>{menuName}</strong>
        <ToolbarDivider />
      </div>
      <FluentBreadcrumb>
        {breadCrumb.map((x) => (
          <>
            <BreadcrumbItem key={x}>
              <BreadcrumbButton>{x}</BreadcrumbButton>
            </BreadcrumbItem>
            {breadCrumb.indexOf(x) !== breadCrumb.length - 1 ? <p>/</p> : null}
          </>
        ))}
      </FluentBreadcrumb>
    </div>
  );
};

export default Breadcrumb;
