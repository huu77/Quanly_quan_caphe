import React from "react";
import { useGetAllNVtoSessionQuery } from "../../../apis/slices/Session";

const ModelTable = ({ id }) => {
  const { data } = useGetAllNVtoSessionQuery(id);
 
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Số điện thoại</th>
            <th>CCCD</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((i, index) => (
            <tr key={index}>
              <th>{index+1}</th>
              <td>{i.lastname+" "+i.firstname}</td>
              <td>{i.phoneNumber}</td>
              <td>{i.CCCD}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModelTable;
