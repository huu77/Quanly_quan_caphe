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
    try {
      const response = await createAccount(formData).unwrap();
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
      role_id: null,
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
              {numberIN.map((i) => (
                <div className="flex flex-col h-[100px]">
                  <label
                    className={` flex items-center gap-2 font-bold ${i.name === "address" ? "col-span-2" : ""}`}
                    key={i.id}
                  >
                  </label>
                  {i.title ? i.title.toUpperCase() : ''}
                  <input
                    type="text"
                    className=" border p-4 rounded"
                    placeholder={i.title}
                    {...register(i.name, { required: `${i.title} không được để trống` })}
                  />
                  {errors[i.name] && (
                    <p className="text-red-500 text-sm">{errors[i.name].message}</p>
                  )}
                </div>

              ))}
              <div></div>
              <select
                className="select select-bordered w-full font-bold col-span-2"
                {...register("role_id", { required: "Role không được để trống" })}
              >
                <option disabled value="">
                  Chọn role
                </option>
                <option value="1">Nhân viên phục vụ</option>
                <option value="2">Nhân viên quầy</option>
              </select>
              {errors.role_id && (
                <p className="text-red-500 text-sm">{errors.role_id.message}</p>
              )}
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
