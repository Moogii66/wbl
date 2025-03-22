"use client";
import React, { useState } from "react";

import classNames from "classnames";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Home() {
  // npx ngrok http 3000

  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("80620779");

  const [password, setPassword] = useState("1234");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoad] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoad(true);

    //  fetchPlayerId();

    setTimeout(async () => {
      const _formData = {
        phoneNumber: phoneNumber,
        password: password,
      };
      console.log("_formData :>> ", _formData);

      if (phoneNumber === "80620779" && password === "1234") {
        router.replace("/dashboard");
      }
      //  try {
      //    await auth
      //      .login("/login", formData, false, landing ? landing : "", playerId)
      //      .then((response) => {
      //        console.log("response :>> ", response);
      //      })
      //      .catch((e: any) => {
      //        console.log("asdasdsa", e);
      //        console.warn(e);
      //        toast.error(e?.errors[0]);
      //        setLoad(false);
      //        setAlert({
      //          visible: true,
      //          type: "warning",
      //          message: e?.errors[0],
      //        });
      //        // if (e?.msg && e.msg.length > 0) {
      //        //   setAlertData((existingValues) => ({
      //        //     ...existingValues,
      //        //     title: "Анхааруулга",
      //        //     body: e?.msg[0],
      //        //     type: "warning",
      //        //     isShow: true,
      //        //   }));
      //        // }
      //      });
      //  } catch (e: any) {
      //    // setIsLoading(false);
      //    console.warn(e);
      //    setLoad(false);
      //    // setFormData((d) => ({
      //    //   ...d,
      //    //   password: "",
      //    // }));
      //  }
    }, 500);

    // setLoad(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputClass =
    "w-full p-4 border border-border rounded-lg  focus:border-primary text-text-primary font-regular text-18 placeholder-shown:font-regular resize-none overflow-hidden outline-0";

  const hideClass =
    "absolute inset-y-0 right-0 flex items-center px-3 text-gray-500";

  return (
    <div className="h-screen w-screen flex bg-primary justify-center items-center ">
      <div className="h-96 w-96 bg-white rounded-2xl justify-center pt-10">
        <div className="font-bold text-24 text-center">Нэвтрэх</div>
        <form onSubmit={handleSubmit} className="justify-center w-96  p-10">
          <input
            type=""
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={inputClass}
            placeholder="Утасны дугаар"
          />

          <div className=" relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classNames(inputClass, "my-4")}
              placeholder="Нууц үг"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={hideClass}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className=" flex place-content-center">
            <Button type="submit" loading={loading}>
              Нэвтрэх
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
