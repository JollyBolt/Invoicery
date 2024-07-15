import React, { forwardRef, useEffect } from "react"
import numWords from "num-words"
import { useSelector, useDispatch } from "react-redux"
import { getProfile } from "../../../../redux/slices/userSlice"
import { displayPhone } from "../../../../utils/displayPhone"
import { displayDate } from "../../../../utils/displayDate"

const GSTTemplate = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
  }, [])
  const { user, loading } = useSelector((state) => state.user)
  const { invoiceState, subTotal, total } = props
  const {
    invoiceNumber,
    invoiceDate,
    purchaseOrder,
    purchaseOrderDate,
    customer,
    products,
    miscellaneous,
    taxes,
    termsNConditions,
    totalAmount,
  } = invoiceState

  const { name, contactPerson, gstin, phone, address } = customer
  const { billing, shipping } = address
  const { cgst, sgst, igst } = taxes

  return (
    <div
      ref={ref}
      className="flex min-h-full flex-col bg-background p-2 text-foreground"
    >
      <div className="flex w-full justify-between border border-b-0 border-foreground p-1 font-bold">
        <p className="uppercase">Tax Invoice</p>
        <p className="uppercase">Original for Recepient</p>
      </div>
      {/* Organisation Details */}
      <div className="flex justify-between border border-b-0 border-foreground">
        <div className="p-1 text-sm">
          <p className="font-foreground text-3xl font-bold uppercase">
            {user?.org?.name}
          </p>
          <p>
            <span className="font-bold">GSTIN:</span> {user?.org?.gstin}
          </p>
          <p className="">{user?.org?.address?.streetAddress}</p>
          <p>
            {user?.org?.address?.city} - {user?.org?.address?.zip},{" "}
            {user?.org?.address?.state}, {user?.org?.address?.country}
          </p>
          <div className="flex gap-4">
            <p>
              <span className="font-bold">Phone:</span>{" "}
              {displayPhone(user?.phone)}
            </p>
            <p>
              <span className="font-bold">Email:</span> {user?.org?.email}
            </p>
          </div>
        </div>
        <div className="flex w-1/5 flex-col justify-evenly border-l border-foreground">
          {/* <div className="p-3 text-xl font-bold">Tax Invoice</div> */}
          <div className="flex h-1/2 flex-col border-b border-foreground p-1">
            <p className="">Invoice #</p>
            <span className="font-bold">{invoiceNumber}</span>
          </div>
          <div className="flex h-1/2 flex-col p-1">
            <p className="">Invoice Date</p>
            {invoiceDate.day && (
              <span className="font-bold">{displayDate(invoiceDate)}</span>
            )}
          </div>
        </div>
      </div>

      {/* Customer Deatils */}
      <div className="border border-b-0 border-foreground text-sm">
        <div className="border-b border-foreground p-1">
          <p className="text-base font-bold">Issued to</p>
          <div className="flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex w-[60%]">
                <p className="w-[30%] font-semibold">Organization</p>
                <p>{name}</p>
              </div>
              <div className="flex w-[40%]">
                <p className="w-[25%] font-semibold">GSTIN</p>
                <p>{gstin}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex w-[40%]">
                <p className="w-[45%] font-semibold">Contact Person</p>
                <p>{name != "" && contactPerson == "" ? "-" : contactPerson}</p>
              </div>
              <div className="flex w-[40%]">
                <p className="w-[25%] font-semibold">Phone</p>
                <p>{displayPhone(phone)}</p>
              </div>
            </div>
            {purchaseOrder !== "" && (
              <div className="flex">
                <div className="flex w-[60%] shrink-0">
                  <p className="w-[30%] font-semibold">PO #</p>
                  <p>{purchaseOrder}</p>
                </div>
                {purchaseOrderDate && (
                  <div className="flex w-full">
                    <p className="w-[25%] font-semibold">PO Date</p>
                    <p>
                      {displayDate({
                        day: new Date(purchaseOrderDate).getDate(),
                        month: new Date(purchaseOrderDate).getMonth(),
                        year: new Date(purchaseOrderDate).getFullYear(),
                      })}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Addresses */}
        <div className="flex min-h-[100px]">
          <div className="w-1/2 shrink-0 border-r border-foreground p-1 text-sm">
            <p className="text-base font-bold">Billing Address</p>
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
          <div className="p-1 text-sm">
            <p className="text-base font-bold">Shipping Address</p>
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
      <div className="flex w-full flex-col border-foreground text-xs">
        <div className="flex w-full shrink-0 border-foreground font-bold">
          <div className="w-[5%] border border-foreground p-2 text-center">
            #
          </div>
          <div className="w-[40%] border border-l-0 border-foreground p-2 text-left">
            Item
          </div>
          <div className="w-[14%] border border-l-0 border-foreground p-2 text-right">
            HSN
          </div>
          <div className="w-[8%] border border-l-0 border-foreground p-2 text-right">
            Qty
          </div>
          <div className="w-[15%] border border-l-0 border-foreground p-2 text-right">
            Price
          </div>
          <div className="w-[18%] border border-l-0 border-foreground p-2 text-right">
            Amount
          </div>
        </div>
        <div className="flex h-[310px] flex-col">
          {products.length > 0 &&
            products.map((product, index) => {
              return (
                <div key={index} className="flex w-full shrink-0 text-xs">
                  <div className="w-[5%] border-l border-r border-foreground px-2 pb-1 text-center">
                    {index + 1}
                  </div>
                  <div className="w-[40%] border-r border-foreground px-2 pb-1">
                    {product.name}
                  </div>
                  <div className="w-[14%] border-r border-foreground px-2 pb-1 text-right">
                    {product.hsn_code}
                  </div>
                  <div className="w-[8%] border-r border-foreground px-2 pb-1 text-right">
                    {product.quantity}
                  </div>
                  <div className="w-[15%] border-r border-foreground px-2 pb-1 text-right">
                    {product.finalPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <div className="w-[18%] border-r border-foreground px-2 pb-1 text-right">
                    {product.amount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              )
            })}
          <div className="flex w-full flex-1 shrink-0 text-sm">
            <div className="w-[5%] border-l border-r border-foreground p-2 py-1 text-center"></div>
            <div className="w-[40%] border-r border-foreground p-2 py-1"></div>
            <div className="w-[14%] border-r border-foreground p-2 py-1 text-right"></div>
            <div className="w-[8%] border-r border-foreground p-2 py-1 text-right"></div>
            <div className="w-[15%] border-r border-foreground p-2 py-1 text-right"></div>
            <div className="w-[18%] border-r border-foreground p-2 py-1 text-right"></div>
          </div>
        </div>
      </div>

      <div className="flex border border-foreground">
        <div className="w-[55%] flex-col border-foreground">
          <div className="w-full border-b border-foreground p-1">
            <p className="text-base font-bold">Amount in Words</p>
            <p className="text-sm capitalize">
              {numWords(totalAmount)} Rupees Only
            </p>
          </div>

          <div className="flex w-full flex-col p-1 text-sm">
            <p className="text-base font-bold">Bank Details</p>
            <div className="flex">
              <p className="w-24 font-bold">Bank</p>
              <p>{user?.banking?.bankName}</p>
            </div>

            <div className="flex">
              <p className="w-24 font-bold">Account #</p>
              <p>{user?.banking?.accountNumber}</p>
            </div>

            <div className="flex">
              <p className="w-24 font-bold">Branch</p>
              <p>{user?.banking?.branch}</p>
            </div>
            <div className="flex">
              <p className="w-24 font-bold">IFSC</p>
              <p>{user?.banking?.ifsc}</p>
            </div>
          </div>
        </div>

        {/* Taxes */}
        <div className="w-[45%] shrink-0 overflow-hidden border-l border-foreground">
          <div className="p-2">
            <div className="flex w-full justify-between">
              <p className="w-[36%] text-right">Misc Charges</p>
              <p className="">
                {miscellaneous === ""
                  ? 0
                  : parseInt(miscellaneous).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
              </p>
            </div>
            <div className="flex w-full justify-between font-bold">
              <p className="w-[36%] text-right">Taxable Amount</p>
              <p className="">
                {"₹ " +
                  subTotal.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </p>
            </div>
            <div className="flex w-full justify-between">
              <p className="w-[36%] text-right">CGST {cgst}%</p>
              <p>
                {"₹ " +
                  (subTotal * cgst * 0.01).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </p>
            </div>
            <div className="flex w-full justify-between">
              <p className="w-[36%] text-right">SGST {sgst}%</p>
              <p>
                {"₹ " +
                  (subTotal * sgst * 0.01).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </p>
            </div>
            <div className="flex w-full justify-between">
              <p className="w-[36%] text-right">IGST {igst}%</p>
              <p>
                {"₹ " +
                  (subTotal * igst * 0.01).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </p>
            </div>
            <div className="flex w-full justify-between">
              <p className="w-[36%] text-right">Round off</p>
              <p>{(Math.round(total) - total).toFixed(2)}</p>
            </div>
          </div>
          <div className="flex w-full justify-between border-t border-foreground p-2 font-bold">
            <p className="w-[36%] text-right text-lg">Total</p>
            <p className="text-lg font-bold">
              {"₹ " +
                totalAmount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </p>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="flex w-full border border-t-0 border-foreground">
        <div className="w-[64%] border-t-0 border-foreground p-1">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">Terms and Conditions</p>
            <span className="text-sm">E & O.E</span>
          </div>
          <div className="text-xs">
            <ol className="list-decimal px-5">
              {termsNConditions?.length > 0 &&
                termsNConditions.map((tnc, i) => <li key={i}>{tnc}</li>)}
            </ol>
          </div>
        </div>
        <div className="flex w-[36%] flex-col items-end border-l border-foreground p-1">
          <p>For {user?.org?.name}</p>
          <div className="h-20"></div>
          <p>Authorized Signature</p>
        </div>
      </div>
    </div>
  )
})

export default GSTTemplate
