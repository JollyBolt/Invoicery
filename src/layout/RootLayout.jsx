import React from "react"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import { useDispatch, useSelector } from "react-redux"
import { authSlice, checkToken } from "../redux/slices/authSlice"
import Auth from "../components/Auth"
import Loader from "../components/Loader"

const RootLayout = () => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(checkToken())
  }, [])
  return (
    <div className="bg-muted">
      {token === null ? (
        <>
        {console.log("object")}
        <Auth />
        </>
      ) : token === undefined ? (
        <></>
      ) : (
        <>
          <Sidebar />
          <div
            id="parent"
            className={`ml-[56px] max-w-screen-2xl bg-muted 2xl:mx-auto`}
          >
            {/* {token ? <Outlet /> : token === null ? <Auth /> : <Loader />} */}
            <Outlet />
          </div>
        </>
      )}
    </div>
  )
}

export default RootLayout
