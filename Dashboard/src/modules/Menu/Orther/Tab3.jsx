import React, { useState } from "react";
import { useGetsStatusQuery, usePostStatusMutation } from "../../../apis/slices/Table";
 

const Tab3 = () => {
  const [newStatus, setNewStatus] = useState("");
  const { data, error, isLoading, refetch } = useGetsStatusQuery();
  const [postStatusTable] = usePostStatusMutation();

  const handleCreateStatus = async () => {
    try {
      await postStatusTable({ name: newStatus }).unwrap();
      setNewStatus(""); // Clear input after successful creation
      refetch(); // Refetch data to update the list
    } catch (error) {
      console.error("Failed to create status:", error.message);
    }
  };

 

  return (
    <>
      <div className="flex justify-start items-start gap-10 mb-5">
        <label className="input input-bordered flex items-center gap-2">
          Tên trạng thái 
          <input
            type="text"
            className="grow"
            placeholder="Nhập tên trạng thái"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        </label>
        <button className="btn btn-outline btn-success" onClick={handleCreateStatus}>
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
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((status) => (
              <tr key={status.id}>
                <th>{status.id}</th>
                <td>{status.name}</td>
              </tr>
            )) || <tr><td colSpan="2">No data available</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tab3;
