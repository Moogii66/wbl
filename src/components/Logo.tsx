import Image from "next/image";
import React from "react";

import logo from "../../public/logo.png";

const Logo = ({ width, className }: { width?: number; className?: string }) => {
  return (
    <Image
      src={logo}
      alt="LMS Logo"
      // className="dark:invert"
      width={width ? width : 200}
      height={2}
      className={className}
      // priority
      // className="border hover:selection:first-letter:first-line"
    />
  );
};

export default Logo;
