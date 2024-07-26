import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGetAllCategoryQuery } from "../../../apis/slices/Category";
import index from './../Sesion/index';



const Tab1 = () => {
  const [valueName, setValueName] = useState('')
  const { data } = useGetAllCategoryQuery()
  console.log("🚀 ~ Tab1 ~ data:", data)
  const hanldeChange = (e) => {
    setValueName(e.target.value.toUpperCase())
  }
  const handleClick = () => {
    toast.success("Tạo thành công!")
  }
  return (
    <div>
      <div>
        <button
          className="btn btn-outline"
          onClick={() =>
            document.getElementById("modalCreateCategory").showModal()
          }
        >
          Tạo thêm danh mục
        </button>
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

              {data?.data?.map((e, index) => (


                <tr
                  className="hover"
                  onClick={() =>
                    document.getElementById("my_modal_4").showModal()
                  }
                >
                  <th>{index}</th>
                  <td>{e.name}</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                </tr>
              )
              )}
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

      {/* category */}
      <dialog id="modalCreateCategory" className="modal">
        <div className="modal-box">
          <h1 className="font-bold mb-5">Tạo danh mục</h1>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Tạp danh mục"
              onChange={hanldeChange}
              value={valueName}
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button className="btn btn-outline" onClick={handleClick}>Tạo</button>
          </div>
          <div className="modal-action">
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
