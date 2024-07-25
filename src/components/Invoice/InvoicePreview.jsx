import React, { forwardRef, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { fetchSingleCustomer } from "../../redux/slices/customerSlice"
import GSTTemplate from "./MultiStepForm/GST/GSTTemplate"
import SimpleTemplate from "./MultiStepForm/Simple/SimpleTemplate"
import Loader from "../Loader"

const InvoicePreview = forwardRef((props, ref) => {
  const dispatch = useDispatch()

  const { invoiceState, setInvoiceState } = props
  const { products, taxes, miscellaneous = 0 } = invoiceState

  const { cgst, sgst, igst } = taxes

  let subTotal = useMemo(() => {
    return (
      products.reduce(
        (accumulator, product) => accumulator + product.amount,
        0,
      ) + parseInt(miscellaneous)
    )
  }, [products, miscellaneous])

  let total = useMemo(() => {
    return (
      subTotal +
      cgst * subTotal * 0.01 +
      sgst * subTotal * 0.01 +
      igst * subTotal * 0.01
    )
  }, [cgst, sgst, igst, subTotal, miscellaneous])

  useEffect(() => {
    //For template
    let template = "gst"
    if (sessionStorage.getItem("template"))
      template = sessionStorage.getItem("template")

    //For invoice details
    let invoiceNumber = ""
    if (sessionStorage.getItem("invoiceNumber"))
      invoiceNumber = sessionStorage.getItem("invoiceNumber")

    let invoiceDate = ""
    if (sessionStorage.getItem("date"))
      invoiceDate = sessionStorage.getItem("date")

    let purchaseOrder = ""
    if (sessionStorage.getItem("purchaseOrder"))
      purchaseOrder = sessionStorage.getItem("purchaseOrder")

    let purchaseOrderDate = ""
    if (sessionStorage.getItem("purchaseOrderDate"))
      purchaseOrderDate = sessionStorage.getItem("purchaseOrderDate")

    //For customer
    let customer = {
      name: "",
      contactPerson: "",
      gstin: "",
      phone: "",
    }
    if (sessionStorage.getItem("customer")) {
      customer = JSON.parse(sessionStorage.getItem("customer"))
      dispatch(fetchSingleCustomer(customer.id))
    }

    //For Billing Address
    let billingAddress = {
      streetAddress: "",
      city: "",
      state: "",
      stateCode: "",
      zip: "",
      country: "",
    }
    if (sessionStorage.getItem("billingAddress")) {
      billingAddress = JSON.parse(sessionStorage.getItem("billingAddress"))
    }

    //For Shipping Address
    let shippingAddress = {
      streetAddress: "",
      city: "",
      state: "",
      stateCode: "",
      zip: "",
      country: "",
    }
    if (sessionStorage.getItem("shippingAddress")) {
      shippingAddress = JSON.parse(sessionStorage.getItem("shippingAddress"))
    }

    //For Products
    let products = []
    if (sessionStorage.getItem("products"))
      products = JSON.parse(sessionStorage.getItem("products"))

    //For taxes and charges
    let miscellaneous = 0
    if (sessionStorage.getItem("miscellaneous")) {
      miscellaneous =
        sessionStorage.getItem("miscellaneous") === ""
          ? 0
          : parseInt(sessionStorage.getItem("miscellaneous"))
    }

    let taxes = {
      cgst: 0,
      sgst: 0,
      igst: 0,
    }
    if (sessionStorage.getItem("taxes"))
      taxes = JSON.parse(sessionStorage.getItem("taxes"))

    //For terms and conditions
    let termsNConditions = []
    if (sessionStorage.getItem("termsNConditions"))
      termsNConditions = JSON.parse(sessionStorage.getItem("termsNConditions"))

    setInvoiceState((prevState) => {
      return {
        ...prevState,
        template: template,
        invoiceNumber: invoiceNumber,
        invoiceDate: {
          day: new Date(invoiceDate).getDate(),
          month: new Date(invoiceDate).getMonth(),
          year: new Date(invoiceDate).getFullYear(),
        },
        purchaseOrder: purchaseOrder,
        purchaseOrderDate: purchaseOrderDate,
        customer: {
          ...prevState.customer,
          name: customer.name,
          gstin: customer.gstin,
          contactPerson: customer.contactPerson,
          phone: customer.phone,
          address: {
            billing: {
              streetAddress: billingAddress.streetAddress,
              city: billingAddress.city,
              state: billingAddress.state,
              stateCode: billingAddress.stateCode,
              zip: billingAddress.zip,
              country: billingAddress.country,
            },
            shipping: {
              streetAddress: shippingAddress.streetAddress,
              city: shippingAddress.city,
              state: shippingAddress.state,
              stateCode: shippingAddress.stateCode,
              zip: shippingAddress.zip,
              country: shippingAddress.country,
            },
          },
        },
        products: products,
        miscellaneous: miscellaneous,
        taxes: taxes,
        termsNConditions: termsNConditions,
      }
    })
  }, [])

  useEffect(() => {
    setInvoiceState((prevState) => {
      return { ...prevState, totalAmount: Math.round(total) }
    })
  }, [products, cgst, sgst, igst])

  return (
    <>
      {sessionStorage.getItem("mode") === "edit" ? (
        invoiceState.invoiceNumber != "" ? (
          invoiceState.template === "gst" ? (
            <GSTTemplate
              invoiceState={invoiceState}
              subTotal={subTotal}
              total={total}
              ref={ref}
            />
          ) : (
            <SimpleTemplate />
          )
        ) : (
          <div className="flex h-full items-center justify-center">
            <Loader />
          </div>
        )
      ) : invoiceState.template === "gst" ? (
        <GSTTemplate
          invoiceState={invoiceState}
          subTotal={subTotal}
          total={total}
          ref={ref}
        />
      ) : (
        <SimpleTemplate />
      )}
    </>
  )
})

export default InvoicePreview
