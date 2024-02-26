import { ReactNode } from "react";
import Header from "../common/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
