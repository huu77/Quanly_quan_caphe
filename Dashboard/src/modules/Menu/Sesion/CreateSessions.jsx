import React, { useEffect, useState } from "react";
import {
  useGetAllDetailSessionQuery,
  useGetAllNVToTypeQuery,
  useGetAllSessionQuery,
  usePostCreateSessionDetailMutation,
} from "../../../apis/slices/Session";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import ModelTable from "./ModelTable";

const CreateSessions = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [formChecked, setFormChecked] = useState({
    staff: false,
    bartender: false,
  });
  const [getQueryString, setQueryString] = useState("");
  const [selectedShift, setSelectedShift] = useState(""); // State để lưu trữ ca làm việc chọn
  const { data, refetch } = useGetAllNVToTypeQuery(getQueryString);

  const toggleEmployee = (id) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((empId) => empId !== id)
        : [...prevSelected, id]
    );
  };

  const handleCreateSession = () => {
    document.getElementById("my_modal_3").showModal();
  };

  const handleChangeInput = (e) => {
    const { name, checked } = e.target;
    setFormChecked((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      let queryString = "";

      if (formChecked.staff && !formChecked.bartender) {
        queryString = "roleIds=1";
      } else if (!formChecked.staff && formChecked.bartender) {
        queryString = "roleIds=2";
      } else if (formChecked.staff && formChecked.bartender) {
        queryString = "roleIds=1&roleIds=2"; // Đổi thành 'roleIds=1,2'
      } else if (!formChecked.staff && !formChecked.bartender) {
        queryString = "";
      }

      setQueryString(queryString);
      await refetch();
    };

    fetchData();
  }, [formChecked]);
  const { data: Data } = useGetAllSessionQuery();
  const [CreatedDetailSession] = usePostCreateSessionDetailMutation();
  const handleClick = async () => {
    console.log("Ca làm việc chọn:", selectedShift);
    console.log("ID nhân viên:", selectedEmployees);
    try {
      const kq = await CreatedDetailSession({
        session_id: selectedShift,
        arr: selectedEmployees,
      });
      console.log(kq);
      if (kq.data.statusCode === 201) {
        toast.success("Tạo thành công!");
      } else {
        toast.error("Tạo thất bại");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const { data: DataDetailSession } = useGetAllDetailSessionQuery();
  console.log("🚀 ~ DataDetailSession:", DataDetailSession)
  const handleClickShowModalSeeNV = (index) => {

    document.getElementById(index).showModal()
  }
  return (
    <div className="p-4">
      <div className="flex justify-start items-center gap-4">
        <span className="text-2xl font-bold mb-4">Chọn Nhân Viên</span>

        <div className="form-control">
          <label className="cursor-pointer label gap-2">
            <span className="label-text">Nhân viên phục vụ</span>
            <input
              type="checkbox"
              name="staff"
              checked={formChecked.staff}
              onChange={handleChangeInput}
              className="checkbox checkbox-accent"
            />
          </label>
        </div>
        <div className="form-control">
          <label className="cursor-pointer label gap-2">
            <span className="label-text">Nhân viên quầy</span>
            <input
              type="checkbox"
              name="bartender"
              checked={formChecked.bartender}
              onChange={handleChangeInput}
              className="checkbox checkbox-success"
            />
          </label>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data?.data?.map((employee) => (
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
              <span className="ml-2 font-bold">
                {employee.lastname + " " + employee.firstname}
              </span>
              <span className="ml-2">{employee.name}</span>
            </div>
            <img
              src={"https://via.placeholder.com/150"}
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
        <div className="modal-box w-[600px]">
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

            <select
              className="select select-accent w-full max-w-xs"
              onChange={(e) => setSelectedShift(e.target.value)}
              value={selectedShift}
            >
              <option disabled selected>
                Chọn ca làm
              </option>
              {Data && Data.data ? (
                Data?.data.map((i, index) => (
                  <option value={i.id} key={index}>{`Thứ ${i.day_of_week
                    } - Ngày ${format(parseISO(i.start_time), "dd/MM/yyyy")} - Ca ${i.typeSession
                    }`}</option>
                )))
                :
                (<p>chưa có ca làm</p>)
              }
            </select>

            <div className="flex justify-start items-center gap-5">
              <button className="btn btn-outline" onClick={handleClick}>
                Tạo ca làm
              </button>
              <form method="dialog">
                <button className="btn btn-outline btn-error">Hủy</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      {/* table show ca làm việc */}
      <div className="overflow-x-auto mt-5 flex flex-col justify-start items-center">
        <h1 className="font-bold"> DANH SÁCH CHI TIẾT CA LÀM</h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Ngày</th>
              <th>Ca</th>
              <th>Số lương nhân viên</th>
            </tr>
          </thead>
          <tbody>
            {DataDetailSession && DataDetailSession.data ? (
              DataDetailSession.data.map((i, index) => (
                <React.Fragment key={index}>
                  <tr
                    className="hover:bg-blue-400 hover:text-white cursor-pointer"
                    onClick={() => handleClickShowModalSeeNV(index)}
                  >
                    <th>{index + 1}</th>
                    <td>{format(parseISO(i.start_time), "dd/MM/yyyy")}</td>
                    <td>{i.typeSession || "-"}</td>
                    <td>{i.TOTAL} nhân viên</td>
                  </tr>
                  <dialog id={`modal-${index}`} className="modal">
                    <div className="modal-box">
                      <ModelTable id={i.session_id} />
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">chưa có nhân viên</td>
              </tr>
            )}
          </tbody>

        </table>
      </div>


    </div>
  );
};

export default CreateSessions;
