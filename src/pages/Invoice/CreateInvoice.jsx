import React, { useState, useRef } from "react"
import InvoicePreview from "../../components/Invoice/InvoicePreview"
import InvoiceForm from "../../components/Invoice/InvoiceForm"

function CreateInvoice() {
  const [template, setTemplate] = useState("gst")
  const componentRef = useRef()
  const [invoiceState, setInvoiceState] = useState({
    invoiceNumber: "",
    invoiceDate: { day: "", month: "", year: "" },
    template: "gst",
    customer: {
      name: "",
      email: "",
      phone: "",
      address: {
        billing: {
          streetAddress: "",
          city: "",
          state: "",
          stateCode: "",
          zip: "",
        },
        shipping: {
          streetAddress: "",
          city: "",
          state: "",
          stateCode: "",
          zip: "",
        },
      },
      gstin: "",
    },
    products: [
      {
        name: "",
        quantity: "",
        price: "",
        hsnCode: "",
        discount: {
          value: null,
          type: "",
        },
      },
    ],
    amount: null,
    taxes: {
      cgst: "",
      sgst: "",
      igst: "",
    },
    termsNConditions: [{ tnc: "" }],
  })
  return (
    <>
      <div className="flex w-full gap-5">
        <div className="flex h-[80vh] w-[45%] shrink-0 flex-col rounded-r-3xl bg-white">
          <InvoiceForm
            template={template}
            setTemplate={setTemplate}
            invoiceState={invoiceState}
            printDocRef={componentRef}
            setInvoiceState={setInvoiceState}
          />
        </div>
        <div className="h-[80vh] w-full overflow-hidden overflow-y-scroll ">
          <InvoicePreview
            template={template}
            ref={componentRef}
            invoiceState={invoiceState}
          />
        </div>
      </div>
    </>
  )
}

export default CreateInvoice
