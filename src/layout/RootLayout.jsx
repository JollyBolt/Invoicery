import React from "react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useDispatch,useSelector } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"

const RootLayout = () => {
  // const { refreshAuth } = authSlice.actions
  const dispatch = useDispatch()
  const {token}=useSelector((state)=>state.auth)
  // useEffect(() => {
  //   dispatch(refreshAuth())
  // }, [])
  return (
    <div className="bg-muted">
      <Sidebar />
      <div
        id="parent"
        className={`ml-[56px] max-w-screen-2xl bg-muted 2xl:mx-auto`}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
