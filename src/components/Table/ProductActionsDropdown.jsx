import React, { useEffect, useRef, useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import { useNavigate } from "react-router-dom"
import EditProductModal from "../Products/EditProductModal"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../redux/slices/productSlice"

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
      <EditProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={row.original}
      />
      <div
        className="relative cursor-pointer rounded-rounded"
        onClick={() => setOpen((prev) => !prev)}
        ref={ref}
      >
        <BsThreeDotsVertical />
        <div
          className={`absolute bottom-0 left-4 border ${!open && "scale-0"} flex w-[80px] origin-bottom-left flex-col bg-white transition-all`}
        >
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              setModalOpen(true)
              setOpen((prev) => !prev)
            }}
          >
            Edit
          </button>
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(deleteProduct(row.original._id))
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

export default ProductActionsDropdown
