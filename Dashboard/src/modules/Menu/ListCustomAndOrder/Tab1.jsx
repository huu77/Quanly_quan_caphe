import React from "react";
import { toast } from "react-toastify";
import { useGetAllCustomerQuery } from "../../../apis/slices/Customer";
import index from './../../../../../fe-NV/src/modules/Menu/index';

const Tab1 = () => {
  const { data } = useGetAllCustomerQuery();
  console.log("🚀 ~ Tab1 ~ data:", data);

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="flex justify-between px-[50px]">
            <th></th>
            <th>Tên</th>
            <th>Số diện thoại</th>
          </tr>
        </thead>
        <tbody >
          {data && data.data ? (
            data.data.map((item, index) => (
              <tr key={index} className="flex justify-between px-[50px]">
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">Chưa có khách hàng nào!</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tab1;
