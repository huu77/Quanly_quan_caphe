import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="drawer z-50">
    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
    <div className="drawer-content">
 
    </div>
    <div className="drawer-side">
      <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li><Link to={''} >Home</Link></li>
        <li><Link to={'staff'} >Nhân viên</Link></li>
        <li><Link to={'session'} >Tạo phiên làm việc</Link> </li>
        <li><Link to={'category'} >Tạo danh mục sản phẩm</Link> </li>
        <li><Link to={'orther'} >Tạo thành phần phụ</Link> </li>
        <li><Link to={'listcustomer'} >Danh sách khách hàng</Link> </li>
      </ul>
    </div>
  </div>
  )
}

export default Sidebar