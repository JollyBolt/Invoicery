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
          className="hover:bg-border flex items-center gap-1.5 rounded-rounded px-2"
          onClick={(e) => {
            e.stopPropagation()
            setModalOpen((prev) => !prev)
          }}
        >
          <FaEye />
          View
        </button>

        <button
          className="hover:bg-border flex items-center gap-1.5 rounded-rounded px-2"
          onClick={(e) => {
            e.stopPropagation()
            sessionStorage.setItem("invoiceState", JSON.stringify(row.original))
            sessionStorage.setItem("mode", "edit")
            navigate(`./${row.original._id}`)
          }}
        >
          <MdEdit />
          Edit
        </button>

        <button
          className="hover:bg-border flex items-center gap-1.5 rounded-rounded px-2 text-red-500"
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
