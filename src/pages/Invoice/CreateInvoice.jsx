import React, { useState, useRef } from "react"
import InvoicePreview from "../../components/Invoice/InvoicePreview"
import InvoiceForm from "../../components/Invoice/InvoiceForm"

function CreateInvoice() {
  const [template, setTemplate] = useState("gst")
  const componentRef = useRef()

  return (
    <>
      <div className="flex w-full">
        <div className="flex h-[80vh] w-1/2 shrink-0 flex-col rounded-r-3xl bg-white">
          <InvoiceForm template={ template } setTemplate={setTemplate} />
        </div>
        <div className="h-[80vh] w-full overflow-y-scroll overflow-hidden px-10">
          <InvoicePreview template={template} ref={componentRef} />
        </div>
      </div>
    </>
  )
}

export default CreateInvoice
