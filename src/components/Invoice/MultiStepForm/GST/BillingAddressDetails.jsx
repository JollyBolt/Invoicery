import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleCustomer } from "../../../../redux/slices/customerSlice"
function BillingAddressDetails({
  register,
  errors,
  watch,
  invoiceState,
  setInvoiceState,
}) {
  let billingAddresses = []

  const { customers, loading } = useSelector(
    (state) => state.customers.customers,
  )

  const [selectedAddress, setSelectedAddress] = useState(
    sessionStorage.getItem("billingAddress") ? true : false,
  )

  useEffect(() => {
    if (sessionStorage.getItem("billingAddress")) setSelectedAddress(true)
  }, [])

  if (!selectedAddress)
    billingAddresses = customers && customers[0].billingAddresses

  const handleSubmit = (billingAddress) => {
    sessionStorage.setItem(
      "billingAddress",
      JSON.stringify({
        streetAddress: billingAddress.streetAddress,
        city: billingAddress.city,
        state: billingAddress.state,
        stateCode: billingAddress.stateCode,
        zip: billingAddress.zip,
        country: billingAddress.country,
      }),
    )
    setInvoiceState({
      ...invoiceState,
      customer: {
        ...invoiceState.customer,
        address: {
          ...invoiceState.customer.address,
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
    })
    setSelectedAddress(true)
    setKey(0)
  }

  const [key, setKey] = useState(0)

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {!selectedAddress ? (
          <div className="flex w-full flex-col gap-y-3">
            <h1 className="text-2xl font-semibold text-foreground">City of Billing Address</h1>
            <div className="flex w-full flex-nowrap justify-between">
              <div className="w-full">
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        if (key < billingAddresses.length - 1) {
                          setKey(key + 1)
                        }
                      } else if (e.key === "ArrowUp") {
                        if (key > 0) {
                          setKey(key - 1)
                        }
                      } else if (e.key === "Enter") {
                        e.preventDefault()
                        handleSubmit(billingAddresses[key])
                      }
                    }}
                    id="billingCity"
                    type="text"
                    placeholder="Enter City"
                    autoComplete="off"
                    className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                    
                    {...register("billingCity", {
                      required: "Please enter city of Billing Address",
                    })}
                  />
                  <label htmlFor="billingCity" className="float-label">
                    Enter City<span className="text-red-500">&#42;</span>
                  </label>
                  <motion.div
                    className={`bg-background absolute top-14 -z-10 max-h-[120px] h-fit w-full overflow-scroll opacity-0 drop-shadow-lg transition-all duration-300 peer-focus:z-10 peer-focus:opacity-100`}
                  >
                    {customers && billingAddresses.length > 0 ? (
                      billingAddresses
                        .filter((b) =>
                          b.city
                            .toLowerCase()
                            .includes(watch("billingCity").toLowerCase()),
                        )
                        .map((ba, ind) => (
                          <div
                            onClick={() => {
                              handleSubmit(ba)
                            }}
                            key={ind}
                            className={`flex w-full justify-between p-3 text-lg text-foreground hover:cursor-pointer hover:bg-gray-200 ${key === ind && "bg-gray-400"}`}
                          >
                            <p>{ba.city}</p>
                            <p>{ba.state}</p>
                          </div>
                        ))
                    ) : (
                      <h2 className="py-1 pl-2 text-lg text-foreground">No Matches Found.</h2>
                    )}
                  </motion.div>
                </div>
                <p className="absolute mt-1 text-sm text-red-500">
                  {errors.billingCity ? (
                    errors.billingCity?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="w-full rounded-md bg-primary p-1">
              <div className="flex flex-col gap-3 rounded-md bg-background text-foreground p-5 font-semibold">
                <div className="flex gap-10">
                  <p className="w-[20%]">Street Address</p>
                  <p className="w-[70%]">
                    {invoiceState.customer.address.billing?.streetAddress}
                  </p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">City</p>
                  <p>{invoiceState.customer.address.billing?.city}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">State</p>
                  <p>{invoiceState.customer.address.billing?.state}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">Zip</p>
                  <p>{invoiceState.customer.address.billing?.zip}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">State Code</p>
                  <p>{invoiceState.customer.address.billing?.stateCode}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">Country</p>
                  <p>{invoiceState.customer.address.billing?.country}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setSelectedAddress(false)
                  setBillingAddressIndex(null)
                }}
                className="mt-4 rounded-rounded border-2 border-primary p-3 font-semibold text-primary"
              >
                Change Address
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  )
}

export default BillingAddressDetails
