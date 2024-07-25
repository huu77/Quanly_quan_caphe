import React from "react";

const Tab3 = () => {
  return (
    <>
      <div className="flex gap-5">
        <div className="flex gap-5">
          <label htmlFor="thang">Chọn tháng</label>
          <input
            id="thang"
            type="number"
            min={1}
            max={12}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <div className="flex gap-5">
          <label htmlFor="thang" className="w-fit">
            Chọn năm
          </label>
          <input
            id="thang"
            type="number"
            placeholder="2024"
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
        <button className="btn btn-outline">Lọc</button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Ngày</th>
              <th>Kiểu ca</th>
              <th>Số lượng nhận viên</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr className="hover">
              <th>1</th>
              <td>Cy Ganderton</td>
              <td>Quality Control Specialist</td>
              <td>Blue</td>
            </tr>
            {/* row 2 */}
            <tr className="hover">
              <th>2</th>
              <td>Hart Hagerty</td>
              <td>Desktop Support Technician</td>
              <td>Purple</td>
            </tr>
            {/* row 3 */}
            <tr className="hover">
              <th>3</th>
              <td>Brice Swyre</td>
              <td>Tax Accountant</td>
              <td>Red</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tab3;
