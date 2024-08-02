import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useUpdateAccountMutation, useGetAccountQuery, useGetOneProfileQuery } from "../../../apis/slices/Account";

const cols = [
  {
    id: 1,
    name: "Tên",
    type: "text",
  },
  {
    id: 2,
    name: "tên đệm",
    type: "text",
  },
  {
    id: 3,
    name: "Địa chỉ",
    type: "text",
  },
  {
    id: 4,
    name: "CMND",
    type: "text",
  },
  {
    id: 5,
    name: "Số điện thoại",
    type: "text",
  },
];

const PageDetailStaff = () => {
  const { id } = useParams();
  const { data: acprofileData } = useGetOneProfileQuery(id);
  const [formData, setFormData] = useState({
    username: "",
    password: "123",
    role_id: 1,
    firstname: acprofileData?.data?.firstname || "",
    lastname: "",
    address: "",
    cccd: "",
    phone: "",
  });
  const [updateAccount] = useUpdateAccountMutation();
  const { data: accountData, error, isLoading } = useGetAccountQuery(id);
  console.log("🚀 ~ PageDetailStaff ~ acprofileData:", acprofileData)


  useEffect(() => {
    if (accountData) {
      setFormData({
        username: accountData.username || "",
        password: "", // Do not populate the password field
        role_id: accountData.role_id || 1,
        firstname: accountData.firstname || "",
        lastname: accountData.lastname || "",
        address: accountData.address || "",
        cccd: accountData.cccd || "",
        phone: accountData.phone || "",
      });
    }
  }, [accountData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccount({
        id, body: {
          username: formData.username,
          password: formData.password,
          role_id: formData.role_id,
        }
      }).unwrap();
      toast.success("Cập nhật nhân viên thành công!");
    } catch (error) {
      console.error("Failed to update account:", error);
      toast.error("Cập nhật nhân viên thất bại!");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading account details</div>;
  }

  return (
    <div className="w-[1360px] h-fit flex justify-start items-start flex-col gap-20">
      <div className="w-full grid grid-cols-3 gap-10">
        <div className="flex justify-start items-start gap-5 w-[400px]">
          <div className="avatar">
            <div className="w-24 rounded">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="Staff Avatar" />
            </div>
          </div>

          <div>
            <h1 className="font-bold">Nguyễn Thanh Hữu</h1>
            <h1 className="font-medium"></h1>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 w-[400px]">
          <label htmlFor="username" className="font-bold w-[100px]">Username</label>
          <input type="text" id="username" value={accountData.data.username} onChange={handleInputChange} className="input input-bordered w-72" />
        </div>
        <div className="flex justify-center items-center gap-2 w-[400px]">
          <label htmlFor="password" className="font-bold w-[100px]">Password</label>
          <input type="password" id="password" value={formData.password} onChange={handleInputChange} className="input input-bordered w-72" />
        </div>
      </div>
      <hr className="w-full h-[1px]" />
      <div className="grid grid-cols-3 gap-10 w-full">
        <div>
          <span className="text-gray-500">firstname</span>
          <p className="border p-3 rounded text-gray-500">{acprofileData.data.firstname}</p>
        </div>
        <div>
          <span className="text-gray-500">lastname</span>
          <p className="border p-3 rounded text-gray-500">{acprofileData.data.lastname}</p>
        </div>
        <div>
          <span className="text-gray-500">Địa chỉ</span>
          <p className="border p-3 rounded text-gray-500">{acprofileData.data.address}</p>
        </div>
        <div>
          <span className="text-gray-500">SĐT</span>
          <p className="border p-3 rounded text-gray-500">{acprofileData.data.phoneNumber}</p>
        </div>
        <div>
          <span className="text-gray-500">CCCD/CMND</span>
          <p className="border p-3 rounded text-gray-500">{acprofileData.data.CCCD}</p>
        </div>



      </div>
      <hr className="w-full h-[1px]" />

      <div className="w-full flex justify-end items-center gap-5">
        <button className="btn btn-success font-bold text-white" onClick={handleSubmit}>Cập nhật</button>
      </div>
    </div>
  );
};

export default PageDetailStaff;
