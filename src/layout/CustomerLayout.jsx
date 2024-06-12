import {useEffect,useState} from "react"

import { Outlet } from "react-router-dom"
import Auth from "../components/Auth"
import CreateCustomer from "../components/Customer/CreateCustomer"
import Heading from "../components/Heading"
import { useDispatch, useSelector } from "react-redux"
import { authSlice } from "../redux/slices/authSlice"
import PageWrapper from "../hoc/PageWrapper"

const CustomerLayout = () => {
    const { refreshAuth } = authSlice.actions
    const dispatch = useDispatch()
    const { loggedIn } = useSelector((state) => state.auth)
    useEffect(() => {
      dispatch(refreshAuth())
    }, [])

  return (
    <div className="flex min-h-[calc(100dvh-40px)] w-full flex-col">
      <Heading name="Customers" />
      <div className="mt-5">{loggedIn === false ? <Auth /> : <Outlet />}</div>
    </div>
  )
}

export default PageWrapper(CustomerLayout)
