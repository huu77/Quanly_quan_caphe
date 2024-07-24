import React from "react";

const Tab1 = () => {
  return (
    <div>
      <div>
        <button className="btn btn-outline">Tạo thêm danh mục</button>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Tên danh mục</th>
                <th>Số lượng sẩn phẩm</th>
                <th>Xem thêm</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr
                className="hover"
                onClick={() =>
                  document.getElementById("my_modal_4").showModal()
                }
              >
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button, it will close the modal */}
            <button className="btn">X</button>
          </form>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Xóa</th>
                  <th>Chỉnh sửa</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr className="hover">
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Xóa</td>
                  <td>Chỉnh sửa</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-action"></div>
        </div>
      </dialog>
    </div>
  );
};

export default Tab1;
