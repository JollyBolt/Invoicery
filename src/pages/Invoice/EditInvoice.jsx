import React, { useState, useRef, useEffect } from "react"
import InvoicePreview from "../../components/Invoice/InvoicePreview"
import InvoiceForm from "../../components/Invoice/InvoiceForm"
import { useDispatch, useSelector } from "react-redux"

function EditInvoice() {
  const { token } = useSelector((state) => state.auth)

  const [template, setTemplate] = useState(
    sessionStorage.getItem("template")
      ? sessionStorage.getItem("template")
      : "gst",
  )

  const componentRef = useRef()
  const [invoiceState, setInvoiceState] = useState({
    invoiceNumber: sessionStorage.getItem("invoiceNumber"),
    invoiceDate: {
      day: new Date(sessionStorage.getItem("date")).getDate(),
      month: new Date(sessionStorage.getItem("date")).getMonth(),
      year: new Date(sessionStorage.getItem("date")).getFullYear(),
    },
    purchaseOrder: sessionStorage.getItem("purchaseOrder")
      ? sessionStorage.getItem("purchaseOrder")
      : "",
    purchaseOrderDate: sessionStorage.getItem("purchaseOrderDate")
      ? sessionStorage.getItem("purchaseOrderDate")
      : "",
    template: "gst",
    customer: {
      name: JSON.parse(sessionStorage.getItem("customer")).name,
      contactPerson: JSON.parse(sessionStorage.getItem("customer"))
        .contactPerson,
      gstin: JSON.parse(sessionStorage.getItem("customer")).gstin,
      phone: JSON.parse(sessionStorage.getItem("customer")).phone,
      address: {
        billing: {
          streetAddress: JSON.parse(sessionStorage.getItem("customer")).address
            .billing.streetAddress,
          city: JSON.parse(sessionStorage.getItem("customer")).address.billing
            .city,
          state: JSON.parse(sessionStorage.getItem("customer")).address.billing
            .streetAddress,
          stateCode: JSON.parse(sessionStorage.getItem("customer")).address
            .billing.stateCode,
          zip: JSON.parse(sessionStorage.getItem("customer")).address.billing
            .zip,
          country: JSON.parse(sessionStorage.getItem("customer")).address
            .billing.country,
        },
        shipping: {
          streetAddress: JSON.parse(sessionStorage.getItem("customer")).address
            .shipping.streetAddress,
          city: JSON.parse(sessionStorage.getItem("customer")).address.shipping
            .city,
          state: JSON.parse(sessionStorage.getItem("customer")).address.shipping
            .streetAddress,
          stateCode: JSON.parse(sessionStorage.getItem("customer")).address
            .shipping.stateCode,
          zip: JSON.parse(sessionStorage.getItem("customer")).address.shipping
            .zip,
          country: JSON.parse(sessionStorage.getItem("customer")).address
            .shipping.country,
        },
      },
    },
    products: JSON.parse(sessionStorage.getItem("products")),
    miscellaneous: parseInt(sessionStorage.getItem("miscellaneous")),
    totalAmount: parseInt(sessionStorage.getItem("totalAmount")),
    taxes: {
      cgst: parseInt(JSON.parse(sessionStorage.getItem("taxes")).cgst),
      sgst: parseInt(JSON.parse(sessionStorage.getItem("taxes")).sgst),
      igst: parseInt(JSON.parse(sessionStorage.getItem("taxes")).igst),
    },
    termsNConditions: JSON.parse(sessionStorage.getItem("termsNConditions")),
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

export default EditInvoice
