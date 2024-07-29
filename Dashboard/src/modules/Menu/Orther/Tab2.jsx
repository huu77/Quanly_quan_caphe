import React, { useState } from "react";

import {
  useGetsStatusTableQuery,
  usePostStatusTableMutation,
} from "../../../apis/slices/Table";
import { AiOutlineDelete,AiFillEdit  } from "react-icons/ai";
const Tab2 = () => {
  const [newStatus, setNewStatus] = useState("");
  const { data, error, isLoading, refetch } = useGetsStatusTableQuery();

  const [postStatusTable] = usePostStatusTableMutation();

  const handleCreateStatus = async () => {
    try {
      await postStatusTable({ name: newStatus }).unwrap();
      setNewStatus(""); // Clear input after successful creation
      refetch(); // Refetch data to update the list
    } catch (error) {
      console.error("Failed to create status:", error.message);
    }
  };
  const handleShowModal = () => {
    document.getElementById("modalupdatestatustable").showModal();
  };
  const [getTextUpdate,setTextUpdate] = useState("")
const handleUpdate=()=>{

}
  return (
    <>
      <div className="flex justify-start items-start gap-10 mb-5">
        <label className="input input-bordered flex items-center gap-2">
          Tên trạng thái bàn
          <input
            type="text"
            className="grow"
            placeholder="Nhập tên trạng thái"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        </label>
        <button
          className="btn btn-outline btn-success"
          onClick={handleCreateStatus}
        >
          Tạo trạng thái bàn
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Chỉnh sửa</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((status) => (
              <tr key={status.id}>
                <th>{status.id}</th>
                <td>{status.name}</td>
                <td className="cursor-pointer" onClick={handleShowModal}>
                  <AiFillEdit  size={24} />
                </td>
                <td className="cursor-pointer" onClick={handleShowModal}>
                  <AiOutlineDelete  size={24} />
                </td>
              </tr>
            )) || (
              <tr>
                <td colSpan="2">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* modal */}

      <dialog id="modalupdatestatustable" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sửa lại</h3>
          <input type="text" placeholder=" " value={getTextUpdate} onChange={(e)=>setTextUpdate(e.target.value)} className="input input-bordered w-full max-w-xs mt-5" />
          <div className="modal-action">
          <button className="btn btn-outline" onClick={handleUpdate}>Sửa</button>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Tab2;
