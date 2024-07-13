import React, { useEffect, useRef, useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import EditProductModal from "../Products/EditProductModal"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../redux/slices/productSlice"
import { MdEdit, MdDelete } from "react-icons/md"

const ProductActionsDropdown = ({ row }) => {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
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
        <EditProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={row.original}
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
              setModalOpen(true)
              setOpen((prev) => !prev)
            }}
          >
            <MdEdit />
            Edit
          </button>
          <button
            className="flex items-center gap-1.5 rounded-rounded px-2 py-1 hover:bg-slate-300"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(deleteProduct(row.original._id))
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

export default ProductActionsDropdown
