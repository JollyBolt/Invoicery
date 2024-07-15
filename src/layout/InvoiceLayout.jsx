import PageWrapper from "../hoc/PageWrapper"
import { Outlet } from "react-router-dom"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"
import Auth from "../components/Auth"

const InvoiceLayout = () => {

  //Checking if authtoken exists, i.e., logged in on refresh
  // const { refreshAuth } = authSlice.actions
  const dispatch = useDispatch()
  const { loggedIn, loading } = useSelector((state) => state.auth)
  // useEffect(() => {
  //   dispatch(refreshAuth())
  // }, [])
  return (
    <div>
      <div className="mt-4">{loggedIn === false ? <Auth /> : <Outlet />}</div>
    </div>
  )
}

export default PageWrapper(InvoiceLayout)
