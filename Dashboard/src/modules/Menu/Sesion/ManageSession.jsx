import React, { useState } from "react";
import DayPickerCompoment from "./DayPickerCompoment";
import Table from "./Table";

const ManageSession = () => {
    const [dataDay,setDataDay] = useState({startday:'',enday:''})
  const handleCreateSession = () => {
    // Xử lý logic tạo phiên làm việc ở đây
    console.log("Tạo phiên làm việc cho các nhân viên:");
    document.getElementById("my_modal_sesionmanage").showModal();
  };
  return (
    <div>
      <button className="btn btn-primary mt-4" onClick={handleCreateSession}>
        Tạo Phiên Làm Việc
      </button>
      <dialog id="my_modal_sesionmanage" className="modal">
        <div className="modal-box flex gap-5 justify-between items-center w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <div>
            <label htmlFor="sessiondate" className="font-bold text-lg">
              Chọn ca làm
            </label>
            <DayPickerCompoment setDataDay={setDataDay}/>
          </div>

          <div className="w-fit flex flex-col gap-10">
            <div>
              <label htmlFor="startday" className="font-bold">Ngày bắt đầu</label>
              <input
                id="startday"
                type="text"
                value={dataDay.startday}
                className="input input-bordered input-accent w-full max-w-2xl"
              />
            </div>
            <div>
              <label htmlFor="endday" className="font-bold">Ngày kết thúc</label>
              <input
                id="endday"
                type="text"
                value={dataDay.enday}
   
                className="input input-bordered input-info w-full max-w-xs"
              />
            </div>

            <button className="btn btn-outline">Tạo ca làm</button>
          </div>

        </div>
      </dialog>

      <Table/>
    </div>
  );
};

export default ManageSession;
