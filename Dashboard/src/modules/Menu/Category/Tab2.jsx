import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateProductMutation, useGetALLProductQuery } from "../../../apis/slices/Product";
import { useGetAllCategoryQuery } from "../../../apis/slices/Category";
import { toast } from "react-toastify";
import cafe from "../../../.././public/cafe.jpg"

const Tab2 = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const [createProduct] = useCreateProductMutation();
  const { data } = useGetAllCategoryQuery();
  const { data: productdata } = useGetALLProductQuery()
  console.log("🚀 ~ Tab2 ~ productdata:", productdata)
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

    console.log("🚀 ~ handleSubmit ~ productData:", productData);
    try {
      await createProduct(productData).unwrap();
      // Handle successful product creation
      // toast.success("Tạo thành công!")
    } catch (error) {
      // Handle error
      toast.error("Tạo thành thất bại")
    }
  };

  console.log(errors);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center items-center gap-2">
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img
              src={
                file ||
                cafe
              }
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
            <label className=" flex items-center gap-2 w-full">
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
          <div className="flex flex-col" >
            <label className=" flex items-center gap-2 w-full">
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
            <label className=" flex items-center gap-2 w-full">
              Mô tả
            </label>
            <input
              type="text"
              className="border rounded p-2"
              placeholder=""

            />
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
            {errors.category_id && <p className="text-red-500" >{errors.category_id.message}</p>}
          </div>
        </div>
        <div className=" mt-3">
          <button type="submit" className="btn btn-outline">
            Tạo thêm sản phẩm
          </button>
        </div>
      </form>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>

              </th>
              <th>Name</th>
              <th>giá</th>
              <th>mô tả</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {productdata?.data?.map((item, index) => (
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold">{item.name}</div>
                      <div class="text-sm opacity-50">United States</div>
                    </div>
                  </div>
                ))}

              </td>




            </tr>
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default Tab2;
