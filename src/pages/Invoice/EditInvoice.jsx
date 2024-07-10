import React, { useState, useRef, useEffect } from "react"
import InvoicePreview from "../../components/Invoice/InvoicePreview"
import InvoiceForm from "../../components/Invoice/InvoiceForm"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleInvoice } from "../../redux/slices/invoiceSlice"

function EditInvoice() {
  const id = useParams().id
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.invoices.invoices)
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
    taxes: {
      cgst: 0,
      sgst: 0,
      igst: 0,
    },
    termsNConditions: [],
  })

  useEffect(() => {
    async function getInvoice() {
      if (loggedIn) {
        await dispatch(fetchSingleInvoice(id))
        if (invoice) {
          console.log(invoice)
          setInvoiceState({...invoice})
          // console.log(invoiceState)
        }
      }
    }
    getInvoice()
    // if (!sessionStorage.getItem("template")) {
    //   sessionStorage.setItem("template", template)
    // }
  }, [loggedIn])

  if (invoiceState.invoiceNumber === "") return <div>Loading</div>

  return (
    <>
      <div className="flex h-[calc(100dvh-88px)] w-full gap-2">
        <div className="flex h-[calc(100dvh-88px)] w-[40%] shrink-0 flex-col overflow-hidden rounded-r-3xl bg-white">
          <InvoiceForm
            template={template}
            setTemplate={setTemplate}
            invoiceState={invoiceState}
            printDocRef={componentRef}
            setInvoiceState={setInvoiceState}
          />
        </div>
        <div className="h-[calc(100dvh-88px)] w-full overflow-hidden overflow-y-scroll">
          {invoiceState?.customer?.name !== "" && (
              <InvoicePreview
                template={template}
                ref={componentRef}
                invoiceState={invoiceState}
                setInvoiceState={setInvoiceState}
              />
          )}
        </div>
      </div>
    </>
  )
}

export default EditInvoice
