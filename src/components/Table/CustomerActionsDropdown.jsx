import React, { useEffect, useRef, useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { deleteCustomer } from "../../redux/slices/customerSlice"
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
        className="relative cursor-pointer rounded-rounded"
        onClick={() => setOpen((prev) => !prev)}
        ref={ref}
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
              console.log(row.original)
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
