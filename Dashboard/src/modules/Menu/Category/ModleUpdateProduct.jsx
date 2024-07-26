import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import cafe from "../../../.././public/cafe.jpg";
import { useGetOneProductQuery, useUpdateProductMutation } from "../../../apis/slices/Product";
import { useGetAllCategoryQuery } from "../../../apis/slices/Category";

const ModleUpdateProduct = ({ Productid, setIsOpen }) => {
    console.log("🚀 ~ ModleUpdateProduct ~ Productid:", Productid);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [file, setFile] = useState(null);
    const { data } = useGetOneProductQuery(Productid);
    const { data: CategoryData } = useGetAllCategoryQuery();
    const [updateProduct] = useUpdateProductMutation();

    useEffect(() => {
        if (data) {
            setValue("name", data.data.name);
            setValue("price", data.data.price);
            setValue("description", data.data.description);
            setValue("category_id", data.data.category_id);
            setFile(data.data.image);
            // setFile(data.data.id);

        }
    }, [data, setValue]);

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
            category_id: Number(formData.category_id),
            id: Productid// Ensure category_id is a number
        };

        try {
            await updateProduct(productData).unwrap();
            toast.success("Sửa thành công!");
            // Refetch product list after update (if applicable, you need to define refetch)
        } catch (error) {
            toast.error("Sửa thất bại");
        }
    };

    if (!data || !CategoryData) return <div>Loading...</div>;

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center fixed bg-gray-500 bg-opacity-50 inset-0 z-50">
            <div className="flex flex-col justify-center items-center h-[90%] w-9/12 bg-white gap-2">
                <button
                    className="bg-slate-500 text-red-50 ml-auto p-2 rounded-[50%] flex"
                    onClick={() => setIsOpen(false)}
                >
                    X
                </button>

                <div className="w-24 rounded-xl">
                    <img
                        src={file || cafe}
                        alt="Product"
                    />
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
                                className="border rounded p-2"
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
                                {CategoryData.data.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="text-red-500">{errors.category_id.message}</p>}
                        </div>
                    </div>
                    <div className="mt-3">
                        <button type="submit" className="btn btn-outline">
                            Sửa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModleUpdateProduct;
