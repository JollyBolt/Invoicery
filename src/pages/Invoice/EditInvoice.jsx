import React, { useState, useRef, useEffect } from "react"
import InvoicePreview from "../../components/Invoice/InvoicePreview"
import InvoiceForm from "../../components/Invoice/InvoiceForm"
import { useDispatch, useSelector } from "react-redux"

function EditInvoice() {
  const { loggedIn } = useSelector((state) => state.auth)

  const [template, setTemplate] = useState(
    sessionStorage.getItem("template")
      ? sessionStorage.getItem("template")
      : "gst",
  )

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
    miscellaneous: 0,
    totalAmount: 0,
    taxes: {
      cgst: 0,
      sgst: 0,
      igst: 0,
    },
    termsNConditions: [],
  })

  useEffect(() => {
    const invoice = JSON.parse(sessionStorage.getItem("invoiceState"))
    sessionStorage.setItem("invoiceNumber", invoice.invoiceNumber)
    sessionStorage.setItem(
      "invoiceDate",
      invoice.invoiceDate.year +
        "-" +
        invoice.invoiceDate.month +
        "-" +
        invoice.invoiceDate.day,
    )
    sessionStorage.setItem("purchaseOrder", invoice.purchaseOrder)
    sessionStorage.setItem("purchaseOrderDate", invoice.purchaseOrderDate)
    sessionStorage.setItem(
      "billingAddress",
      JSON.stringify(invoice?.customer?.address?.billing),
    )
    sessionStorage.setItem(
      "shippingAddress",
      JSON.stringify(invoice.customer.address.shipping),
    )
    sessionStorage.setItem("customer", JSON.stringify(invoice.customer))
    sessionStorage.setItem("products", JSON.stringify(invoice.products))
    sessionStorage.setItem("totalAmount", invoice.totalAmount.toString())
    sessionStorage.setItem("miscellaneous", invoice.miscellaneous.toString())
    sessionStorage.setItem("taxes", JSON.stringify(invoice.taxes))
    sessionStorage.setItem(
      "termsNConditions",
      JSON.stringify(invoice.termsNConditions),
    )
    setInvoiceState(invoice)
    // sessionStorage.removeItem("invoiceState")
  }, [loggedIn])

  return (
    <>
      <div className="flex h-[calc(100dvh-88px)] w-full gap-2">
        <div className="bg-background flex h-[calc(100dvh-88px)] w-[40%] shrink-0 flex-col overflow-hidden rounded-r-3xl">
          <InvoiceForm
            template={template}
            setTemplate={setTemplate}
            invoiceState={invoiceState}
            printDocRef={componentRef}
            setInvoiceState={setInvoiceState}
          />
        </div>
        <div className="h-[calc(100dvh-88px)] w-full overflow-hidden overflow-y-scroll">
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
