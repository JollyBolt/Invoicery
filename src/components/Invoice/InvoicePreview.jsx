import React, { forwardRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getProfile } from "../../redux/slices/userSlice"
import numWords from "num-words"

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
  const { invoiceState } = props
  const { invoiceNumber, invoiceDate } = invoiceState
  const products = [
    {
      name: "Product 1 ",
      hsn_code: "1234",
      price: 1000,
      quantity: 1,
      discount: {
        value: 10,
        type: "percent",
      },
    },
    {
      name: "Product 2",
      hsn_code: "1234",
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
        <div className="text-sm">
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
        <div className="flex w-2/6 flex-col justify-evenly text-sm">
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
      <div className="border border-b-0 border-black text-sm">
        <div className="border-b border-black p-1">
          <p className="text-lg font-bold">Issued to</p>
          <div className="flex justify-between">
            <p className="">Abhinav Infrabuild Pvt Ltd</p>
            <p>GSTIN: 23AAHCA9425D1ZY</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/2 border-r border-black p-1">
            <p className="text-lg font-bold">Billing Address</p>
            <p>207-208, Industry House, AB Road</p>
            <p>Indore, ZIP: 452018</p>
            <p>Madhya Pradesh, India</p>
          </div>
          <div className="p-1">
            <p className="text-lg font-bold">Shipping Address</p>
            <p>207-208, Industry House, AB Road</p>
            <p>Indore, ZIP: 452018</p>
            <p>Madhya Pradesh, India</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex w-full border border-b-0 border-r-0 border-black text-base font-bold">
        <div className="w-[8%] border-r border-black bg-primary p-2 text-white">
          S.No
        </div>
        <div className="col-span-3 w-[27%] border-b border-r border-black bg-primary p-2 text-white">
          Item
        </div>
        <div className="w-[8%] border-r border-black bg-primary p-2 text-white">
          HSN <br /> Code
        </div>
        <div className="w-[8%] border-r border-black bg-primary p-2 text-white">
          Qty
        </div>
        <div className="w-[13%] border-r border-black bg-primary p-2 text-white">
          Price <br /> (INR)
        </div>
        <div className="w-[8%] border-r border-black bg-primary p-2 text-white">
          Disc.
        </div>
        <div className="w-[13%] border-r border-black bg-primary p-2 text-white">
          Final Price <br /> (INR)
        </div>
        <div className="w-[15%] border-r border-black bg-primary p-2 text-white">
          Amount <br /> (INR)
        </div>
      </div>
      {/* <div className="bg-primary p-1 text-white">Amount <br /> (INR)</div> */}
      {products.map((product, index) => {
        return (
          <div
            key={index}
            className="flex border border-b-0 border-r-0 border-black text-sm"
          >
            <div className="w-[8%] border-r border-black p-2">{index + 1}</div>
            <div className="w-[27%] border-r border-black p-2">
              {product.name}
            </div>
            <div className="w-[8%] border-r border-black p-2">
              {product.hsn_code}
            </div>
            <div className="w-[8%] border-r border-black p-2">
              {product.quantity}
            </div>
            <div className="w-[13%] border-r border-black p-2">
              {product.price}
            </div>
            <div className="w-[8%] border-r border-black p-2">
              {product.discount.value}
            </div>
            <div className="w-[13%] border-r border-black p-2">
              {product.price - product.discount.value}
            </div>
            <div className="col-span-2 w-[15%] border-r border-black p-2">
              {product.price * product.quantity}
            </div>
          </div>
        )
      })}
      <div className="flex border border-b-0 border-r-0 border-black text-sm">
        <div className="w-[85%] border-b border-r border-black p-2 text-right font-bold">
          Sub Total
        </div>
        <div className="w-[15%] border-b border-r border-black p-2"> 2500</div>
      </div>

      <div className="flex text-sm">
        <div className="w-[64%]">
          <div className="border border-t-0 border-black p-1">
            <p className="text-lg font-bold">Amount in Words</p>
            <p className="capitalize">{numWords(3876)}</p>
          </div>
          <div className="border border-t-0 border-black p-1">
            <p className="text-lg font-bold">Bank Details</p>
            <div className="flex w-full">
              <div className="flex w-[40%]">
                <p className="w-14 font-bold">Bank</p>
                <p>{user?.banking?.bankName}</p>
              </div>

              <div className="flex w-1/2">
                <p className="w-32 font-bold">Account Number</p>
                <p>{user?.banking?.accountNumber}</p>
              </div>
            </div>
            <div className="flex">
              <div className="flex w-[40%]">
                <p className="w-14 font-bold">Branch</p>
                <p>{user?.banking?.branch}</p>
              </div>
              <div className="flex">
                <p className="w-32 font-bold">IFSC Code</p>
                <p>{user?.banking?.ifsc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Taxes */}
        <div className="w-[36%] p-1 border-r border-b border-black">
          <div className="flex w-full justify-between">
            <p className="px-2 text-right w-[35%]">IGST</p>
            <p className="px-2 w-[25%]">10%</p>
            <p className="w-[40%] px-2">230</p>
          </div>
          <div className="flex w-full justify-between">
            <p className="px-2 text-right w-[35%]">CGST</p>
            <p className="px-2 w-[25%]">10%</p>
            <p className="w-[40%] px-2">230</p>
          </div>
          <div className="flex w-full justify-between">
            <p className="px-2 text-right w-[35%]">SGST</p>
            <p className="px-2 w-[25%]">10%</p>
            <p className="w-[40%] px-2">230</p>
          </div>
          <div className="flex w-full justify-between">
            <p className="px-2 text-right w-[35%]">Round off</p>
            <p className="w-[40%] px-2">230</p>
          </div>
          <div className="flex w-full justify-between bg-primary text-white">
            <p className="p-2 text-right w-[30%] text-lg">Total</p>
            <p className=" p-2 text-xl font-bold">Rs. 23054.00</p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex">
        <div className="p-1 border border-t-0 border-black w-[64%]">
          <div className="flex justify-between items-center">
          <p className="font-bold text-lg">Terms and Conditions</p>
          <span className="text-sm">E & O.E</span>
          </div>
        </div>
        <div className="p-1 border-r border-b border-black w-[36%] flex flex-col items-end">
          <p>For {user?.org?.name}</p>
          <div className="h-28"></div>
          <p>Authorized Signature</p>
        </div>
      </div>
    </div>
  )
})

export default InvoicePreview
