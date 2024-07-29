import React, { useState, useEffect } from "react";
import DayPickerCompoment from "./DayPickerCompoment";
import Table from "./Table";
import { format, addHours, parse } from "date-fns";

const converData = { sang: 4, toi: 4, chieu: 4, fulltime: 12 };

const ManageSession = () => {
  const [session, setSession] = useState({ type: "", time: 0 });
  const [dataDay, setDataDay] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleCreateSession = () => {
    console.log("Tạo phiên làm việc cho các nhân viên:");
    document.getElementById("my_modal_sesionmanage").showModal();
  };

  const handleSessionChange = (e) => {
    const selectedType = e.target.value;
    const selectedData = converData[selectedType];
    setSession({ type: selectedType, time: selectedData });
  };

  useEffect(() => {
    if (session.type && dataDay) {
      const startTime = getStartTime(session.type, dataDay);
      const endTime = addHours(startTime, session.time);
      setEndDate(format(endTime, "yyyy-MM-dd HH:mm"));
      setStartDate(format(startTime, "yyyy-MM-dd HH:mm"));
    }
  }, [session, dataDay]);

  const getStartTime = (type, date) => {
    let startHour = 8;
    switch (type) {
      case "sang":
        startHour = 8;
        break;
      case "chieu":
        startHour = 13;
        break;
      case "toi":
        startHour = 18;
        break;
      case "fulltime":
        startHour = 8;
        break;
      default:
        startHour = 8;
    }

    // Chuyển đổi định dạng ngày tháng từ yyyy-MM-dd thành yyyy-MM-dd
    const dateTimeString = `${date}T${startHour}:00:00`;
    return parse(dateTimeString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  };

  return (
    <div>
      <button className="btn btn-primary mt-4" onClick={handleCreateSession}>
        Tạo Phiên Làm Việc
      </button>
      <dialog id="my_modal_sesionmanage" className="modal">
        <div className="modal-box flex flex-col gap-5 justify-between items-center w-11/12 max-w-5xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex gap-10 ">
            <div>
              <label htmlFor="sessiondate" className="font-bold text-lg">
                Chọn ca làm
              </label>
              <DayPickerCompoment setDataDay={setDataDay} />
            </div>

            <div className="w-fit flex flex-col gap-10">
              <div>
                <label htmlFor="session" className="font-bold">
                  Chọn ca
                </label>
                <select
                  className="select select-accent w-full max-w-xs"
                  id="session"
                  value={session.type}
                  onChange={handleSessionChange}
                >
                  <option disabled selected>
                    Chọn ca làm
                  </option>
                  <option value="sang">Sáng</option>
                  <option value="chieu">Chiều</option>
                  <option value="toi">Tối</option>
                  <option value="fulltime">Làm toàn thời gian</option>
                </select>
              </div>
              <div>
                <label htmlFor="startday" className="font-bold">
                  Ngày bắt đầu
                </label>
                <input
                  id="startday"
                  type="text"
                  value={StartDate}
                  className="input input-bordered input-accent w-full max-w-2xl"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="endday" className="font-bold">
                  Ngày kết thúc
                </label>
                <input
                  id="endday"
                  type="text"
                  value={endDate}
                  className="input input-bordered input-info w-full max-w-xs"
                  readOnly
                />
              </div>
              <button className="btn btn-outline">Tạo ca làm</button>
            </div>
          </div>
        </div>
      </dialog>

      <Table />
    </div>
  );
};

export default ManageSession;
