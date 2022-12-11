import React from "react";
import SidebarLink from "./SidebarLink";

const Sidebar = () => {
  return (
    <aside className="border-r border-r-gray-300 bg-gray-100 ">
      <h1 className="text-center text-lg font-normal">
        Fox River <br />
        Congregational Church
      </h1>
      <SidebarLink icon="home" label="Home" href="/" />
      <SidebarLink icon="person_search" label="Members" href="/members/list" />
    </aside>
  );
};

export default Sidebar;
