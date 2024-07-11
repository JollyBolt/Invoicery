import React, { useEffect, useRef, useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import { useDispatch } from "react-redux"
import { deleteInvoice } from "../../redux/slices/invoiceSlice"
import { useNavigate } from "react-router-dom"
import ViewInvoice from "../Invoice/ViewInvoice"

const InvoiceActionsDropdown = ({ row }) => {
  const [open, setOpen] = useState(false) //State to manage the dropdown
  const [modalOpen, setModalOpen] = useState(false) // This is to manage the edit modal

  const navigate = useNavigate()
  const ref = useRef()
  const dispatch = useDispatch()

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
    <>
      <ViewInvoice
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        invoiceState={row.original}
      />
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
              setModalOpen((prev) => !prev)
            }}
          >
            View
          </button>

          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((prev) => !prev)
              sessionStorage.setItem(
                "invoiceState",
                JSON.stringify(row.original),
              )
              navigate(`./${row.original._id}`)
            }}
          >
            Edit
          </button>

          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(deleteInvoice(row.original._id))
              location.reload()
              setOpen((prev) => !prev)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default InvoiceActionsDropdown
