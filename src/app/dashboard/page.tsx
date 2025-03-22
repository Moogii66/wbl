"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/Table";
import { Input } from "@/components/ui/Input";
import Layout from "@/components/Layout";
import SearchType from "@/components/SearchType";
import { MainData } from "../../../@types/main";
import DataTable from "@/components/tables/DataTable";
import DeleteAlert from "@/components/modals/DeleteAlert";
import { Add } from "iconsax-react";
import Button from "@/components/Button";
import CreateDataModal from "@/components/modals/CreateDataModal";

interface Item {
  id: number;
  text: string;
  date: string;
  status: string;
}

export default function Home() {
  const [capturedText, setCapturedText] = useState<string>("");
  const [items, setItems] = useState<Item[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"add" | "list">("add");
  const webcamRef = useRef<Webcam>(null);

  const [loading, setLoad] = useState<boolean>(false);

  const [showModal, setShowModal] = useState(false);

  const [editData, setEditData] = useState<MainData | null>(null);

  const DATA: MainData[] = [
    {
      id: "1asdd",
      image: "",
      code: "12312312",
      status: 1,
      created_at: "2024-03-03",
    },
    {
      id: "1asdd",
      image: "",
      code: "12312312",
      status: 1,
      created_at: "2024-03-03",
    },
    {
      id: "1asdd",
      image: "",
      code: "12312312",
      status: 1,
      created_at: "2024-03-03",
    },
    {
      id: "1asdd",
      image: "",
      code: "12312312",
      status: 1,
      created_at: "2024-03-03",
    },
    {
      id: "1asdd",
      image: "",
      code: "12312312",
      status: 1,
      created_at: "2024-03-03",
    },
  ];

  const [data, setData] = useState<MainData[]>(DATA);

  const [deleteModal, setDeleteModal] = useState({
    id: "",
    visible: false,
    name: "",
  });

  const captureText = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      alert("Failed to capture image. Please try again.");
      return;
    }

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(imageSrc, "eng", {
        logger: (m) => console.log(m),
      });
      setCapturedText(text);
      setItems((prevItems) => [
        ...prevItems,
        {
          id: Date.now(),
          text,
          date: new Date().toLocaleString(),
          status: "In",
        },
      ]);
    } catch (error) {
      console.error("OCR Error:", error);
      alert("Error reading image. Please try again.");
    }
  };

  // const handleEdit = (id: number, text: string) => {
  //   setEditingId(id);
  //   setEditText(text);
  // };

  const saveEdit = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    );
    setEditingId(null);
  };

  // const deleteItem = (id: number) => {
  //   setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  // };

  const handleEdit = (_item: MainData) => {
    setEditData(_item);
    // setShowModal(true);
  };

  const handleDelete = (index: string) => {
    const updatedData = data.filter((_, i) => _.code !== index);
    console.log("updatedData :>> ", updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setData(updatedData);
  };

  // const handleDelete = async (id: string) => {
  //   setLoad(true);
  //   // try {
  //   //   await auth
  //   //     .post(`/coordinator/user/delete/${id}`, undefined, true, "DELETE")
  //   //     .then((response) => {
  //   //       setDeleteModal({ id: "", visible: false, name: "" });
  //   //       toast.success(response.msg);
  //   //       fetchData();
  //   //     })
  //   //     .catch((e) => {
  //   //       console.error("Error deleting user:", e);
  //   //     });
  //   // } catch (error) {
  //   //   console.error("Error:", error);
  //   // }
  //   setLoad(false);
  // };

  const getData = useCallback(() => {
    const _data = JSON.parse(localStorage.getItem("data") || "[]");
    setData(_data);

    // Scroll to the bottom when new data is added
    // if (imageContainerRef.current) {
    //   setTimeout(() => {
    //     imageContainerRef.current?.scrollTo({
    //       top: imageContainerRef.current.scrollHeight,
    //       behavior: "smooth",
    //     });
    //   }, 300);
    // }
  }, []);

  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 5000); // Auto-fetch data every 5 seconds

    return () => clearInterval(interval);
  }, [getData]);

  const handleClear = () => {
    const confirmDelete = window.confirm(
      "Та бүх хандивыг устгахдаа итгэлтэй байна уу?"
    );

    if (confirmDelete) {
      localStorage.removeItem("data");
      setData([]); // Clear state immediately
    }
  };

  console.log("data :>> ", data);

  return (
    <Layout>
      <div className="mb-24 mx-8 mt-8 ">
        <div className="items-center flex justify-between">
          <div className="col-span-3">
            <div className="text-text-primary font-semibold text-24">
              Жагсаалт
            </div>
            {/* <div className="text-text-secondary font-light text-16">
              there is the latest update for the last 7 days. check now
            </div> */}
          </div>
          <Button
            className="flex-row flex items-center"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
          >
            <Add color="#FFFFFF" variant="Linear" size="24" className="mr-1" />
            <div>Бүртгэх</div>
          </Button>
          {/* <Button
              className="flex-row flex items-center"
              onClick={() => {
                router.push(`notification/send`);
              }}
            >
              <Add size="24" className="mr-1" />
              <div>Мэдэгдэл илгээх</div>
            </Button> */}
        </div>
        <div className="mt-8 p-6 rounded-2xl bg-white">
          <div className=" flex mb-4 justify-between items-center ">
            {/* <div className="flex  ">
              <SearchType
                value={searchFirstNameInput}
                setValue={setSearchFirstNameInput}
                label={"Нэр"}
              />
              <SearchType
                value={searchPhoneNumberInput}
                setValue={setSearchPhoneNumberInput}
                label={"Утасны дугаар"}
                className="mx-4"
              />
              <SearchType
                value={searchEmailInput}
                setValue={setSearchEmailInput}
                label={"И-мэйл"}
              />
            </div> */}

            {/* <input
              type="text"
              placeholder="First name"
              className="p-2 border rounded"
              value={searchFirstNameInput}
              onChange={(e) => setSearchFirstNameInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              className="p-2 border rounded"
              value={searchPhoneNumberInput}
              onChange={(e) => setSearchPhoneNumberInput(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="p-2 border rounded"
              value={searchEmailInput}
              onChange={(e) => setSearchEmailInput(e.target.value)}
            /> */}
            {/* <div className="flex ">
              <Filter
                code="RANK"
                selected={selectedRank}
                className="mr-4"
                open={open}
                setOpen={setOpen}
                setSelected={setSelectedRank}
              />
              <Filter
                code="ROLE"
                selected={selectedRole}
                open={open}
                setOpen={setOpen}
                setSelected={setSelectedRole}
              />
            </div> */}
          </div>

          <DataTable
            data={data}
            itemsPerPage={10}
            handleDelete={(item) =>
              setDeleteModal({
                visible: true,
                id: item.id,
                name: item.code,
              })
            }
            loading={loading}
            handleEdit={(item) => handleEdit(item)}
            role
            emptyLabel={"Бүртгэлтэй мэдээлэл байхгүй байна."}
          />
        </div>
        <div className="py-6 justify-end flex">
          <Button onClick={handleClear}>Бүгдийн устгах</Button>
        </div>

        {showModal && (
          <CreateDataModal
            onClose={() => setShowModal(false)}
            onHandle={() => null}
            fetchData={getData}
            data={editData}
          />
        )}

        {deleteModal.visible && (
          <DeleteAlert
            onClose={() =>
              setDeleteModal({
                id: "",
                visible: false,
                name: "",
              })
            }
            onPress={() => handleDelete(deleteModal.id)}
            title={`Та ${deleteModal.name}-г устгахдаа итгэлтэй байна уу?`}
          />
        )}
        {/* <Gang /> */}
        {/* {data !== null ? (
            <div className="mt-8  rounded-2xl   grid grid-cols-1  gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 ">
              <Item
                title="сургууль"
                total={data?.schools[0].totalSchools}
                lastWeek={data?.schools[0].schoolsLastWeek}
                today={data?.schools[0].schoolsToday}
              />
              <Item
                title="багш"
                total={data?.teachers[0].totalTeachers}
                lastWeek={data?.teachers[0].teachersLastWeek}
                today={data?.teachers[0].teachersToday}
              />
              <Item
                title="сургалт"
                total={data?.training[0].totalTraining}
                lastWeek={data?.training[0].trainingLastWeek}
                today={data?.training[0].trainingToday}
                // lastWeek={10}
                // today={4}
              />
              <Item
                title="курс"
                total={data?.courses[0].totalCourses}
                lastWeek={data?.courses[0].coursesLastWeek}
                today={data?.courses[0].coursesToday}
              />

              <Item
                title="сертификат"
                total={data?.certificates[0].totalCertificates}
                lastWeek={data?.certificates[0].certificatesLastWeek}
                today={data?.certificates[0].certificatesToday}
              />
            </div>
          ) : null} */}
      </div>
    </Layout>
    // <div className="p-4 max-w-3xl mx-auto">
    //   <h1 className="text-xl font-bold mb-4">
    //     Text Detection & Editable Table GANG
    //   </h1>

    //   {/* Mobile Side Menu */}
    //   <div className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4">
    //     <h2 className="text-lg font-semibold mb-4">Menu</h2>
    //     <ul>
    //       <li>
    //         <Button
    //           onClick={() => setActiveTab("add")}
    //           className={`w-full text-left ${
    //             activeTab === "add" ? "bg-blue-600 text-white" : ""
    //           }`}
    //         >
    //           Add
    //         </Button>
    //       </li>
    //       <li>
    //         <Button
    //           onClick={() => setActiveTab("list")}
    //           className={`w-full text-left mt-2 ${
    //             activeTab === "list" ? "bg-blue-600 text-white" : ""
    //           }`}
    //         >
    //           List
    //         </Button>
    //       </li>
    //     </ul>
    //   </div>

    //   {/* Add Section (Only visible in mobile when 'add' tab is active) */}
    //   {activeTab === "add" && (
    // <div className="md:block hidden pl-64">
    //   <Webcam
    //     ref={webcamRef}
    //     audio={false}
    //     screenshotFormat="image/jpeg"
    //     videoConstraints={{ facingMode: { exact: "environment" } }}
    //     className="w-full rounded-lg border border-gray-300 mb-4"
    //     onUserMediaError={() =>
    //       alert(
    //         "Camera access denied. Check browser permissions and try HTTPS."
    //       )
    //     }
    //   />
    //   <div className="text-48 font-thin">asdasd</div>
    //   <Button onClick={captureText}>Capture Text</Button>
    //   {capturedText && (
    //     <p className="mt-2 text-sm">Detected: {capturedText}</p>
    //   )}
    // </div>
    //   )}

    //   {/* List Section (Only visible in mobile when 'list' tab is active) */}
    //   {activeTab === "list" && (
    //     <div className="pl-64">
    //       <Table className="mt-4">
    //         <TableHead>
    //           <TableRow>
    //             <TableCell>Text</TableCell>
    //             <TableCell>Date</TableCell>
    //             <TableCell>Status</TableCell>
    //             <TableCell>Actions</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {items.map((item) => (
    //             <TableRow key={item.id}>
    //               <TableCell>
    //                 {editingId === item.id ? (
    //                   <Input
    //                     value={editText}
    //                     onChange={(e) => setEditText(e.target.value)}
    //                   />
    //                 ) : (
    //                   item.text
    //                 )}
    //               </TableCell>
    //               <TableCell>{item.date}</TableCell>
    //               <TableCell>{item.status}</TableCell>
    //               <TableCell>
    //                 {editingId === item.id ? (
    //                   <Button onClick={() => saveEdit(item.id)}>Save</Button>
    //                 ) : (
    //                   <>
    //                     <Button onClick={() => handleEdit(item.id, item.text)}>
    //                       Edit
    //                     </Button>
    //                     <Button
    //                       onClick={() => deleteItem(item.id)}
    //                       className="ml-2 text-red-600"
    //                     >
    //                       Delete
    //                     </Button>
    //                   </>
    //                 )}
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </div>
    //   )}
    // </div>
  );
}
