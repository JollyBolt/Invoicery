import React, { useState } from "react"
import { BsThreeDotsVertical } from "../../assets"

const InvoiceActionsDropdown = () => {
  const [open, setOpen] = useState(false)
  return (
    <div>
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
            onClick={(e) => {
              e.stopPropagation()
              setOpen(prev => !prev)
            }}
          >
            View
          </button>
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
              setOpen(prev => !prev)
            }}
          >
            Edit
          </button>
          <button
            className="border p-2 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation()
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

export default InvoiceActionsDropdown
