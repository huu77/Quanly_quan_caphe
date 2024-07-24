import React from "react";
import { AiOutlineMore } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Table = () => {
  return (
    <div className="overflow-x-auto flex flex-col items-center justify-start gap-5">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Thứ</th>
            <th>Ngày làm việc</th>
            <th>Số lượng nhân viên</th>
            <th>Favorite Color</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr className="bg-base-200">
            <th>1</th>
            <td>Cy Ganderton</td>
            <td>Quality Control Specialist</td>
            <td>Blue</td>
          </tr>
          {/* row 2 */}
          <tr>
            <th>2</th>
            <td>Hart Hagerty</td>
            <td>Desktop Support Technician</td>
            <td>Purple</td>
          </tr>
          {/* row 3 */}
          <tr>
            <th>3</th>
            <td>Brice Swyre</td>
            <td>Tax Accountant</td>
            <td>Red</td>
          </tr>
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
