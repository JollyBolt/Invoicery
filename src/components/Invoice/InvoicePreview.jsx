import React, { forwardRef, useEffect, useMemo } from "react"
import { useDispatch } from "react-redux"
import { fetchSingleCustomer } from "../../redux/slices/customerSlice"
import GSTTemplate from "./MultiStepForm/GST/GSTTemplate"

const InvoicePreview = forwardRef((props, ref) => {
  const dispatch = useDispatch()

  const { invoiceState, setInvoiceState } = props
  const { products, taxes, miscellaneous=0 } = invoiceState

  const { cgst, sgst, igst } = taxes


  let subTotal = useMemo(() => {
    return products.reduce(
      (accumulator, product) => accumulator + product.amount,
      0,
    ) + parseInt(miscellaneous)
  }, [products,miscellaneous])

  let total = useMemo(() => {
    return (
      subTotal +
      cgst * subTotal * 0.01 +
      sgst * subTotal * 0.01 +
      igst * subTotal * 0.01
    )
  }, [cgst, sgst, igst, subTotal,miscellaneous])

  useEffect(() => {
    //For template
    const template = sessionStorage.getItem("template")
    if (template) {
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          template: template,
        }
      })
    }

    //For invoice details
    const invoiceNumber = sessionStorage.getItem("invoiceNumber")
    if (invoiceNumber) {
      const date = sessionStorage.getItem("date")
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          invoiceNumber,
          invoiceDate: {
            day: new Date(date).getDate(),
            month: new Date(date).getMonth(),
            year: new Date(date).getFullYear(),
          },
        }
      })
    }
    const purchaseOrder = sessionStorage.getItem("purchaseOrder")
    if (purchaseOrder) {
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          purchaseOrder,
        }
      })
    }

    if (sessionStorage.getItem("purchaseOrderDate")) {
      let purchaseOrderDate = sessionStorage.getItem("purchaseOrderDate")
      console.log(purchaseOrderDate)
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          purchaseOrderDate: purchaseOrderDate,
        }
      })
    }

    //For customer
    const customer = JSON.parse(sessionStorage.getItem("customer"))
    if (customer) {
      dispatch(fetchSingleCustomer(customer.id))
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          customer: {
            ...prevState.customer,
            name: customer.client,
            gstin: customer.gstin,
            contactPerson: customer.contactPerson,
            phone: customer.phone,
          },
        }
      })
    }

    //For Billing Address
    const billingAddress = JSON.parse(sessionStorage.getItem("billingAddress"))
    if (billingAddress) {
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          customer: {
            ...prevState.customer,
            address: {
              ...prevState.customer.address,
              billing: {
                streetAddress: billingAddress.streetAddress,
                city: billingAddress.city,
                state: billingAddress.state,
                stateCode: billingAddress.stateCode,
                zip: billingAddress.zip,
                country: billingAddress.country,
              },
            },
          },
        }
      })
    }

    //For Shipping Address
    const shippingAddress = JSON.parse(
      sessionStorage.getItem("shippingAddress"),
    )
    if (shippingAddress) {
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          customer: {
            ...prevState.customer,
            address: {
              ...prevState.customer.address,
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
        }
      })
    }

    //For Products
    const products = JSON.parse(sessionStorage.getItem("productList"))
    if (products) {
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          products,
        }
      })
    }

    //For taxes and charges
    if (sessionStorage.getItem("miscellaneous")) {
      const miscellaneous =
        sessionStorage.getItem("miscellaneous") === ""
          ? 0
          : parseInt(sessionStorage.getItem("miscellaneous"))
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          miscellaneous,
        }
      })
    }

    const taxes = JSON.parse(sessionStorage.getItem("taxes"))
    if (taxes) {
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          taxes,
        }
      })
    }

    //For terms and conditions
    const termsNConditions = JSON.parse(
      sessionStorage.getItem("termsNConditions"),
    )
    if (termsNConditions) {
      setInvoiceState((prevState) => {
        return {
          ...prevState,
          termsNConditions,
        }
      })
    }
  }, [])

  useEffect(() => {
    setInvoiceState((prevState) => {
      return { ...prevState, totalAmount: Math.round(total) }
    })
  }, [products, cgst, sgst, igst])

  return (
      <GSTTemplate
        invoiceState={invoiceState}
        subTotal={subTotal}
        total={total}
        ref={ref}
      />
  )
})

export default InvoicePreview