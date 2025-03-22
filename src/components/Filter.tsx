// import { useCallback, useEffect, useState } from "react";
// import classNames from "classnames";
// import { Ring } from "react-css-spinners";
// import { Edit, Sort, Trash } from "iconsax-react";
// import Button from "./Button";
// import { useAuth } from "../../context/AuthContext";
// import { RefData } from "../../@types/main";

// export default function Filter({
//   code,
//   className,
//   selected,
//   setSelected,
//   open,
//   setOpen,
// }: {
//   code: string;
//   className?: string;
//   selected: RefData | null;
//   setSelected(arg: RefData | null): void;
//   open: string;
//   setOpen(arg: string): void;
// }) {
//   const { auth } = useAuth();

//   const [data, setData] = useState<RefData[]>([]);

//   const fetchData = useCallback(async () => {
//     try {
//       await auth
//         .post(`/ref-data/list?parent_code=${code}`, undefined, false, "GET")
//         .then(async (response) => {
//           console.log("response ref-data/list :>> ", response);
//           setData(response.items);
//           //   setData(response.items);
//           //   setLoad(false);
//           //  setBannerData(resp?.items);
//         })
//         .catch((e) => {
//           console.log("e", e);
//           // if (e?.msg && e.msg.length > 0) {
//           //   setAlertData((existingValues) => ({
//           //     ...existingValues,
//           //     title: "Анхааруулга",
//           //     body: e?.msg[0],
//           //     type: "error",
//           //     isShow: true,
//           //   }));
//           // }
//         });
//     } catch (error) {
//       console.log("error :>> ", error);
//     }
//     // console.log("userParse. :>> ", JSON.parse(user));
//   }, [auth, code]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   //   console.log("data :>> ", data);

//   return (
//     <div className={classNames(className, "relative inline-block")}>
//       <Button
//         className="flex-row flex items-center"
//         onClick={() => {
//           setOpen(code);
//           //   setEditData(null);
//           //   setShowModal(true);
//         }}
//         second
//       >
//         <div className="mr-2 text-16">
//           {selected === null
//             ? code === "RANK"
//               ? "Зэрэг"
//               : code === "LESSON_USER_STATUS"
//               ? "Төлөв"
//               : "Дүр"
//             : selected.name}
//         </div>
//         <Sort size="24" />
//       </Button>
//       {open === code && (
//         <div
//           className=" absolute right-0 mt-2 w-60  rounded-2xl shadow-lg bg-white focus:outline-none px-3 py-3 border"
//           aria-orientation="vertical"
//           aria-labelledby="menu-button"
//         >
//           <div role="none" className="">
//             <button
//               className="text-text-secondary px-2 py-3 inline-flex hover:bg-primary/10 hover:text-primary w-full rounded-md mt-1"
//               onClick={() => {
//                 setSelected(null);
//                 setOpen("");
//               }}
//             >
//               <div className="font-regular ">Бүгд</div>
//             </button>
//           </div>
//           {data?.map((item, index) => {
//             return (
//               <div key={index} role="none" className="">
//                 <button
//                   className={classNames(
//                     "text-text-secondary px-2 py-3 inline-flex hover:bg-primary/10 hover:text-primary w-full rounded-md mt-1"
//                     // selected === item ? "bg-primary text-white" : ""
//                   )}
//                   onClick={() => {
//                     setSelected(item);
//                     setOpen("");
//                   }}
//                 >
//                   <div className="font-regular ">{item.name}</div>
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }
