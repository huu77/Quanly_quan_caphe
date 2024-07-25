import React from "react";

const Tab2 = () => {
  return (
    <>
      <div className="flex justify-start items-start gap-10">
        <label className="input input-bordered flex items-center gap-2">
          Tên trạng thái bàn
          <input type="text" className="grow" placeholder="" />
        </label>
        <button className="btn btn-outline btn-success">
          Tạo trạng thái bàn
        </button>
      </div>
      <div className="overflow-x-auto w-3/5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Cy Ganderton</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tab2;
