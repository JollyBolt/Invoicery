import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleCustomer } from "../../redux/slices/customerSlice"

const CustomerDetail = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.customers)
  const customerDetails = useSelector((state) => state.customers.customers)
  const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getCustomer() {
      if (loggedIn) {
        await dispatch(fetchSingleCustomer(id))
      }
    }
    getCustomer()
  }, [loggedIn])

  return <div>CustomerDetail</div>
}

export default CustomerDetail
