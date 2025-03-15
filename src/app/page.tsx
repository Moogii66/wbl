"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/Table";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

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

  const handleEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, text: editText } : item
      )
    );
    setEditingId(null);
  };

  const deleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">
        Text Detection & Editable Table GANG
      </h1>

      {/* Mobile Side Menu */}
      <div className="md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Menu</h2>
        <ul>
          <li>
            <Button
              onClick={() => setActiveTab("add")}
              className={`w-full text-left ${
                activeTab === "add" ? "bg-blue-600 text-white" : ""
              }`}
            >
              Add
            </Button>
          </li>
          <li>
            <Button
              onClick={() => setActiveTab("list")}
              className={`w-full text-left mt-2 ${
                activeTab === "list" ? "bg-blue-600 text-white" : ""
              }`}
            >
              List
            </Button>
          </li>
        </ul>
      </div>

      {/* Add Section (Only visible in mobile when 'add' tab is active) */}
      {activeTab === "add" && (
        <div className="md:block hidden pl-64">
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
        </div>
      )}

      {/* List Section (Only visible in mobile when 'list' tab is active) */}
      {activeTab === "list" && (
        <div className="pl-64">
          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableCell>Text</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    {editingId === item.id ? (
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                    ) : (
                      item.text
                    )}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                    {editingId === item.id ? (
                      <Button onClick={() => saveEdit(item.id)}>Save</Button>
                    ) : (
                      <>
                        <Button onClick={() => handleEdit(item.id, item.text)}>
                          Edit
                        </Button>
                        <Button
                          onClick={() => deleteItem(item.id)}
                          className="ml-2 text-red-600"
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
