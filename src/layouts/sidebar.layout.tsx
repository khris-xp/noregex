import Sidebar from "@/components/Sidebar";
import { Fragment } from "react";

export default function SidebarLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <main>{children}</main>
      </div>
    </Fragment>
  );
}
