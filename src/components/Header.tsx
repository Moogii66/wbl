import { HambergerMenu } from "iconsax-react";

interface HeaderProps {
  onOpenSidebar: () => void;
}

const Header = ({ onOpenSidebar }: HeaderProps) => {
  return (
    <div className="bg-white flex justify-between h-20 p-4 items-center">
      {/* Sidebar Toggle on Mobile */}
      <div className="md:hidden">
        <button onClick={onOpenSidebar} className="p-2 rounded  text-primary">
          <HambergerMenu color="#3c164c" variant="Linear" size={24} />
        </button>
      </div>
    </div>
  );
};

export default Header;

// "use client";
// import React from "react";

// import { Edit2 } from "iconsax-react";

// interface HeaderProps {
//   toggleCollapse: boolean;
//   setToggleCollapse: React.Dispatch<React.SetStateAction<boolean>>;
// }

// export default function Header({
//   toggleCollapse,
//   setToggleCollapse,
// }: HeaderProps) {
//   return (
//     <div className=" bg-white flex justify-end h-20 p-4">
//       <div className="md:hidden">
//         <button
//           onClick={() => setToggleCollapse(!toggleCollapse)}
//           className="p-2 rounded bg-light-lighter"
//         >
//           <Edit2 color="red" variant="Linear" size={20} />
//         </button>
//       </div>
//     </div>
//   );
// }
