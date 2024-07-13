import React, { useEffect, useRef, useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import { useDispatch } from "react-redux"
import { deleteInvoice } from "../../redux/slices/invoiceSlice"
import { useNavigate } from "react-router-dom"
import ViewInvoice from "../Invoice/ViewInvoice"
import { FaEye } from "react-icons/fa"
import { MdEdit, MdDelete } from "react-icons/md"

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
      {modalOpen && (
        <ViewInvoice
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          invoiceState={row.original}
        />
      )}
      <div
        className="relative cursor-pointer rounded-rounded"
        onClick={() => setOpen((prev) => !prev)}
        ref={ref}
      >
        <BsThreeDotsVertical />
        <div
          className={`absolute bottom-0 left-4 ${!open && "scale-0"} text-md bg-background flex w-[100px] origin-bottom-left flex-col overflow-hidden rounded-md border p-1 transition-all`}
        >
          <button
            className="flex items-center gap-1.5 rounded-rounded px-2 py-1 hover:bg-slate-300"
            onClick={(e) => {
              e.stopPropagation()
              setOpen((prev) => !prev)
              setModalOpen((prev) => !prev)
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
              sessionStorage.setItem(
                "invoiceState",
                JSON.stringify(row.original),
              )
              navigate(`./${row.original._id}`)
            }}
          >
            <MdEdit />
            Edit
          </button>

          <button
            className="flex items-center gap-1.5 rounded-rounded px-2 py-1 hover:bg-slate-300"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(deleteInvoice(row.original._id))
              location.reload()
              setOpen((prev) => !prev)
            }}
          >
            <MdDelete />
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

export default InvoiceActionsDropdown
