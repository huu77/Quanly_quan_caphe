import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
import { useGetAllTableQuery, usePostTableMutation } from "@apis/slices/Table";
import { AiOutlineMore } from "react-icons/ai";
import { usePutUpdateTableMutation } from "../../../apis/slices/Table";

const Tab1 = () => {
  const [text, setText] = useState("");
  const [textQR, setTextQR] = useState("");
  const { data, refetch } = useGetAllTableQuery();
  const [postTable] = usePostTableMutation();

  const handleClick = async () => {
    try {
      await postTable({
        name: text,
        ORstring: "http://localhost:5173/" + textQR,
      }).unwrap(); // Call unwrap() method properly

      toast.success("Tạo Thành Công!");
      refetch(); // Refetch the data after successful post
      document.getElementById("modal_taoban").close(); // Close the create table modal
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Update table
  const [getTextUpdate, setTextUpdate] = useState("");
  const [getQRupdate, setQRupdate] = useState("");
  const [getIDTable, setIdTable] = useState(0);
  const [getStatusTable, setStatusTable] = useState(0);
  const updateHandle = (table) => {
    const prefix = "http://localhost:5173/";
    const trimmedORstring = table.ORstring.trim();
    setTextUpdate(table.nameTable);
    setQRupdate(trimmedORstring);
    setIdTable(table.id);
    setStatusTable(table.status_table_id)
    document.getElementById("modal_Update").showModal(); // Show the update modal
  };

  const [putUpdateTable] = usePutUpdateTableMutation();
  const handleUpdate = async () => {
    // Implement your update logic here
    console.log("Update:", getTextUpdate, getQRupdate);
    document.getElementById("modal_Update").close(); // Close the update modal
    try {
      await putUpdateTable({
        id: Number(getIDTable),
        name: getTextUpdate,
        ORstring: getQRupdate,
        status_table_id:Number(getStatusTable)
      }).unwrap();
      refetch();
      toast.success("Cập nhật thành công!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("modal_taoban").showModal()}
        >
          Tạo Bàn
        </button>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {data?.data.map((table) => (
          <div
            key={table.id}
            className="indicator card bg-base-100 w-96 shadow-xl"
          >
            <span
              className={`indicator-item badge ${
                table.status_table_id === 1
                  ? "badge-error"
                  : table.status_table_id === 2
                  ? "badge-success"
                  : "badge-info"
              }`}
            ></span>
            <div className="card-body">
              <h2 className="card-title">{table.nameTable}</h2>
              <div className="flex justify-between items-center gap-10">
                <div className="font-bold">
                  Trạng thái hoạt động: {table.name}
                </div>

                <div onClick={() => updateHandle(table)}>
                  <AiOutlineMore />
                </div>
              </div>
            </div>
            <figure>
              <QRCodeCanvas
                value={table.ORstring}
                size={256}
                level={"H"}
                includeMargin={true}
              />
            </figure>
          </div>
        ))}
      </div>

      {/* Create table modal */}
      <dialog id="modal_taoban" className="modal">
        <div className="modal-box flex flex-col gap-5">
          <h3 className="font-bold text-lg">Tạo bàn</h3>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Nhập tên bàn
              <input
                type="text"
                className="grow"
                placeholder=""
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Tạo mã QR
              <input
                type="text"
                value={textQR}
                onChange={(e) => setTextQR(e.target.value)}
                className="grow"
                placeholder=""
              />
            </label>
          </div>
          <div>
            <QRCodeCanvas
              value={textQR}
              size={256}
              level={"H"}
              includeMargin={true}
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-outline btn-accent"
              onClick={handleClick}
            >
              Tạo
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("modal_taoban").close()} // Close the create table modal
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {/* Update table modal */}
      <dialog id="modal_Update" className="modal">
        <div className="modal-box flex flex-col gap-5">
          <h3 className="font-bold text-lg">Cập nhật bàn</h3>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Nhập tên bàn
              <input
                type="text"
                className="grow"
                placeholder=""
                value={getTextUpdate}
                onChange={(e) => setTextUpdate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Tạo mã QR
              <input
                type="text"
                value={getQRupdate}
                onChange={(e) => setQRupdate(e.target.value)}
                className="grow"
                placeholder=""
              />
            </label>
          </div>
          <div>
            <QRCodeCanvas
              value={getQRupdate}
              size={256}
              level={"H"}
              includeMargin={true}
            />
          </div>
          <div className="modal-action">
            <button
              className="btn btn-outline btn-accent"
              onClick={handleUpdate} // Implement update logic
            >
              Cập nhật
            </button>
            <button
              className="btn"
              onClick={() => document.getElementById("modal_Update").close()} // Close the update modal
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Tab1;
