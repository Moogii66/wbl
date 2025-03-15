import { DocumentText1, People } from "iconsax-react";
import * as React from "react";
import {
  IoCalendar,
  IoDocumentOutline,
  IoNotificationsOutline,
} from "react-icons/io5";

export default function UsersIcon({ fill = "#6C7281", ...rest }) {
  return (
    // <DocumentText1 size="24" color={fill} />
    <People size="24" color={fill} />
    // <IoCalendar size={30} color="" />
    // <svg
    //   width={24}c
    //   height={24}
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   xmlns="http://www.w3.org/2000/svg"
    //   {...rest}
    // >
    //   <path
    //     d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1.001 1.001 0 00.707-1.707l-9-9a1 1 0 00-1.414 0l-9 9A1 1 0 003 13zm7 7v-5h4v5h-4zm2-15.586l6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z"
    //     fill={fill}
    //   />
    // </svg>
  );
}
