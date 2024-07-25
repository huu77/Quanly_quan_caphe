import React from "react";
const cols = [
  {
    id: 1,
    name: "Tên",
    type: "text",
  },
  {
    id: 2,
    name: "Giới tính",
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
const index = () => {
  return (
    <div className="w-[1360px] h-fit flex justify-start items-start flex-col gap-20">
      <div className="  w-full grid grid-cols-3 gap-10">
        <div className="flex justify-start items-start gap-5 w-[400px]">
          <div className="avatar">
            <div className="w-24 rounded">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>

          <div>
            <h1 className="font-bold ">Nguyễn Thanh Hữu</h1>
            <h1 className="font-medium ">Giới tính: Nam</h1>
          </div>
        </div>

        {/* username , password */}

        <div
          className="flex justify-center items-center gap-2 w-[400px]"
          key={index}
        >
          <label htmlFor="Usename" className="font-bold w-[100px]">
            Usename
          </label>
          <input type="text" id="Usename" className="input input-bordered w-72" />
        </div>
        <div
          className="flex justify-center items-center gap-2 w-[400px]"
          key={index}
        >
          <label htmlFor="Password" className="font-bold w-[100px]">
          Password
          </label>
          <input type="text" id="Password" className="input input-bordered w-72" />
        </div>
      </div>
<hr  className="w-full h-[1px]"/>
      {/*  các input con lai */}
      <div className=" grid grid-cols-3 gap-10 w-full">
        {cols.map((i, index) => (
          <div
            className="flex justify-start items-start gap-2 w-[400px]"
            key={index}
          >
            <label htmlFor={i.name} className="font-bold w-[100px]">
              {i.name}
            </label>
            <input
              type={i.type}
              id={i.name}
              className="input input-bordered w-72"
            />
          </div>
        ))}
      </div>
      <hr  className="w-full h-[1px]"/>

      {/*  button  */}
      <div className="w-full flex justify-end items-center gap-5">
        <button className="btn btn-success font-bold text-white">Cập nhập</button>
      </div>
    </div>
  );
};

export default index;
