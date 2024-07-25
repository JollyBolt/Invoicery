import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import Auth from "../components/Auth"
import { useDispatch, useSelector } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"
import PageWrapper from "../hoc/PageWrapper"
import Loader from "../components/Loader"

const CustomerLayout = () => {
  // const { refreshAuth } = authSlice.actions
  const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(refreshAuth())
  // }, [])

  return (
    <div>
   <Outlet/>
    </div>
  )
}

export default PageWrapper(CustomerLayout)
