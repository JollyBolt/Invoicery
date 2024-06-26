import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleCustomer } from "../../redux/slices/customerSlice"

const CustomerDetail = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  const { customers,loading } = useSelector((state) => state.customers)
  const customerDetails = customers[0]
  const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getCustomer() {
      if (loggedIn) {
        await dispatch(fetchSingleCustomer(id))
      }
    }
    getCustomer()
  }, [loggedIn])

  if(!customerDetails) return <div>Loading</div>

  return (
    <div>
      {/* CustomerDetail */}
      <div className="w-full rounded-rounded bg-foreground px-4 py-4">
        <h1 className="text-5xl font-bold">{customerDetails.client}</h1>
        <div className="flex justify-between">
          <div className="mt-5 flex flex-col gap-y-1">
            {customerDetails.contactPerson && (
              <p className="text-lg">
                <span className="text-gray-400">Contact Person: Mr/Ms </span>
                {customerDetails.contactPerson}
              </p>
            )}
            <p className="text-lg">
              <span className="text-gray-400">Contact Number: </span>
              {customerDetails.phone}
            </p>
            <p className="text-lg">
              <span className="text-gray-400">GSTIN: </span>
              {customerDetails.gstin}
            </p>
          </div>
          <div className="text-lg">Chart</div>
        </div>
      </div>

      <div className="mt-7 flex w-full justify-between gap-x-7">
        <div className="w-1/2 rounded-rounded bg-foreground px-2 py-4">
          <h1 className="mb-5 text-2xl font-semibold">Billing Adresses</h1>

          {/* list of billing addresses */}
          <div className="flex h-fit max-h-[400px] w-full flex-col gap-y-6 overflow-y-scroll">
            {customerDetails.billingAddresses &&
              customerDetails.billingAddresses.map((address, i) => {
                return (
                  <p>
                    {address.streetAddress +
                      ", " +
                      address.city +
                      ", ZIP: " +
                      address.zip +
                      ", " +
                      address.state +
                      ", State Code: " +
                      address.stateCode}
                  </p>
                )
              })}
          </div>
        </div>

        <div className="w-full rounded-rounded bg-foreground">
          Invoices Table
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail
