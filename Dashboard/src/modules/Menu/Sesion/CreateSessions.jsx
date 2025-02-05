import React, { useState } from "react";
import DayPickerCompoment from "./DayPickerCompoment";

const employees = [
  {
    id: 1,
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 4,
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 5,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 6,
    name: "Alice Johnson",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 7,
    name: "John Doe",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 8,
    name: "Jane Smith",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
  {
    id: 9,
    name: "Alice Johnson",
    avatar: "https://via.placeholder.com/150",
    role: "Staff",
  },
];

const CreateSessions = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const toggleEmployee = (id) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((empId) => empId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCreateSession = () => {
    // Xử lý logic tạo phiên làm việc ở đây
    console.log("Tạo phiên làm việc cho các nhân viên:", selectedEmployees);
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <div className="p-4">
      <div className="flex justify-start items-center gap-4">
        <span className="text-2xl font-bold mb-4">Chọn Nhân Viên</span>

        <div className="form-control">
          <label className="cursor-pointer label gap-2">
            <span className="label-text">Nhân viên phục vụ</span>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-accent"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label gap-2">
            <span className="label-text">Nhân viên quầy</span>
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-success"
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="flex items-center justify-start gap-2"
          >
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              checked={selectedEmployees.includes(employee.id)}
              onChange={() => toggleEmployee(employee.id)}
            />
            <div className="flex flex-col">
              <span className="ml-2 font-bold">{employee.name}</span>
              <span className="ml-2">{employee.role}</span>
            </div>
            <img
              src={employee.avatar}
              alt={employee.name}
              className="w-12 h-12 rounded-lg ml-2"
            />
          </div>
        ))}
      </div>
      <button className="btn btn-primary mt-4" onClick={handleCreateSession}>
        Tạo Phiên Làm Việc
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-[600px] ">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div className="flex flex-col justify-start items-start gap-5 w-full">
            <label htmlFor="sessiondate" className="font-bold text-lg">
              Danh sách ca trong tuần tới
            </label>
            <select className="select select-accent w-full max-w-xs">
              <option disabled selected>
                Chọn ngày
              </option>
              <option>Thứ 2 ngày 1/1/2021</option>
              <option>Thứ 3 ngày 1/1/2021</option>
              <option>Thứ 4 ngày 1/1/2021</option>
            </select>
            <select className="select select-accent w-full max-w-xs">
              <option disabled selected>
                Chọn ca làm
              </option>
              <option>Sáng</option>
              <option>Chiều</option>
              <option>Tối</option>
              <option>Làm toàn thời gian</option>
            </select>
            <div className="flex justify-start items-center gap-5">
              <button className="btn btn-outline">Tạo ca làm</button>
              <form method="dialog">
                <button className="btn btn-outline btn-error">Hủy</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CreateSessions;
