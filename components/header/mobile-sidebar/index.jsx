"use client";

import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";

import mobileMenuData from "../../../data/mobileMenuData";
import employerMenuData from "@/data/employerMenuData";

import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";


const Index = () => {

  const router = useRouter()


  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}


      <Sidebar>
        <Menu>
          {employerMenuData.map((item,i) => (
            <MenuItem
              onClick={() => router.push(item.routePath)}
              className={
                isActiveLink(item.routePath, usePathname())
                  ? "menu-active-link"
                  : ""
              }
              key={i}
            // routerLink={<Link href={menuItem.routePath} />}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </Sidebar>


      <SidebarFooter />
    </div>
  );
};

export default Index;