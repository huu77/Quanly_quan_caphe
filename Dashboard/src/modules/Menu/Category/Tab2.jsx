import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProductMutation, useGetALLProductQuery, useDeleteProductMutation } from "../../../apis/slices/Product";
import { useGetAllCategoryQuery } from "../../../apis/slices/Category";
import { toast } from "react-toastify";
import cafe from "../../../.././public/cafe.jpg";
import ModleUpdateProduct from "./ModleUpdateProduct";

const Tab2 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setid] = useState(null);


  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation(); // Add delete mutation
  const { data } = useGetAllCategoryQuery();
  const { data: product, refetch } = useGetALLProductQuery(); // Refetch to update UI

  const transformFile = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFile(reader.result);
      };
    } else {
      setFile("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const onSubmit = async (formData) => {
    const productData = {
      ...formData,
      image: file,
      category_id: Number(formData.category_id), // Ensure category_id is a number
    };

    try {
      await createProduct(productData).unwrap();
      toast.success("Tạo thành công!");
      refetch(); // Refetch product list after creation
    } catch (error) {
      toast.error("Tạo thành thất bại");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId).unwrap();
      toast.success("Xóa thành công!");
      refetch(); // Refetch product list after deletion
    } catch (error) {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <div className={`flex flex-col gap-10 `}>
      <div className="flex justify-center items-center gap-2">
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img
              src={file || cafe}
              alt="Product"
            />
          </div>
        </div>
        <label htmlFor="imgsp" className="font-bold cursor-pointer">
          Chọn Hình Ảnh Sản Phẩm
        </label>
        <input
          type="file"
          name="file"
          id="imgsp"
          className="border rounded p-2"
          onChange={handleFileChange}
          accept="image/*"
          required
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full grid grid-cols-3 gap-5">
          <div className="flex flex-col">
            <label className="flex items-center gap-2 w-full">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="border rounded p-2"
              placeholder=""
              {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="flex items-center gap-2 w-full">
              Giá
            </label>
            <input
              type="text"
              className="border rounded p-2"
              placeholder=""
              {...register("price", {
                required: "Giá là bắt buộc",
                validate: {
                  isNumber: value => !isNaN(value) || "Giá phải là số"
                }
              })}
            />
            {errors.price && <p className="text-red-500">{errors.price.message}</p>}
          </div>
          <div className="flex flex-col">
            <label className="flex items-center gap-2 w-full">
              Mô tả
            </label>
            <input
              type="text"
              className="grow"
              placeholder=""
              {...register("description", { required: "Mô tả là bắt buộc" })}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>
          <div className="flex flex-col">
            <select
              className="select select-bordered w-full"
              {...register("category_id", { required: "Danh mục là bắt buộc" })}
            >
              <option value="" disabled>
                Chọn danh mục sản phẩm
              </option>
              {data?.data?.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
            {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
          </div>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-outline">
            Tạo thêm sản phẩm
          </button>
        </div>
      </form>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {product?.data?.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Product"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td className="flex flex-col">

                  <button
                    className="bg-red-500 p-3 w-[60px] rounded m-1 text-white"
                    onClick={() => handleDelete(item.id)}

                  >Xóa</button>
                  <div>
                    <button
                      className="bg-green-500 p-3 w-[60px] rounded m-1 text-white"
                      onClick={() => {
                        setid(item.id);
                        setIsOpen(!isOpen);
                      }}>

                      sửa
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isOpen &&

        <ModleUpdateProduct
          setIsOpen={setIsOpen}
          Productid={id}
        />

      }
    </div >
  );
};

export default Tab2;
