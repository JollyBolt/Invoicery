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
      // {
      //   name: "",
      //   quantity: "",
      //   price: "",
      //   hsnCode: "",
      //   finalPrice: null,
      //   amount: null,
      //   discount: {
      //     value: null,
      //     type: "",
      //   },
      // },
    ],
    totalAmount: null,
    taxes: {
      cgst: "",
      sgst: "",
      igst: "",
    },
    termsNConditions: [{ tnc: "" }],
  })
  return (
    <>
      <div className="flex w-full gap-2">
        <div className="flex h-[80vh] w-[40%] shrink-0 flex-col overflow-hidden rounded-r-3xl bg-white">
          <InvoiceForm
            template={template}
            setTemplate={setTemplate}
            invoiceState={invoiceState}
            printDocRef={componentRef}
            setInvoiceState={setInvoiceState}
          />
        </div>
        <div className="h-[80vh] w-full overflow-hidden overflow-y-scroll">
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
