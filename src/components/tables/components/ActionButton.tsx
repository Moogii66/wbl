import { ReactNode } from "react";

import classNames from "classnames";

export default function ActionButton({
  onClick,
  children,
  className,
}: {
  onClick: () => void;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={classNames(
        className,
        "p-2 rounded-md bg-primary  hover:bg-primary/85 text-white hover:text-white"
      )}
    >
      {children}
    </div>
  );
}
