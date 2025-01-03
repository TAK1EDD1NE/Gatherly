import { Img, Heading } from "./..";
import React from "react";
import { MenuItem, Menu, Sidebar, sidebarClasses } from "react-pro-sidebar";

export default function Sidebar2({ ...props }) {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Sidebar
      {...props}
      width="242px !important"
      collapsedWidth="80px !important"
      collapsed={collapsed}
      rootStyles={{ [`.\${sidebarClasses.container}`]: { gap: 26 } }}
      className={`${props.className} flex flex-col h-screen pt-[22px] gap-[26px] top-0 sm:pt-5 bg-[#ffffff] !sticky overflow-auto`}
    >
      <div className="flex self-stretch px-5 mx-11">
        <Img src="images/img_sidebar_logo.png" alt="Sidebarlogo" className="h-[30px] w-[84px] object-contain" />
      </div>
      <Menu
        menuItemStyles={{
          button: {
            padding: "10px 10px 10px 40px",
            gap: "19px",
            alignSelf: "stretch",
            color: "#202224",
            fontWeight: 600,
            fontSize: "14px",
            [`&:hover, &.ps-active`]: { backgroundColor: "#ffffff !important", color: "#f361e9"}, // Corrected hover styles
          },
        }}
        className="self-stretch w-full pb-4"
      >
        <div>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[22px]" />}>
            Dashboard
          </MenuItem>
          <MenuItem icon={<Img src="images/img_thumbs_up.svg" alt="Thumbsup" className="h-[30px] w-[16px]" />}>
            Salle {/* Changed label to Salle */}
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[16px]" />}>
            To-Do
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[22px]" />}>
            Inbox
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[20px]" />}>
            Order Lists
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[18px]" />}>
            Product Stock
          </MenuItem>
        </div>
        <div className="mt-4 h-px bg-[#e0e0e0]" />
        <div className="flex flex-col items-start">
          <Heading
            size="headings"
            as="p"
            className="ml-10 mt-3.5 text-[12px] font-bold tracking-[0.26px] !text-[#20222499]"
          >
            PAGES
          </Heading>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[22px]" />}>
            Pricing
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[16px]" />}>
            Calender
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[22px]" />}>
            Favorites
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[22px]" />}>
            Contact
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[22px]" />}>
            Invoice
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[22px]" />}>
            UI Elements
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[16px]" />}>
            Team
          </MenuItem>
          <MenuItem icon={<Img src="images/img_megaphone.svg" alt="Megaphone" className="h-[30px] w-[16px]" />}>
            Table
          </MenuItem>
        </div>
        <div className="mt-[30px] h-px bg-[#e0e0e0]" /> {/* Corrected div */}
      </Menu>
    </Sidebar>
  );
}