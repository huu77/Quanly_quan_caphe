import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { toast } from "react-toastify";
const Tab1 = () => {
  // Dữ liệu mẫu cho các bàn
  const tableData = [
    {
      id: 1,
      name: "Bàn số 1",
      status: "Đang hoạt động",
      img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 2,
      name: "Bàn số 2",
      status: "Không hoạt động",
      img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      id: 3,
      name: "Bàn số 3",
      status: "Đang hoạt động",
      img: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    // Thêm các bàn khác nếu cần
  ];
  const [text, setText] = useState("");
const handleClick =()=>{
    toast.success("Tạo Thành Công!")
}
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
        {tableData.map((table) => (
          <div
            key={table.id}
            className=" indicator card bg-base-100 w-96 shadow-xl"
          >
            <span className="indicator-item badge badge-success"></span>
            <div className="card-body">
              <h2 className="card-title">{table.name}</h2>
              <p>
                <span className="font-bold">Trạng thái hoạt động: </span>{" "}
                {table.status}
              </p>
            </div>
            <figure>
              <QRCodeCanvas
                value={text}
                size={256}
                level={"H"}
                includeMargin={true}
              />
            </figure>
          </div>
        ))}
      </div>

      {/* xong */}
      <dialog id="modal_taoban" className="modal">
        <div className="modal-box flex flex-col gap-5">
          <h3 className="font-bold text-lg">Tạo bàn</h3>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Nhập tên bàn
              <input type="text" className="grow" placeholder="" />
            </label>
          </div>
          <div>
            <label className="input input-bordered flex items-center gap-2">
              Tạo mã QR
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="grow"
                placeholder=""
              />
            </label>
          </div>
          <div>
            <QRCodeCanvas
              value={text}
              size={256}
              level={"H"}
              includeMargin={true}
            />
          </div>
          <div className="modal-action">
            <button className="btn btn-outline btn-accent" onClick={handleClick}>Tạo</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Tab1;
