import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteCustomer } from "../../redux/slices/customerSlice"
import { FaEye } from "react-icons/fa"
import { MdEdit, MdDelete } from "react-icons/md"
import EditCustomer from "../Customer/EditCustomer"

const CustomerActions = ({ row }) => {
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false) // This is to manage the edit modal
  const dispatch = useDispatch()

  return (
    <div>
      {modalOpen && (
        <EditCustomer
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          customer={row.original}
        />
      )}
      <div className="flex gap-1">
        <button
          className="hover:bg-border flex items-center gap-1.5 rounded-rounded px-2"
          onClick={(e) => {
            e.stopPropagation()
            setModalOpen((prev) => !prev)
            sessionStorage.setItem("customerName", row.original.client)
            navigate(`./${row.original._id}`)
          }}
        >
          <FaEye />
          View
        </button>
        <button
          className="hover:bg-border flex items-center gap-1.5 rounded-rounded px-2"
          onClick={(e) => {
            e.stopPropagation()
            setModalOpen(true)
          }}
        >
          <MdEdit />
          Edit
        </button>
        <button
          className="hover:bg-border flex items-center gap-1.5 rounded-rounded px-2 text-red-500"
          onClick={(e) => {
            e.stopPropagation()
            dispatch(deleteCustomer(row.original._id))
            location.reload()
            setOpen((prev) => !prev)
          }}
        >
          <MdDelete />
          Delete
        </button>
      </div>
    </div>
  )
}

export default CustomerActions
