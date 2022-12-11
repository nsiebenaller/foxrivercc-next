import Link from "next/link";
import React from "react";

type Props = {
  icon: string;
  label: string;
  href: string;
};
const SidebarLink: React.FC<Props> = ({ icon, label, href }) => {
  return (
    <Link href={href}>
      <div className="my-1 mx-2 grid cursor-pointer auto-cols-min grid-flow-col gap-2 rounded-full px-4 py-1 text-gray-500 hover:bg-gray-200 hover:text-black">
        <span className="material-symbols-outlined">{icon}</span>
        <div>{label}</div>
      </div>
    </Link>
  );
};

export default SidebarLink;
