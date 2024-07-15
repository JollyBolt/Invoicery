import {useEffect} from "react"
import { Outlet } from "react-router-dom"
import Auth from "../components/Auth"
import { useDispatch, useSelector } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"
import PageWrapper from "../hoc/PageWrapper"

const CustomerLayout = () => {
    // const { refreshAuth } = authSlice.actions
    const dispatch = useDispatch()
    const { loggedIn } = useSelector((state) => state.auth)
    // useEffect(() => {
    //   dispatch(refreshAuth())
    // }, [])

  return (
    <div className="mt-4 flex min-h-[calc(100dvh-80px)] w-full flex-col">
      {loggedIn === false ? <Auth /> : <Outlet />}
    </div>
  )
}

export default PageWrapper(CustomerLayout)
