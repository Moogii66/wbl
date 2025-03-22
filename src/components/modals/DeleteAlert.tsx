"use client";
import React from "react";
import Button from "../Button";

interface DeleteAlertModalProps {
  onClose: () => void;
  onPress: () => void;
  title: string;
}

export default function DeleteAlert({
  onClose,
  onPress,
  title,
}: DeleteAlertModalProps) {
  return (
    <div className="  fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className=" halfContainer bg-white p-8 rounded-2xl shadow-lg mx-4 ">
        <div className=" items-center justify-between mb-10">
          <div className="text-text-primary text-24 font-semibold  text-center ">
            Анхаар
          </div>
          <div className="text-text-secondary text-24 font-light  text-center mt-2">
            {title}
          </div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <Button
            second
            className="flex-row flex items-center w-36"
            onClick={onClose}
          >
            {/* <ArrowLeft size="24" className="mr-1 " /> */}
            <div>Болих</div>
          </Button>
          <Button
            type="submit"
            className="flex-row flex items-center w-36"
            onClick={() => onPress()}
          >
            {/* <Add size="24" className="mr-1 " /> */}
            <div className="">Тийм</div>
          </Button>
        </div>
      </div>
    </div>
  );
}
