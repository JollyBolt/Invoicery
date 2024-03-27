import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'

const RootLayout = () => {
  return (
    <div>
        RootLayout
        <Sidebar/>
        <Outlet />
    </div>
  )
}

export default RootLayout