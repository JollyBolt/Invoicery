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
        className="cursor-pointer rounded-rounded relative"
        onClick={() => setOpen((prev) => !prev)}
      >
        <BsThreeDotsVertical />
        <div
          className={`absolute bottom-0 left-4 ${!open && "scale-0"} flex w-[80px] origin-bottom-left flex-col bg-white transition-all`}
        >
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((prev) => !prev)
              navigate(`./${row.original._id}`)
            }}
          >
            View
          </button>
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((prev) => !prev)
              setModalOpen(true)
            }}
          >
            Edit
          </button>
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
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
