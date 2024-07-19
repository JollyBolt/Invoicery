import React, { useState, useRef, useEffect } from "react"
import InvoicePreview from "../../components/Invoice/InvoicePreview"
import InvoiceForm from "../../components/Invoice/InvoiceForm"
import { useSelector } from "react-redux"

function CreateInvoice() {
  const { user } = useSelector((state) => state.user)
  const [template, setTemplate] = useState(
    sessionStorage.getItem("template")
      ? sessionStorage.getItem("template")
      : "gst",
  )

  useEffect(() => {
    if (!sessionStorage.getItem("template")) {
      sessionStorage.setItem("template", template)
    }
  }, [])

  const componentRef = useRef()
  const [invoiceState, setInvoiceState] = useState({
    invoiceNumber: "",
    invoiceDate: { day: "", month: 0, year: "" },
    purchaseOrder: "",
    purchaseOrderDate: "",
    template: "gst",
    customer: {
      name: "",
      contactPerson: "",
      gstin: "",
      phone: "",
      address: {
        billing: {
          streetAddress: "",
          city: "",
          state: "",
          stateCode: "",
          zip: "",
          country: "",
        },
        shipping: {
          streetAddress: "",
          city: "",
          state: "",
          stateCode: "",
          zip: "",
          country: "",
        },
      },
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
    totalAmount: 0,
    miscellaneous: 0,
    taxes: {
      cgst: 0,
      sgst: 0,
      igst: 0,
    },
    termsNConditions: sessionStorage.getItem("termsNConditions")
      ? JSON.parse(sessionStorage.getItem("termsNConditions"))
      : user.termsNConditions
        ? user.termsNConditions
        : [],
  })
  return (
    <>
      <div className="flex h-[calc(100dvh-88px)] w-full gap-2">
        <div className="flex h-[calc(100dvh-88px)] w-[40%] shrink-0 flex-col overflow-hidden rounded-r-3xl bg-background">
          <InvoiceForm
            template={template}
            setTemplate={setTemplate}
            invoiceState={invoiceState}
            printDocRef={componentRef}
            setInvoiceState={setInvoiceState}
          />
        </div>
        <div className="no-scrollbar h-[calc(100dvh-88px)] w-full overflow-hidden overflow-y-scroll">
          <InvoicePreview
            template={template}
            ref={componentRef}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        </div>
      </div>
    </>
  )
}

export default CreateInvoice
