import React, { useState } from "react"
import { BsThreeDotsVertical } from "../../assets"
import { useNavigate } from "react-router-dom"
import EditProductModal from "../Products/EditProductModal"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../redux/slices/productSlice"

const ProductActionsDropdown = ({ row }) => {
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  return (
    <div>
      <EditProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={row.original}
      />
      <div
        className="cursor-pointer overflow-hidden rounded-rounded"
        onClick={() => setOpen(prev => !prev)}
      >
        <BsThreeDotsVertical />
        <div
          className={`absolute ${!open && "scale-0"} flex w-[80px] origin-top-left flex-col bg-white transition-all`}
        >
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              setModalOpen(true)
              setOpen(prev => !prev)
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
              setOpen(prev => !prev)
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
