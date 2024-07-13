import React, { useEffect, useRef, useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteCustomer } from "../../redux/slices/customerSlice"
import { FaEye } from "react-icons/fa"
import { MdEdit, MdDelete } from "react-icons/md"

import EditCustomer from "../Customer/EditCustomer"

const CustomerActionsDropdown = ({ row }) => {
  const [open, setOpen] = useState(false) //State to manage the dropdown
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false) // This is to manage the edit modal
  const dispatch = useDispatch()
  const ref = useRef()

  useEffect(() => {
    // Function to handle the click event
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Add the event listener to the document
    document.addEventListener("mousedown", handleClickOutside)

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div>
      {modalOpen && (
        <EditCustomer
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          customer={row.original}
        />
      )}
      <div
        className="relative cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        ref={ref}
      >
        <BsThreeDotsVertical />
        <div
          className={`absolute bottom-0 left-4 ${!open && "scale-0"} text-md flex w-[100px] origin-bottom-left flex-col overflow-hidden rounded-md border bg-white p-1 transition-all`}
        >
          <button
            className="flex items-center gap-1.5 rounded-rounded px-2 py-1 hover:bg-slate-300"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((prev) => !prev)
              sessionStorage.setItem("customerName", row.original.client)
              navigate(`./${row.original._id}`)
            }}
          >
            <FaEye />
            View
          </button>
          <button
            className="flex items-center gap-1.5 rounded-rounded px-2 py-1 hover:bg-slate-300"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((prev) => !prev)
              setModalOpen(true)
            }}
          >
            <MdEdit />
            Edit
          </button>
          <button
            className="flex items-center gap-1.5 rounded-rounded px-2 py-1 hover:bg-slate-300"
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
    </div>
  )
}

export default CustomerActionsDropdown
