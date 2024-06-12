import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { customerSlice } from "../../redux/slices/customerSlice"
import { productSlice } from "../../redux/slices/productSlice"
import { openEditCustomerModal } from "../Invoice/EditInvoice"

const navigate = useNavigate()
const dispatch = useDispatch()
const customerActions = [
  {
    name: "View",
    id: "view",
    method: (customerId) => {
      navigate(`customerDetail/${customerId}`)
    },
  },
  {
    name: "Edit",
    id: "edit",
    method: () => {
      openEditCustomerModal(true)
      //  dispatch(authSlice.actions.editCustomer(customerId,body))
    },
  },
  {
    name: "Delete",
    id: "delete",
    method: (customerId) => {
      dispatch(customerSlice.actions.deleteCustomer(customerId))
    },
  },
]

const invoiceActions = [
  {
    name: "View",
    id: "view",
    method: (invoiceId) => {
      navigate(`viewInvoice/${invoiceId}`)
    },
  },
  {
    name: "Edit",
    id: "edit",
    method: (invoiceId) => {
      //  dispatch(authSlice.actions.editCustomer(customerId,body))
      navigate(`editInvoice/${invoiceId}`)
    },
  },
  {
    name: "Delete",
    id: "delete",
    method: (invoiceId) => {
      //   dispatch(customerSlice.actions.deleteCustomer(invoiceId))
    },
  },
]

const productActions = [
  {
    name: "Edit",
    id: "edit",
    method: (productId) => {
      //  dispatch(authSlice.actions.editCustomer(customerId,body))
    },
  },
  {
    name: "Delete",
    id: "delete",
    method: (productId) => {
      dispatch(productSlice.actions.deleteProduct(productId))
    },
  },
]

export { customerActions, invoiceActions, productActions }
