import React from 'react'
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Tab3 from './Tab3'
 
const Tabs = () => {
    
  return (
    <div role="tablist" className="tabs tabs-lifted">
  <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tạo bàn " defaultChecked/>
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <Tab1/>
  </div>

  <input
    type="radio"
    name="my_tabs_2"
    role="tab"
    className="tab"
    aria-label="Tạo trạng thái của bàn"
     />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <Tab2/>
  </div>
  <input
    type="radio"
    name="my_tabs_2"
    role="tab"
    className="tab"
    aria-label="Tạo trạng thái "
     />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
    <Tab3/>
  </div>
 
</div>
  )
}

export default Tabs