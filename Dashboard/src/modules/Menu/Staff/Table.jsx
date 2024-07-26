import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Table = ({ data }) => {
  return (
    <div className="overflow-x-auto flex flex-col items-center justify-start gap-5">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>

            </th>
            <th>Họ và tên</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>CMND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item, index) => (
            <tr key={item.id}>
              <th>

              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.address}</div>
                  </div>
                </div>
              </td>
              <td>{item.address}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <span className="badge badge-ghost badge-sm">{item.CCCD}</span>
              </td>
              <td
                onClick={() => document.getElementById(`my_modal_${item.id}`).showModal()}
              >
                <AiOutlineMore fontSize="24px" />
                <dialog id={`my_modal_${item.id}`} className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <div className="w-full p-2">
                      <ul className="menu bg-base-200 rounded-box w-full">
                        <li>
                          <Link to={'/detailstaff'}>Xem chi tiết</Link>
                        </li>
                        <li onClick={() => toast.success("Xóa nhân viên thành công!")} className="text-rose-600">
                          <span>Xóa nhân viên</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="join">
        <button className="join-item btn">«</button>
        <button className="join-item btn">Page 22</button>
        <button className="join-item btn">»</button>
      </div>
    </div>
  );
};

export default Table;
