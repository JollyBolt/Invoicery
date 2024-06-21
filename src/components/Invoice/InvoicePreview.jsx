import React, { forwardRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

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
  // const { invoiceState } = props
  // const { invoiceNumber } = invoiceState
  const products = [
    {
      name: "Product 1 ",
      hsn_code: "123456",
      price: 1000,
      quantity: 1,
      discount: {
        value: 10,
        type: "percent",
      },
    },
    {
      name: "Product 2",
      hsn_code: "123456",
      price: 1500,
      quantity: 1,
      discount: {
        value: 100,
        type: "flat",
      },
    },
  ]
  // console.log(invoiceState)
  return (
    <div ref={ref} className="min-h-full bg-white p-2">
      {/* Organisation Details */}
      <div className="flex justify-between border border-b-0 border-black p-1">
        <div className="text-xs">
          <p className="text-2xl font-black uppercase">{ user?.org?.name }</p>
          <p className="">5832/33,Plot - 3A/UA, 2nd Floor, Jawahar Nagar</p>
          <p>New Delhi - 110007, Delhi, India</p>
          <p>Phone: 9350232008</p>
          <p>Email: {user?.org?.email}</p>
          <p>GSTIN: {user?.org?.gstin}</p>
        </div>
        <div className="flex w-2/6 flex-col justify-evenly text-sm">
          <p className="bg-primary p-3 text-xl font-bold text-white">
            Tax Invoice
          </p>
          <p className="flex">
            <p className="w-32">Invoice Number</p>
            <span className="font-bold">INV2301</span>
          </p>
          <p className="flex">
            <p className="w-32">Invoice Date</p>
            <span className="font-bold">12/01/2023</span>
          </p>
        </div>
      </div>

      {/* Customer Deatils */}
      <div className="border border-b-0 border-black text-sm">
        <div className="border-b border-black p-1">
          <p className="font-bold">Issued to</p>
          <div className="flex justify-between">
            <p className="text-base">Abhinav Infrabuild Pvt Ltd</p>
            <p>GSTIN: 23AAHCA9425D1ZY</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/2 border-r border-black p-1">
            <p className="font-bold">Billing Address</p>
            <p>207-208, Industry House, AB Road</p>
            <p>Indore, ZIP: 452018</p>
            <p>Madhya Pradesh, India</p>
          </div>
          <div className="p-1">
            <p className="font-bold">Shipping Address</p>
            <p>207-208, Industry House, AB Road</p>
            <p>Indore, ZIP: 452018</p>
            <p>Madhya Pradesh, India</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="grid grid-cols-10 border border-b-0 border-r-0 border-black text-sm">
        <div className="border-b border-r border-black bg-primary p-1 text-white">
          S.No
        </div>
        <div className="col-span-3 border-b border-r border-black bg-primary p-1 text-white">
          Item
        </div>
        <div className="border-b border-r border-black bg-primary p-1 text-white">
          HSN Code
        </div>
        <div className="border-b border-r border-black bg-primary p-1 text-white">
          Qty
        </div>
        <div className="border-b border-r border-black bg-primary p-1 text-white">
          Price
        </div>
        <div className="border-b border-r border-black bg-primary p-1 text-white">
          Discount
        </div>
        <div className="border-b border-r border-black bg-primary p-1 text-white">
          Final Price
        </div>
        <div className="border-b border-r border-black bg-primary p-1 text-white">
          Amount <br /> (INR)
        </div>
        {/* <div className="bg-primary p-1 text-white">Amount <br /> (INR)</div> */}
        {products.map((product, index) => {
          return (
            <>
              <div className="border-b border-r border-black p-1">
                {index + 1}
              </div>
              <div className="col-span-3 border-b border-r border-black p-1">
                {product.name}
              </div>
              <div className="border-b border-r border-black p-1">
                {product.hsn_code}
              </div>
              <div className="border-b border-r border-black p-1">
                {product.quantity}
              </div>
              <div className="border-b border-r border-black p-1">
                {product.price}
              </div>
              <div className="border-b border-r border-black p-1">
                {product.discount.value}
              </div>
              <div className="border-b border-r border-black p-1">
                {product.price - product.discount.value}
              </div>
              <div className="border-b border-r border-black p-1">
                {product.price * product.quantity}
              </div>
            </>
          )
        })}
        <div className="col-span-9 items-end border-b border-r border-black p-1">
          Sub Total
        </div>
        <div className="border-b border-r border-black p-1"> 2500</div>
      </div>
    </div>
  )
})

export default InvoicePreview
