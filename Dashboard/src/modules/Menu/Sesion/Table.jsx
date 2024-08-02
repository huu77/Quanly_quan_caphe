import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Table = ({ data, refetch }) => {
  console.log("🚀 ~ Table ~ data:", data);

  return (
    <div className="overflow-x-auto flex flex-col items-center justify-start gap-5 mt-5">
      <h1 className="font-bold">Danh sách ca làm việc</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Thứ</th>
            <th>Ngày làm việc</th>
            <th>Ca</th>
          </tr>
        </thead>
        <tbody>
          {data && data.data ? (
            data.data.map((i, index) => (
              <tr className="bg-base-200" key={index}>
                <th>{i.day_of_week}</th>
                <td>{new Date(i.start_time).toISOString().split('T')[0]}</td>
                <td>{i.typeSession}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center text-red-500">chưa có phiên làm việc !</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
