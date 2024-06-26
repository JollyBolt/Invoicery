import React, { useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import { useNavigate } from "react-router-dom"
// import EditCustomerModal from "../Customers/EditCustomerModal"
import { useDispatch } from "react-redux"
import { deleteCustomer } from "../../redux/slices/customerSlice"
import EditCustomer from "../Customer/EditCustomer"

const CustomerActionsDropdown = ({ row }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  return (
    <div>
      <EditCustomer
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        customer={row.original}
      />
      <div
        className="cursor-pointer overflow-hidden rounded-rounded"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BsThreeDotsVertical />
        <div
          className={`absolute ${!open && "scale-0"} flex w-[80px] origin-top-left flex-col bg-white transition-all`}
        >
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={() => {
              setOpen((prev) => !prev)
              navigate(`./${row.original._id}`)
            }}
          >
            View
          </button>
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={() => {
              setModalOpen(true)
              setOpen((prev) => !prev)
            }}
          >
            Edit
          </button>
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={() => {
              dispatch(deleteCustomer(row.original._id))
              location.reload()
              setOpen((prev) => !prev)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default CustomerActionsDropdown
