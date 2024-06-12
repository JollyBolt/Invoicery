import PageWrapper from "../hoc/PageWrapper"
import Heading from "../components/Heading"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"
import Auth from "../components/Auth"

const InvoiceLayout = () => {
  const navigate = useNavigate()
  // const [formData,setFormData]=useState({

  // })
  //Checking if authtoken exists, i.e., logged in on refresh
  const { refreshAuth } = authSlice.actions
  const dispatch = useDispatch()
  const { loggedIn, loading } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(refreshAuth())
  }, [])
  return (
    <div>
      <Heading name="Invoice" />
      <div>{loggedIn === false ? <Auth /> : <Outlet />}</div>
    </div>
  )
}

export default PageWrapper(InvoiceLayout)
