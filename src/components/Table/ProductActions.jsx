import React, { useState } from "react"
import EditProductModal from "../Products/EditProductModal"
import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../redux/slices/productSlice"
import { MdEdit, MdDelete } from "react-icons/md"

const ProductActions = ({ row }) => {
  const [modalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()

  return (
    <div>
      {modalOpen && (
        <EditProductModal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          product={row.original}
        />
      )}
      <div className="flex gap-1">
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
            dispatch(deleteProduct(row.original._id))
            location.reload()
          }}
        >
          <MdDelete />
          Delete
        </button>
      </div>
    </div>
  )
}

export default ProductActions
