import React, { useState } from "react";
import { toast } from "react-toastify";
import { useGetAllCategoryQuery, useDeleteCategoryMutation, useCreateCategoryMutation } from "../../../apis/slices/Category";
import ModleUpdateCategory from "./ModleUpdateCategory";

const Tab1 = () => {
  const [valueName, setValueName] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const { data, refetch } = useGetAllCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [addCategory] = useCreateCategoryMutation();

  const handleChange = (e) => {
    setValueName(e.target.value.toUpperCase());
  };

  const handleDelete = async (CategoryId) => {
    try {
      await deleteCategory(CategoryId).unwrap();
      // toast.success("Xóa thành công!");
      refetch();
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategory({ name: valueName }).unwrap();
      toast.success("Thêm thành công!");
      refetch();
      setValueName('');
      document.getElementById("modalCreateCategory").close();
    } catch (error) {
      toast.error("Thêm thất bại");
    }
  };

  return (
    <div>
      <div>
        <button
          className="btn btn-outline"
          onClick={() => document.getElementById("modalCreateCategory").showModal()}
        >
          Tạo thêm danh mục
        </button>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Tên danh mục</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((e, index) => (
                <tr key={e.id}>
                  <th>{index}</th>
                  <td>{e.name}</td>
                  <td className="flex flex-col">
                    <button
                      className="bg-red-500 p-3 w-[60px] rounded m-1 text-white"
                      onClick={() => handleDelete(e.id)}
                    >
                      Xóa
                    </button>
                    <button
                      className="bg-green-500 p-3 w-[60px] rounded m-1 text-white"
                      onClick={() => {
                        setId(e.id);
                        setIsOpen(true);
                      }}
                    >
                      Sửa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <dialog id="modalCreateCategory" className="modal">
        <div className="modal-box">
          <h1 className="font-bold mb-5">Tạo danh mục</h1>
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Tạo danh mục"
              onChange={handleChange}
              value={valueName}
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button
              className="btn btn-outline"
              onClick={handleAddCategory}
            >
              Thêm
            </button>
          </div>
        </div>
      </dialog>

      {isOpen && (
        <ModleUpdateCategory
          setIsOpen={setIsOpen}
          Categoryid={id}
        />
      )}
    </div>
  );
};

export default Tab1;
