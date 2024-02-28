import {
  Button,
  DrawerBody,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
} from "@fluentui/react-components";
import { Dismiss16Regular } from "@fluentui/react-icons";

import { ReactNode } from "react";
interface IDrawerProps {
  isOpen: boolean;
  title: string;
  setIsOpen: Function;
  children: ReactNode;
  size?: string;
}

const Drawer = ({ isOpen, setIsOpen, children, title, size }: IDrawerProps) => {
  return (
    <OverlayDrawer
      open={isOpen}
      onOpenChange={(_, { open }) => setIsOpen(open)}
      position="end"
      style={size === "lg" ? { width: "60vw" } : { width: "500px" }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss16Regular />}
              onClick={() => setIsOpen(false)}
            />
          }
        >
          {title}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>{children}</DrawerBody>
    </OverlayDrawer>
  );
};

export default Drawer;
