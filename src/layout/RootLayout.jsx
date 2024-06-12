import React from "react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"

const RootLayout = () => {
  const [open, setOpen] = useState(false)
  const { refreshAuth } = authSlice.actions
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshAuth())
  }, [])
  return (
    <>
      <Sidebar
        open={open}
        setOpen={setOpen}
        navBg="foreground"
        navHeading="secondary"
      />
      <div
        id="parent"
        className={`ml-[64px] bg-slate-100 transition-all duration-500`}
      >
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout
