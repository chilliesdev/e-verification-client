import { IoMdSchool } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import StyledLink from "./StyledLink";

export default function Sidebar() {
  return (
    <aside className="w-64" aria-label="Sidebar">
      <div className="pt-4 h-screen overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
        <ul className="space-y-2">
          <SidebarItem link="/student" Icon={IoMdSchool}>
            Students
          </SidebarItem>
          <SidebarItem link="/user" Icon={RiAdminFill}>
            Admin
          </SidebarItem>
          <SidebarItem link="/logout" Icon={FaSignOutAlt}>
            Logout
          </SidebarItem>
        </ul>
      </div>
    </aside>
  );
}

function SidebarItem({ link, Icon, children }) {
  return (
    <li>
      <StyledLink
        href={link}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <>
          <Icon />
          <span className="ml-3">{children}</span>
        </>
      </StyledLink>
    </li>
  );
}
