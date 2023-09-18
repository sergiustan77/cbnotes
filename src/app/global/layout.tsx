import GlobalSidebarMenu from "@/components/global-page/GlobalSidebarMenu";
import React from "react";

interface GlobalLayoutProps {
  children: React.ReactNode;
  params: { id: string };
}

const layout = ({ children, params: { id } }: GlobalLayoutProps) => {
  const globalSideBarItems = [
    {
      title: "Web Development",
      href: `/global/topics/web_development`,
    },
    {
      title: "IT",
      href: `/global/topics/it`,
    },
    {
      title: "New Tech",
      href: `/global/topics/new_tech`,
    },
    {
      title: "Crypto",
      href: `/global/topics/crypto`,
    },
    {
      title: "Breakthrough",
      href: `/global/topics/breakthrough`,
    },
  ];
  return (
    <div className="container mt-8 flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside className="-mx-4 lg:w-1/5">
        <GlobalSidebarMenu items={globalSideBarItems} />
      </aside>
      <div className="flex-1 lg:max-w-4xl">{children}</div>
    </div>
  );
};

export default layout;
