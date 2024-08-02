import React from 'react'
import Header from '../../components/Hearder/index'
import ListCard from '../../components/ListCard'

const index = () => {
  return (
    <div >

      <Header />
      <p className='text-green-500'>chọn bàn : </p>
      <ListCard />
    </div>
  )
}

export default index