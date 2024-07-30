import React from 'react'
import CreateSessions from './CreateSessions'
import ManageSession from './ManageSession'
 

const Tabs = () => {
  return (
    <div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tạo ca làm việc cho nhân viên " defaultChecked/>
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
  <CreateSessions/>
  </div>

  <input
    type="radio"
    name="my_tabs_2"
    role="tab"
    className="tab"
    aria-label="Quản lý ca làm việc"
     />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
  <ManageSession/>  
  </div>

  
</div>
  )
}

export default Tabs