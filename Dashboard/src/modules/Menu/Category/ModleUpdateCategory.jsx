import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { useGetOneCategoryQuery, useUpdateCategoryMutation } from "../../../apis/slices/Category";
import { useGetAllCategoryQuery } from "../../../apis/slices/Category";

const ModleUpdateCategory = ({ Categoryid, setIsOpen }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { data: categoryData, isLoading: isCategoryLoading } = useGetOneCategoryQuery(Categoryid);
    const { data: allCategories, isLoading: isAllCategoriesLoading } = useGetAllCategoryQuery();
    const [updateCategory] = useUpdateCategoryMutation();

    useEffect(() => {
        if (categoryData) {
            setValue("name", categoryData.name);
        }
    }, [categoryData, setValue]);

    const onSubmit = async (formData) => {
        const updatedCategoryData = {
            ...formData,
            id: Categoryid // Ensure category_id is a number
        };

        try {
            await updateCategory(updatedCategoryData).unwrap();
            toast.success("Sửa thành công!");
            setIsOpen(false);
        } catch (error) {
            toast.error("Sửa thất bại");
        }
    };

    if (isCategoryLoading || isAllCategoriesLoading) return <div>Loading...</div>;

    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center fixed bg-gray-500 bg-opacity-50 inset-0 z-50">
            <div className="flex flex-col justify-center items-center h-[200px] w-[00px] bg-white gap-2">
                <button
                    className="bg-slate-500 text-red-50 ml-auto p-2 rounded-[50%] flex"
                    onClick={() => setIsOpen(false)}
                >
                    X
                </button>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full grid grid-cols-3 gap-5">
                        <div className="flex flex-col">
                            <label className="flex items-center gap-2 w-full">
                                Tên danh mục
                            </label>
                            <input
                                type="text"
                                className="border rounded p-2"
                                value={categoryData?.name}
                                placeholder=""
                                {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
                            />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
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

export default ModleUpdateCategory;
