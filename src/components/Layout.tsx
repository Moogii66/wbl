"use client";
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }: any) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [toggleCollapse, setToggleCollapse] = useState(false);

  // console.log("toggleCollapse :>> ", toggleCollapse);

  return (
    <div className="h-screen w-screen flex flex-row justify-start overflow-hidden relative">
      {/* Sidebar - Show as modal on mobile */}
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        toggleCollapse={toggleCollapse}
        setToggleCollapse={setToggleCollapse}
      />

      {/* Main Content */}
      <div className="flex-1 bg-backgroundLight">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />
        <div className="overflow-scroll h-full scrollbar-hide mb-80">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;

// // "use client";
// // import React from "react";
// // import Sidebar from "./Sidebar";
// // import Header from "./Header";

// // const Layout = ({ children }: any) => {
// //   return (
// //     <div className="h-screen w-screen flex flex-row justify-start">
// //       <Sidebar />
// //       <div className="bg-white flex-1  text-text">
// //         <Header />
// //         <div className="">{children}</div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Layout;

// "use client";
// import React, { useState } from "react";
// // import Header from "./Header";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// const Layout = ({ children }: any) => {
//   const [toggleCollapse, setToggleCollapse] = useState(false);

//   return (
//     <div className="h-screen w-screen flex flex-row justify-start overflow-hidden">
//       <div className=" h-full">
//         <Sidebar
//           toggleCollapse={toggleCollapse}
//           setToggleCollapse={setToggleCollapse}
//         />
//       </div>

//       <div className="flex-1 bg-backgroundLight">
//         <div className=" w-full z-10">
//           <Header
//             toggleCollapse={toggleCollapse}
//             setToggleCollapse={setToggleCollapse}
//           />
//         </div>

//         <div className=" overflow-scroll h-full scrollbar-hide mb-80">
//           {children}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
