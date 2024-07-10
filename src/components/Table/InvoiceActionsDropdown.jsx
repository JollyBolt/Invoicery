import React, { useEffect, useRef, useState } from "react"
import { BsThreeDotsVertical } from "../../assets"

const InvoiceActionsDropdown = () => {
  const [open, setOpen] = useState(false)
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
    <div
      className="relative cursor-pointer overflow-hidden rounded-rounded border-4 border-black"
      onClick={() => setOpen((prev) => !prev)}
      ref={ref}
    >
      <BsThreeDotsVertical />
      <div
        className={`absolute left-0 top-20 ${!open && "scale-0"} flex w-[80px] origin-top-left flex-col bg-white transition-all`}
      >
        <button
          className="border p-2 hover:bg-gray-50"
          onClick={(e) => {
            e.stopPropagation()
            setOpen((prev) => !prev)
          }}
        >
          View
        </button>
        <button
          className="border p-2 hover:bg-gray-50"
          onClick={(e) => {
            e.stopPropagation()
            setOpen((prev) => !prev)
          }}
        >
          Edit
        </button>
        <button
          className="border p-2 hover:bg-gray-50"
          onClick={(e) => {
            e.stopPropagation()
            setOpen((prev) => !prev)
          }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}

export default InvoiceActionsDropdown
