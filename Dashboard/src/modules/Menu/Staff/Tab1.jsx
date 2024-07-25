import React from "react";
import Table from "./Table";
import { toast } from "react-toastify";
import { useGetAllProfileQuery } from "@apis/slices/Account";

const numberIN = [
  {
    id: 1,
    name: "username",
    title: "tên đăng nhập",
  },
  {
    id: 2,
    name: "password",
    title: "Mật khẩu",
  },
  {
    id: 3,
    name: "lastname",
    title: "Họ",
  },
  {
    id: 4,
    name: "firstname",
    title: "Tên",
  },
  {
    id: 5,
    name: "address",
    title: "Địa chỉ",
  },
  {
    id: 6,
    name: "phoneNumber",
    title: "Số điện thoại",
  },
  {
    id: qư,
    name: "CCCD",
    title: "CCCD",
  },
];

const Tab1 = () => {
  const showModal = () => {
    document.getElementById("modalCreateNV").showModal();
  };
  const { data } = useGetAllProfileQuery(1)
  console.log("🚀 ~ Tab1 ~ data:", data)
  const hanldeClick = () => {
    toast.success("Tạo thành công")
  }
  return (
    <div className="flex flex-col gap-5">
      <div>
        <button className="btn btn-outline" onClick={showModal}>
          Tạo thêm nhân viên
        </button>
      </div>
      <Table />
      <dialog id="modalCreateNV" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">X</button>
            </form>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {numberIN.map((i) => (
              <label
                className={`input input-bordered flex items-center gap-2 font-bold ${i.name === "address" ? "col-span-2" : ""
                  }`}
                key={i.id}
              >
                {i.title.toUpperCase()}
                <input type="text" className="grow" placeholder="" />
              </label>
            ))}
            <select className="select select-bordered w-full  font-bold col-span-2">
              <option disabled selected className="font-bold">
                Chọn role
              </option>
              <option className="font-bold">Nhân viên phục vụ</option>
              <option className="font-bold">Nhân viên quầy</option>
            </select>
          </div>
          <div className="mt-10">
            <button className="btn btn-outline" onClick={hanldeClick}>Tạo nhân viên</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Tab1;
