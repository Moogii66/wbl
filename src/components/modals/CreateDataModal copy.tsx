"use client";
import Link from "next/link";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "../Button";

// import { ToastContainer, toast } from "react-toastify";
import { toast } from "react-toastify";
import { Add, ArrowLeft } from "iconsax-react";
import { MainData } from "../../../@types/main";
import Webcam from "react-webcam";

type CreateDataModalProps = {
  onClose: () => void;
  onHandle: () => void;
  fetchData: () => void;
  data: MainData | null;
  // type: 1 | 0;
};

export default function CreateDataModal({
  onClose,
  onHandle,
  fetchData,
  data,
}: // type,
CreateDataModalProps) {
  // console.log("data CreateDataModal:>> ", data);

  const [formData, setFormData] = useState({
    id: data?.id ? data?.id : "",
    image: data?.image ? data?.image : "",
    code: data?.code ? data?.code : "",
    status: data?.status ? data?.status : "",
  });

  const [capturedText, setCapturedText] = useState<string>("");

  const webcamRef = useRef<Webcam>(null);

  // console.log("formData :>> CreateUserModal ", formData);

  const handleFormDataChange = (field: string, _value: any) => {
    setFormData({
      ...formData,
      [field]: _value,
    });
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    // if(formData.)
    e.preventDefault();

    setLoading(true);

    if (
      formData.image === "" ||
      formData.code === "" ||
      formData.status === ""
    ) {
      toast.warn("Та мэдээллээ бүрэн оруулна уу");
    } else {
      console.log("formData :>> ", formData);

      const body = [formData];
      console.log("body :>> ", body);

      // await auth
      //   .post("/coordinator/user/", body, true, "POST", false)
      //   .then((response) => {
      //     console.log("response /coordinator/ create user :>> ", response);
      //     if (response.status === "failed") {
      //       toast.error(response.errors[0]);
      //     } else {
      //       toast.success(response.msg);
      //       onClose();
      //       fetchData();
      //     }
      //   })
      //   .catch((e: any) => {
      //     console.log("asdasdsa", e);
      //     console.warn(e);
      //     toast.error(e?.errors[0]);
      //   });
    }

    setLoading(false);
  };

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

  // console.log("formData :>> ", formData);

  const inputClass =
    "w-full p-4 border border-border rounded-lg  focus:border-primary text-text-primary font-regular text-18 placeholder-shown:font-regular resize-none overflow-hidden outline-0";

  const labelClass = "text-text-primary font-bold text-18 mb-2";

  // console.log("selectedSchool :>> ", selectedSchool);

  return (
    <div className="  fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className=" container bg-white p-8 rounded-2xl shadow-lg mx-4 w-[800px] max-h-[600px] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="text-text-primary text-24 font-semibold">
            {data?.id ? "Засах" : "Бүртгэх"}
          </div>

          <Add
            onClick={onClose}
            size="36"
            className="rotate-45  cursor-pointer"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="justify-center  grid grid-cols-1 gap-5"
        >
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: { exact: "environment" } }}
            className="w-full rounded-lg border border-gray-300 mb-4"
            onUserMediaError={() =>
              alert(
                "Camera access denied. Check browser permissions and try HTTPS."
              )
            }
          />
          <Button onClick={captureText}>Capture Text</Button>
          {capturedText && (
            <p className="mt-2 text-sm">Detected: {capturedText}</p>
          )}
          <div>
            <div className={labelClass}>Овог</div>
            <input
              value={formData.code}
              onChange={(e) => handleFormDataChange("lastName", e.target.value)}
              className={inputClass}
              placeholder="Овог"
            />
          </div>

          {/* <div>
            <div className={labelClass}>Нэр</div>
            <input
              value={formData.firstName}
              onChange={(e) =>
                handleFormDataChange("firstName", e.target.value)
              }
              className={inputClass}
              placeholder="Нэр"
            />
          </div>

          <div>
            <div className={labelClass}>Имэйл</div>
            <input
              type="email"
              value={formData.username}
              onChange={(e) => handleFormDataChange("username", e.target.value)}
              className={inputClass}
              placeholder="Имэйл"
            />
          </div> */}

          {/* {(formData.roleCode === "ROLE_TEACHER" ||
            formData.roleCode === "ROLE_HEADMASTER") && ( */}
          <div>
            <div className={labelClass}>Төлөв</div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="ROLE_TEACHER"
                  checked={formData.status === "0"}
                  onChange={() => handleFormDataChange("status", "0")}
                  className="custom-radio"
                />
                <span className="ml-2 text-text-primary font-regular text-18 ">
                  Орсон
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="status"
                  value="ROLE_HEADMASTER"
                  checked={formData.status === "1"}
                  onChange={() => handleFormDataChange("status", "1")}
                  className="custom-radio"
                />
                <span className="ml-2 text-text-primary font-regular text-18 ">
                  Гарсан
                </span>
              </label>
            </div>
          </div>
          {/* )} */}

          <div className="flex   justify-end gap-4">
            <Button second onClick={onClose} loading={loading}>
              <ArrowLeft
                color="#000000"
                variant="Linear"
                size="24"
                className="mr-2 "
              />
              <div>Болих</div>
            </Button>
            <Button type="submit" loading={loading}>
              <Add
                color="#ffffff"
                variant="Linear"
                size="24"
                className="mr-2 "
              />
              <div className="">Бүртгэх</div>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
