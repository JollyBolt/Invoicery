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

    !sessionStorage.getItem("invoiceNumber") &&
      sessionStorage.setItem("invoiceNumber", invoice.invoiceNumber)
    !sessionStorage.getItem("date") &&
      sessionStorage.setItem(
        "date",
        invoice.invoiceDate.year +
          "-" +
          invoice.invoiceDate.month +
          "-" +
          invoice.invoiceDate.day,
      )
    !sessionStorage.getItem("purchaseOrder") &&
      sessionStorage.setItem("purchaseOrder", invoice.purchaseOrder)
    !sessionStorage.getItem("purchaseOrderDate") &&
      sessionStorage.setItem("purchaseOrderDate", invoice.purchaseOrderDate)
    !sessionStorage.getItem("billingAddress") &&
      sessionStorage.setItem(
        "billingAddress",
        JSON.stringify(invoice?.customer?.address?.billing),
      )
    !sessionStorage.getItem("shippingAddress") &&
      sessionStorage.setItem(
        "shippingAddress",
        JSON.stringify(invoice.customer.address.shipping),
      )
    !sessionStorage.getItem("customer") &&
      sessionStorage.setItem("customer", JSON.stringify(invoice.customer))
    !sessionStorage.getItem("products") &&
      sessionStorage.setItem("products", JSON.stringify(invoice.products))
    !sessionStorage.getItem("totalAmount") &&
      sessionStorage.setItem("totalAmount", invoice.totalAmount.toString())
    !sessionStorage.getItem("miscellaneous") &&
      sessionStorage.setItem("miscellaneous", invoice.miscellaneous.toString())
    !sessionStorage.getItem("taxes") &&
      sessionStorage.setItem("taxes", JSON.stringify(invoice.taxes))
    !sessionStorage.getItem("termsNConditions") &&
      sessionStorage.setItem(
        "termsNConditions",
        JSON.stringify(invoice?.termsNConditions),
      )
    sessionStorage.removeItem("invoiceState")
  }, [loggedIn])

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
