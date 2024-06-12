import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleCustomer } from "../../redux/slices/customerSlice"

const CustomerDetail = () => {
  const id = useParams().id
  // console.log(id)
  const dispatch = useDispatch()
  const { customers } = useSelector((state) => state.customers)
  const customerDetails = customers[0]
  // useEffect(() => {
  //   dispatch(fetchSingleCustomer(id))
  // }, [])
  // console.log(customerDetails)
  return <div>CustomerDetail</div>
}

export default CustomerDetail
