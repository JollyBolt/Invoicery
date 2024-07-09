import React, { forwardRef, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProfile } from "../../redux/slices/userSlice"
import numWords from "num-words"
import { fetchSingleCustomer } from "../../redux/slices/customerSlice"

const InvoicePreview = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state) => state.auth)
  const { user, loading } = useSelector((state) => state.user)

  useEffect(() => {
    async function getUserData() {
      if (loggedIn) {
        await dispatch(getProfile())
      }
    }
    getUserData()
  }, [])

  useEffect(() => {
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
            month: new Date(date).getMonth() + 1,
            year: new Date(date).getFullYear(),
          },
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

    //For taxes
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

  const { invoiceState, setInvoiceState } = props
  const {
    invoiceNumber,
    invoiceDate,
    customer,
    products,
    totalAmount,
    taxes,
    termsNConditions,
  } = invoiceState

  const { name, contactPerson, gstin, phone, address } = customer
  const { billing, shipping } = address
  // console.log(shipping)
  const { cgst, sgst, igst } = taxes

  const subTotal = useMemo(() => {
    return products.reduce(
      (accumulator, product) => accumulator + product.amount,
      0,
    )
  }, [products])

  const total = useMemo(() => {
    return (
      subTotal +
      cgst * subTotal * 0.01 +
      sgst * subTotal * 0.01 +
      igst * subTotal * 0.01
    )
  }, [cgst, sgst, igst, subTotal])

  const roundedTotal = Math.round(total)
  const roundOff = Math.abs(roundedTotal - total)

  return (
    <div ref={ref} className="flex min-h-full flex-col bg-white p-2">
      {/* Organisation Details */}
      <div className="flex justify-between border border-b-0 border-black p-1">
        <div className="">
          <p className="text-2xl font-black uppercase">{user?.org?.name}</p>
          <p className="">{user?.org?.address?.streetAddress}</p>
          <p>
            {user?.org?.address?.city} - {user?.org?.address?.zip},{" "}
            {user?.org?.address?.state}, {user?.org?.address?.country}
          </p>
          <p>Phone: {user?.phone}</p>
          <p>Email: {user?.org?.email}</p>
          <p>GSTIN: {user?.org?.gstin}</p>
        </div>
        <div className="flex w-2/6 flex-col justify-evenly">
          <div className="bg-primary p-3 text-xl font-bold text-white">
            Tax Invoice
          </div>
          <div className="flex">
            <p className="w-32">Invoice Number</p>
            <span className="font-bold">{invoiceNumber}</span>
          </div>
          <div className="flex">
            <p className="w-32">Invoice Date</p>
            {invoiceDate.day && (
              <span className="font-bold">
                {invoiceDate.day +
                  "/" +
                  invoiceDate.month +
                  "/" +
                  invoiceDate.year}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Customer Deatils */}
      <div className="border border-b-0 border-black text-base">
        <div className="border-b border-black p-1">
          <p className="text-lg font-bold">Issued to</p>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex w-[60%]">
                <p className="w-[30%] font-semibold">Organization</p>
                <p>{name}</p>
              </div>
              <div className="flex w-[40%]">
                <p className="w-[20%] font-semibold">GSTIN</p>
                <p>{gstin}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex w-[40%]">
                <p className="w-[45%] font-semibold">Contact Person</p>
                <p>{contactPerson === "" ? "-" : contactPerson}</p>
              </div>
              <div className="flex w-[40%]">
                <p className="w-[20%] font-semibold">Phone</p>
                <p>{phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="flex min-h-[100px] gap-2">
          <div className="w-1/2 shrink-0 border-r border-black p-1">
            <p className="text-lg font-bold">Billing Address</p>
            {billing.city != "" && (
              <>
                <p>{billing.streetAddress}</p>
                <p>
                  {billing.city}, ZIP: {billing.zip}
                </p>
                <p>
                  {billing.state}, {billing.country}
                </p>
                <p>State Code: {billing.stateCode}</p>
              </>
            )}
          </div>
          <div className="p-1">
            <p className="text-lg font-bold">Shipping Address</p>
            {shipping?.streetAddress != "" && (
              <>
                <p>{shipping?.streetAddress}</p>
                <p>
                  {shipping?.city}, ZIP: {shipping?.zip}
                </p>
                <p>
                  {shipping?.state}, {shipping?.country}
                </p>
                <p>State Code: {shipping?.stateCode}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex w-full flex-col border-black">
        <div className="flex w-full shrink-0 border-black font-bold">
          <div className="w-[10%] border border-black bg-primary p-2 text-center text-white">
            S.No
          </div>
          <div className="w-[30%] border border-l-0 border-black bg-primary p-2 text-center text-white">
            Item
          </div>
          <div className="w-[14%] border border-l-0 border-black bg-primary p-2 text-center text-white">
            HSN Code
          </div>
          <div className="w-[10%] border border-l-0 border-black bg-primary p-2 text-center text-white">
            Qty
          </div>
          <div className="w-[18%] border border-l-0 border-black bg-primary p-2 text-center text-white">
            Price(INR)
          </div>
          <div className="w-[18%] border border-l-0 border-black bg-primary p-2 text-center text-white">
            Amount(INR)
          </div>
        </div>
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div key={index} className="flex w-full text-sm">
                <div className="w-[10%] border-l border-r border-black p-2 text-center">
                  {index + 1}
                </div>
                <div className="w-[30%] border-r border-black p-2">
                  {product.name}
                </div>
                <div className="w-[14%] border-r border-black p-2 text-center">
                  {product.hsn_code}
                </div>
                <div className="w-[10%] border-r border-black p-2 text-center">
                  {product.quantity}
                </div>
                <div className="w-[18%] border-r border-black p-2 text-center">
                  {product.finalPrice.toFixed(2)}
                </div>
                <div className="w-[18%] border-r border-black p-2 pr-6 text-right">
                  {product.amount.toFixed(2)}
                </div>
              </div>
            )
          })
        ) : (
          <div className="w-full border-l border-r border-black p-2 text-white">
            &npsp;
          </div>
        )}
      </div>
      <div className="flex w-full justify-between border-black">
        <div className="w-[82%] shrink-0 border border-black p-2 text-right font-bold">
          Sub Total
        </div>
        <div className="w-[18%] border border-l-0 border-black p-2 pr-5 text-right">
          {subTotal.toFixed(2)}
        </div>
      </div>

      <div className="flex border border-t-0 border-black">
        <div className="w-[64%] flex-col border-black">
          <div className="w-full border-b border-black p-1">
            <p className="text-lg font-bold">Amount in Words</p>
            <p className="capitalize">{numWords(roundedTotal)} Rupees Only</p>
          </div>

          <div className="w-full p-1">
            <p className="text-lg font-bold">Bank Details</p>
            <div className="flex w-full">
              <div className="flex w-[35%]">
                <p className="w-16 font-bold">Bank</p>
                <p>{user?.banking?.bankName}</p>
              </div>

              <div className="flex">
                <p className="w-40 font-bold">Account Number</p>
                <p>{user?.banking?.accountNumber}</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-[35%]">
                <p className="w-16 font-bold">Branch</p>
                <p>{user?.banking?.branch}</p>
              </div>
              <div className="flex">
                <p className="w-40 font-bold">IFSC Code</p>
                <p>{user?.banking?.ifsc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Taxes */}
        <div className="w-[36%] overflow-hidden border-l border-black p-2">
          <div className="flex w-full justify-between">
            <p className="w-[40%] text-right">CGST</p>
            <p className="w-[5%]">{cgst}%</p>
            <p className="w-[50%] pr-3 text-right">
              {(subTotal * cgst * 0.01).toFixed(2)}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <p className="w-[40%] text-right">SGST</p>
            <p className="w-[5%]">{sgst}%</p>
            <p className="w-[50%] pr-3 text-right">
              {(subTotal * sgst * 0.01).toFixed(2)}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <p className="w-[40%] text-right">IGST</p>
            <p className="w-[5%]">{igst}%</p>
            <p className="w-[50%] pr-3 text-right">
              {(subTotal * igst * 0.01).toFixed(2)}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <p className="w-[50%] text-right">Round off</p>
            <p className="w-[45%] pr-3 text-right">{roundOff.toFixed(2)}</p>
          </div>
          <div className="flex w-full justify-between bg-primary text-white">
            <p className="w-[30%] p-2 text-right text-lg">Total</p>
            <p className="p-2 text-xl font-bold">Rs. {roundedTotal}</p>
            {/* <p className="p-2 text-xl font-bold">Rs. 550</p> */}
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex w-full border border-t-0 border-black">
        <div className="w-[64%] border-t-0 border-black p-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Terms and Conditions</p>
            <span className="text-sm">E & O.E</span>
          </div>
          <div className="text-xs">
            <ol className="list-decimal px-5">
              {termsNConditions?.length > 0 &&
                termsNConditions.map((tnc, i) => <li key={i}>{tnc.tnc}</li>)}
            </ol>
          </div>
        </div>
        <div className="flex w-[36%] flex-col items-end border-l border-black p-1">
          <p>For {user?.org?.name}</p>
          <div className="h-20"></div>
          <p>Authorized Signature</p>
        </div>
      </div>
    </div>
  )
})

export default InvoicePreview
