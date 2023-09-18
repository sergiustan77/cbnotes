import SideBar from "@/components/channels-page/SideBar";
import React from "react";

type Props = {};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container  flex gap-12">
      <SideBar className="" />
      <div className=" mt-4"> {children}</div>
    </div>
  );
};

export default layout;
