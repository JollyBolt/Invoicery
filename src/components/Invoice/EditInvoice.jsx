import React from "react"
import { useState } from "react"

let openEditCustomerModal

function EditInvoice() {
  const [open, setOpen] = useState(false)
  openEditCustomerModal = setOpen
  return <div></div>
}

// export default EditInvoice

// const OpenEditCustomerModal =({setOpen})=> {
//     setOpen(true)
//     return null
// }

export { EditInvoice, openEditCustomerModal }
