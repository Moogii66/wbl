import { ReactNode } from "react";

import classNames from "classnames";

export default function CustomPagination({
  className,
  totalPages,
  paginate,
  currentPage,
}: {
  className?: string;
  totalPages: number;
  paginate(arg: number): void;
  currentPage: number;
}) {
  return (
    <div className={classNames(className, "flex justify-center mt-4")}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => paginate(index + 1)}
          className={`mx-1 px-3 py-1 border rounded bg-primary font-bold ${
            currentPage === index + 1 ? "text-white" : "bg-white text-primary"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

// import { ReactNode } from "react";

// import classNames from "classnames";

// export default function CustomPagination({
//   className,
//   totalPages,
//   paginate,
//   currentPage,
//   count,
//   setCount,
// }: {
//   className?: string;
//   totalPages: number;
//   paginate(arg: number): void;
//   currentPage: number;
//   count: number;
//   setCount(arg: number): void;
// }) {
//   const countData = [1, 25, 50];

//   return (
//     <div
//       className={classNames(
//         className,
//         "flex justify-between items-center mt-4 "
//       )}
//     >
//       <div>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index + 1}
//             onClick={() => paginate(index + 1)}
//             className={`mx-1 px-3 py-1 border rounded bg-primary font-bold ${
//               currentPage === index + 1 ? "text-white" : "bg-white text-primary"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//       </div>
//       <div className="flex items-center">
//         <div className="text-text-secondary font-bold mr-4">
//           Хуудасын мөрийн тоо:
//         </div>
//         {countData.map((item, index) => (
//           <button
//             key={index + 1}
//             onClick={() => setCount(item)}
//             className={`mx-1 px-3 py-1 border rounded bg-primary font-bold ${
//               count === item ? "text-white" : "bg-white text-primary"
//             }`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
