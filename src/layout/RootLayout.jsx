import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'

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