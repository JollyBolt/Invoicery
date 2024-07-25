import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteInvoice } from "../../redux/slices/invoiceSlice"
import { useNavigate } from "react-router-dom"
import ViewInvoice from "../Invoice/ViewInvoice"
import { FaEye } from "react-icons/fa"
import { MdEdit, MdDelete } from "react-icons/md"

const InvoiceActions = ({ row }) => {
  const [modalOpen, setModalOpen] = useState(false) // This is to manage the edit modal

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEdit = () => {
    sessionStorage.clear()
    // sessionStorage.setItem("invoiceState", JSON.stringify(row.original))
    const invoice = row.original
    !sessionStorage.getItem("invoiceNumber") &&
      sessionStorage.setItem("invoiceNumber", invoice.invoiceNumber)
    !sessionStorage.getItem("date") &&
      sessionStorage.setItem(
        "date",
        invoice.invoiceDate.year +
          "-" +
          invoice.invoiceDate.month +
          "-" +
          invoice.invoiceDate.day,
      )
    !sessionStorage.getItem("purchaseOrder") &&
      invoice?.purchaseOrder &&
      sessionStorage.setItem("purchaseOrder", invoice.purchaseOrder)
    !sessionStorage.getItem("purchaseOrderDate") &&
      invoice?.purchaseOrderDate &&
      sessionStorage.setItem("purchaseOrderDate", invoice.purchaseOrderDate)
    !sessionStorage.getItem("billingAddress") &&
      sessionStorage.setItem(
        "billingAddress",
        JSON.stringify(invoice?.customer?.address?.billing),
      )
    !sessionStorage.getItem("shippingAddress") &&
      sessionStorage.setItem(
        "shippingAddress",
        JSON.stringify(invoice.customer.address.shipping),
      )
    !sessionStorage.getItem("customer") &&
      sessionStorage.setItem("customer", JSON.stringify(invoice.customer))
    !sessionStorage.getItem("products") &&
      sessionStorage.setItem("products", JSON.stringify(invoice.products))
    !sessionStorage.getItem("totalAmount") &&
      sessionStorage.setItem("totalAmount", invoice.totalAmount.toString())
    !sessionStorage.getItem("miscellaneous") &&
      sessionStorage.setItem("miscellaneous", invoice.miscellaneous.toString())
    !sessionStorage.getItem("taxes") &&
      sessionStorage.setItem("taxes", JSON.stringify(invoice.taxes))
    !sessionStorage.getItem("termsNConditions") &&
      sessionStorage.setItem(
        "termsNConditions",
        JSON.stringify(invoice?.termsNConditions),
      )
    sessionStorage.removeItem("invoiceState")
    sessionStorage.setItem("mode", "edit")
    navigate(`/invoice/${row.original._id}`)
  }

  return (
    <>
      {modalOpen && (
        <ViewInvoice
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          invoiceState={row.original}
        />
      )}
      <div className="flex gap-1">
        <button
          className="flex items-center gap-1.5 rounded-rounded px-2 hover:bg-border"
          onClick={(e) => {
            e.stopPropagation()
            setModalOpen((prev) => !prev)
          }}
        >
          <FaEye />
          View
        </button>

        <button
          className="flex items-center gap-1.5 rounded-rounded px-2 hover:bg-border"
          onClick={(e) => {
            e.stopPropagation()
            handleEdit()
          }}
        >
          <MdEdit />
          Edit
        </button>

        <button
          className="flex items-center gap-1.5 rounded-rounded px-2 text-red-500 hover:bg-border"
          onClick={(e) => {
            e.stopPropagation()
            dispatch(deleteInvoice(row.original._id))
            location.reload()
          }}
        >
          <MdDelete />
          Delete
        </button>
      </div>
    </>
  )
}

export default InvoiceActions
