import Link from "next/link";
import Logo from "./Logo";
import { TableDocument } from "iconsax-react";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface MenuItem {
  id: number;
  label: string;
  icon: string;
  link: string;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();

  const wrapperClasses = classNames(
    "h-screen px-4 pt-8 pb-4 flex justify-between flex-col bg-primary z-40 transition-all duration-300",
    "md:relative md:w-80 md:block hidden", // Desktop default
    {
      // Mobile modal style
      "fixed top-0 left-0 w-64 block shadow-xl": isOpen,
    }
  );

  const menuItems: MenuItem[] = [
    { id: 0, label: "Жагсаалт", icon: "HomeIcon", link: "/dashboard" },
    // { id: 1, label: "Жагсаалт", icon: "HomeIcon", link: "/dashboard" },
    // { id: 1, label: "Нэмэх", icon: "People", link: "/add" },
    //   { id: 2, label: "Курс", icon: "Data", link: "/course" },
    //   { id: 3, label: "Мэдэгдэл", icon: "Notification", link: "/notification" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={wrapperClasses}>
        <div className="flex flex-col">
          <div className="flex items-center justify-between relative">
            <Logo />
            {/* Close button for mobile */}
            <button
              className="p-2 rounded bg-light-lighter md:hidden"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col items-start mt-10">
            {menuItems.map((menu, index) => (
              <Link
                href={menu.link}
                key={index}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center py-4 px-3 hover:bg-white/10 rounded text-white">
                  <TableDocument
                    color="#eee"
                    variant="Linear"
                    size={24}
                    className="mr-4"
                  />
                  <span className="text-md font-semibold text-lg">
                    {menu.label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// "use client";
// import classNames from "classnames";
// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import CollapseIcon from "./icons/CollapseIcon";
// import LogoutIcon from "./icons/LogoutIcon";
// // import Logo from "./Logo";
// import {
//   Chart,
//   Data,
//   NotificationBing,
//   People,
//   Profile2User,
//   DocumentText1,
//   EmojiHappy,
//   TableDocument,
// } from "iconsax-react";
// import Logo from "./Logo";

// interface MenuItem {
//   id: number;
//   label: string;
//   icon: string;
//   link: string;
// }

// const menuItems: MenuItem[] = [
//   { id: 0, label: "Жагсаалт", icon: "HomeIcon", link: "/dashboard" },
//   // { id: 1, label: "Жагсаалт", icon: "HomeIcon", link: "/dashboard" },
//   // { id: 1, label: "Нэмэх", icon: "People", link: "/add" },
//   //   { id: 2, label: "Курс", icon: "Data", link: "/course" },
//   //   { id: 3, label: "Мэдэгдэл", icon: "Notification", link: "/notification" },
// ];

// interface SidebarProps {
//   toggleCollapse: boolean;
//   setToggleCollapse: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function Sidebar({
//   toggleCollapse,
//   setToggleCollapse,
// }: SidebarProps) {
//   // const Header = ({ toggleCollapse, setToggleCollapse }: HeaderProps) => {

//   const [isCollapsible, setIsCollapsible] = useState(false);
//   const [activeTab, setActiveTab] = useState<"add" | "list">("list");
//   const pathname = usePathname();

//   const activeMenu = useMemo(
//     () => menuItems.find((menu) => menu.link === pathname),
//     [pathname]
//   );

//   const wrapperClasses = classNames(
//     "h-screen px-4 pt-8 pb-4 flex justify-between flex-col border-r-2 bg-primary",
//     {
//       ["w-80"]: !toggleCollapse,
//       ["w-20"]: toggleCollapse,
//     }
//   );

//   const getIcon = (icon: string) => {
//     if (icon === "Users") return <People size="24" />;
//     if (icon === "People") return <Profile2User size="24" />;
//     if (icon === "Data") return <Data size="24" />;
//     if (icon === "Notification") return <NotificationBing size="24" />;
//     if (icon === "Dashboard") return <Chart size="24" />;
//     if (icon === "HomeIcon") return <DocumentText1 size="24" />;
//   };

//   return (
//     <div
//       className={wrapperClasses}
//       style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
//     >
//       <div className="flex flex-col">
//         <div className="flex items-center justify-between relative">
//           <div className="flex items-center pl-1 gap-4">
//             <div className="cursor-pointer">
//               <Logo className="" />
//             </div>
//           </div>
//           <button
//             className="p-4 rounded bg-light-lighter absolute right-0"
//             onClick={() => setToggleCollapse(!toggleCollapse)}
//           >
//             <CollapseIcon />
//           </button>
//         </div>

//         {/* Mobile Tabs */}
//         {/* <div className="md:hidden flex space-x-4 mb-4 mt-6">
//           <button
//             onClick={() => setActiveTab("add")}
//             className={classNames("px-4 py-2 rounded", {
//               "bg-blue-600 text-white": activeTab === "add",
//             })}
//           >
//             Add
//           </button>
//           <button
//             onClick={() => setActiveTab("list")}
//             className={classNames("px-4 py-2 rounded", {
//               "bg-blue-600 text-white": activeTab === "list",
//             })}
//           >
//             List
//           </button>
//         </div> */}

//         {/* Navigation Menu */}
//         <div className="flex flex-col items-start mt-10">
//           {menuItems.map((menu, index) => (
//             <div
//               key={index}
//               className={classNames(
//                 "flex items-center cursor-pointer hover:bg-white/10 rounded w-full overflow-hidden whitespace-nowrap mb-2 text-white",
//                 { "bg-white/10 text-white": activeMenu?.id === menu.id }
//               )}
//             >
//               <Link href={menu.link}>
//                 <div className="flex py-4 px-3 items-center h-full">
//                   {/* <div style={{ width: "2.5rem" }}>{getIcon(menu.icon)}</div> */}
//                   {/* <DocumentText1 size="24" /> */}
//                   <TableDocument
//                     color="#eee"
//                     variant="Linear"
//                     size={24}
//                     className="mr-4"
//                   />

//                   {!toggleCollapse && (
//                     <span className="text-md font-semibold text-lg ">
//                       {menu.label}
//                     </span>
//                   )}
//                 </div>
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
