import classNames from "classnames";

import { Ring } from "react-css-spinners";

export default function Loader({ className }: { className?: string }) {
  return (
    <div className={classNames(className, "flex justify-center mt-5")}>
      <Ring color="#64748b" size={70} thickness={6} className="mx-auto" />
    </div>
  );
}
