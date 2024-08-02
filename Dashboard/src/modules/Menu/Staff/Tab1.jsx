import React, { useEffect } from "react";
import Table from "./Table";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useGetAllProfileQuery, usePostCreateAccountMutation } from "@apis/slices/Account";

const numberIN = [
  { id: 1, name: "username", title: "Tên đăng nhập" },
  { id: 2, name: "password", title: "Mật khẩu" },
  { id: 3, name: "lastname", title: "Họ" },
  { id: 4, name: "firstname", title: "Tên" },
  { id: 5, name: "address", title: "Địa chỉ" },
  { id: 6, name: "phone", title: "Số điện thoại" },
  { id: 7, name: "cccd", title: "CCCD" },
];

const role = [
  { id: 1, name: "Nhân viên phục vụ", },
  { id: 2, name: "Nhân viên quầy", },

];

const Tab1 = () => {
  const showModal = () => {
    document.getElementById("modalCreateNV").showModal();
  };

  const { data } = useGetAllProfileQuery(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [createAccount] = usePostCreateAccountMutation();

  const onSubmit = async (formData) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData)
    try {
      const formDataWithNumberRoleId = {
        ...formData,
        role_id: Number(formData.role_id),
      };

      const response = await createAccount(formDataWithNumberRoleId).unwrap();
      console.log("Response from createAccount:", response);
      toast.success("Tạo nhân viên thành công!");
      document.getElementById("modalCreateNV").close();
      reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Failed to create account:", error);
      if (error.status === 500) {
        toast.error("Lỗi máy chủ, vui lòng thử lại sau.");
      } else {
        toast.error("Tạo nhân viên thất bại!");
      }
    }
  };

  useEffect(() => {
    reset({
      username: "",
      password: "",
      lastname: "",
      firstname: "",
      address: "",
      phone: "",
      cccd: "",
      role_id: null
    });
  }, [reset]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <button className="btn btn-outline" onClick={showModal}>
          Tạo thêm nhân viên
        </button>
      </div>
      <Table data={data} />
      <dialog id="modalCreateNV" className="modal">
        <div className="modal-box w-11/12 max-w-6xl">
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">X</button>
            </form>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-5">
              {numberIN.map((item) => (
                <div className="flex flex-col h-[100px]" key={item.id}>
                  <label className="flex items-center gap-2 font-bold">
                    {item.title ? item.title.toUpperCase() : ''}
                  </label>
                  <input
                    type="text"
                    className="border p-4 rounded"
                    placeholder={item.title}
                    {...register(item.name, { required: `${item.title} không được để trống` })}
                  />
                  {errors[item.name] && (
                    <p className="text-red-500 text-sm">{errors[item.name].message}</p>
                  )}
                </div>
              ))}
              <div className="col-span-2">
                <select
                  className="select select-bordered w-full font-bold"
                  {...register("role_id", { required: "Role không được để trống" })}
                >
                  <option disabled value="">
                    Chọn role
                  </option>
                  {role.map((item) => (

                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
                {errors.role_id && (
                  <p className="text-red-500 text-sm">{errors.role_id.message}</p>
                )}
              </div>
            </div>
            <div className="mt-10">
              <button className="btn btn-outline" type="submit">Tạo nhân viên</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Tab1;
