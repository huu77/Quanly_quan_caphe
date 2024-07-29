import React, { useState, useEffect } from "react";
import DayPickerCompoment from "./DayPickerCompoment";
import Table from "./Table";
import { format, addHours, parse, startOfWeek, startOfMonth, startOfYear, endOfWeek, endOfMonth, endOfYear } from "date-fns";
import {
  useGetAllSessionQuery,
  usePostCreateSessionMutation,
} from "../../../apis/slices/Session";
import { toast } from "react-toastify";

const converData = { sang: 4, toi: 4, chieu: 4, fulltime: 12 };
const getWeekNumber = (date = new Date()) => {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startDate.getDay() + 1) / 7);
};
const ManageSession = () => {
  const [session, setSession] = useState({ type: "", time: 0 });
  const [dataDay, setDataDay] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [week, setWeek] = useState(getWeekNumber());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

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
      setEndDate(format(endTime, "yyyy-MM-dd HH:mm:ss"));
      setStartDate(format(startTime, "yyyy-MM-dd HH:mm:ss"));
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

    const dateTimeString = `${date}T${startHour}:00:00`;
    return parse(dateTimeString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
  };

  const { data, refetch } = useGetAllSessionQuery();
  const [postCreateSession] = usePostCreateSessionMutation();

  const handleCreate = async () => {
    try {
      const kq = await postCreateSession({
        start_time: StartDate,
        end_time: endDate,
        typeSession: session.type,
      });

      if (kq.error) {
        toast.error(kq.error.data);
      } else {
        toast.success("Tạo phiên làm việc thành công!");
        refetch();
      }
    } catch (error) {
      toast.error(error);
    }
  };
const [DataF,setDataF] = useState([])
  const handelSearch = async () => {
    // Example: Adjust the API call or method to use filters
    try {
      const start = startOfWeek(new Date(year, month - 1), { weekStartsOn: 1 });
      const end = endOfWeek(new Date(year, month - 1), { weekStartsOn: 1 });
      const startOfMonthDate = startOfMonth(new Date(year, month - 1));
      const endOfMonthDate = endOfMonth(new Date(year, month - 1));
      const startOfYearDate = startOfYear(new Date(year));
      const endOfYearDate = endOfYear(new Date(year));
        
      // Modify your API call or state update to apply these filters
      // e.g., pass these dates to your API or use in state for filtering
      console.log("Filter by:", { startOfMonthDate, endOfMonthDate, startOfYearDate, endOfYearDate });


    } catch (error) {
      toast.error(error.message);
    }
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
              <button className="btn btn-outline" onClick={handleCreate}>
                Tạo ca làm
              </button>
            </div>
          </div>
        </div>
      </dialog>
      <div className="flex flex-col gap-4 mt-5">
        <h1 className="font-bold">Bộ lọc</h1>
        <div className="flex justify-start items-center w-1/2 gap-4">
          <label className="input input-bordered flex items-center gap-2">
            Tuần
            <input
              type="number"
              min={1}
              max={52}
              value={week}
              onChange={(e) => setWeek(Number(e.target.value))}
              className="grow"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Tháng
            <input
              type="number"
              min={1}
              max={12}
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="grow"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            Năm
            <input
              type="number"
              min={1900}
              max={2100}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="grow"
            />
          </label>
          <button className="btn btn-outline" onClick={handelSearch}>
            Tìm
          </button>
        </div>
      </div>
      <Table data={data} refetch={refetch} />
    </div>
  );
};

export default ManageSession;
