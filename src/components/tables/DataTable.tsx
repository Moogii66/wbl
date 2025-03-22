import { useState } from "react";

import classNames from "classnames";
import { Ring } from "react-css-spinners";
import { Edit, Edit2, TableDocument, Trash } from "iconsax-react";

import { MainData, Teacher } from "../../../@types/main";

import ActionButton from "./components/ActionButton";
import Loader from "./components/Loader";
import EmptyView from "./components/EmptyView";
import CustomPagination from "./components/CustomPagination";

export default function DataTable({
  data,
  itemsPerPage,
  handleDelete,
  loading,
  handleEdit,
  role,
  emptyLabel,
}: {
  data: MainData[];
  itemsPerPage: number;
  handleDelete(arg: MainData): void;
  loading?: boolean;
  handleEdit(arg: MainData): void;
  role?: boolean;
  emptyLabel: string;
}) {
  const [count, setCount] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * count;
  const indexOfFirstItem = indexOfLastItem - count;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / count);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const thClassName = classNames(
    "py-6 px-4 font-semibold text-16 text-text-secondary text-left"
  );

  const tdClassName = classNames(
    "py-4 px-4 font-semibold text-16 text-text-primary text-left"
  );

  // console.log("currentItems :>> ", currentItems);
  return (
    <div className="overflow-scroll rounded-lg table-container mx-auto">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white table-auto">
          <thead className="bg-tableHead">
            <tr>
              <th className={classNames(thClassName, "w-10")}>No</th>
              <th className={thClassName}>Зураг</th>
              <th className={thClassName}>Код</th>
              <th className={thClassName}>Төлөв</th>
              <th className={thClassName}>Он сар</th>
              {/* <th className={thClassName}>Сургуулийн нэр</th>
              <th className={thClassName}>Утасны дугаар</th>
              <th className={thClassName}>Имэйл хаяг</th> */}
              <th className={thClassName}>Үйлдэл</th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              currentItems.map((item, index) => (
                <tr
                  key={Math.random()}
                  className="hover:bg-tableHead rounded-lg"
                >
                  <td className={tdClassName}>
                    {indexOfFirstItem + index + 1}
                  </td>

                  <td className={tdClassName}>--</td>
                  <td className={tdClassName}>{item.code}</td>

                  <td className={tdClassName}>
                    {item.status === 0 ? "Орсон" : "Гарсан"}
                  </td>
                  <td className={tdClassName}>{item.created_at}</td>

                  <td className={tdClassName}>
                    <div className="flex gap-2">
                      {/* {item.role_code !== "ROLE_COORDINATOR" && ( */}
                      <ActionButton
                        onClick={() => {
                          handleEdit(item);
                        }}
                        // className={classNames(
                        //   item.role_code === "ROLE_COORDINATOR"
                        //     ? "opacity-0 cursor-default"
                        //     : ""
                        // )}
                      >
                        {/* <div className="text-"></div> */}
                        <Edit2 color="#eee" variant="Linear" size={20} />
                      </ActionButton>
                      {/* )} */}

                      <ActionButton onClick={() => handleDelete(item)}>
                        <Trash color="#eee" variant="Linear" size={20} />
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!loading && data.length === 0 && <EmptyView label={emptyLabel} />}

        {loading && <Loader />}
      </div>

      {!loading && (
        <CustomPagination
          totalPages={totalPages}
          paginate={paginate}
          currentPage={currentPage}
          // count={count}
          // setCount={setCount}
        />
      )}
    </div>
  );
}
