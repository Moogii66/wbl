// "use client";
// import React from "react";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

// const Layout = ({ children }: any) => {
//   return (
//     <div className="h-screen w-screen flex flex-row justify-start">
//       <Sidebar />
//       <div className="bg-white flex-1  text-text">
//         <Header />
//         <div className="">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default Layout;

"use client";
import React from "react";
// import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className="h-screen w-screen flex flex-row justify-start overflow-hidden">
      <div className=" h-full">
        <Sidebar />
      </div>

      <div className="flex-1 bg-background">
        {/* <div className=" w-full z-10">
          <Header />
        </div> */}

        <div className=" overflow-scroll h-full scrollbar-hide mb-80">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
