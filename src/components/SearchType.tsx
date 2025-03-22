import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";
import { Ring } from "react-css-spinners";
import { Add, Edit, Sort, Trash } from "iconsax-react";

export default function SearchType({
  value,
  setValue,
  className,
  label,
}: {
  value: string;
  setValue(arg: string): void;
  className?: string;
  label?: string;
}) {
  //   console.log("data :>> ", data);

  const inputClass =
    "w-80 inline  px-4 py-3 h-14 border  rounded-xl font-semibold    focus:border-primary text-text-primary font-regular text-18 placeholder-shown:font-regular resize-none overflow-hidden outline-0  border flex";

  const hideClass = " top-2.5 right-2 flex items-center  text-text-secondary";

  return (
    <div className={classNames(className, "w-80 relative  flex items-center")}>
      <input
        type={"text"}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={inputClass}
        maxLength={label === "Утасны дугаар" ? 8 : undefined}
        placeholder={label}
      />
      {value !== "" && (
        <Add
          onClick={() => setValue("")}
          size="36"
          className={classNames(hideClass, "rotate-45  cursor-pointer ")}
          // className={hideClass}
        />
        // <button
        //   type="button"
        //   onClick={() => setValue("")}
        //   className={hideClass}
        // >
        //   {/* {showPassword ? "Hide" : "Show"}
        // sdsds */}
        //   asdsd
        // </button>
      )}
    </div>
    // <div
    //   className={classNames(
    //     className,
    //     "flex items-center  p-3 border rounded "
    //   )}
    // >
    //   <div>{label}</div>
    //   <div className="h-6 w-px border mx-6 " />
    //   <input
    //     type="text"
    //     placeholder={label}
    //     className="text-16"
    //     value={value}
    //     onChange={(e) => setValue(e.target.value)}
    //   />
    // </div>
  );
}
