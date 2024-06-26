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
  const { customers } = useSelector((state) => state.customers)
  const [selectedAddress, setSelectedAddress] = useState(false)
  const [billingAddressIndex, setBillingAddressIndex] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const customerId = sessionStorage.getItem("customerId")
    const getCustomer = async () => {
      dispatch(fetchSingleCustomer(customerId))
      const billingAddressIndex = sessionStorage.getItem("billingAddressIndex")
      if (billingAddressIndex) {
        setSelectedAddress(true)
        setBillingAddressIndex(billingAddressIndex)
      }
    }
    if (customerId) {
      getCustomer()
    }
  }, [])

  const address = customers[0]?.billingAddresses[billingAddressIndex]
  const [key, setKey] = useState(0)
  const billingAddresses = customers[0]?.billingAddresses
  // console.log(billingAddresses[0])
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
            <h1 className="text-2xl font-semibold">Billing Address</h1>
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
                        sessionStorage.setItem("billingAddressIndex", key)
                        setSelectedAddress(true)
                        setBillingAddressIndex(key)
                        setInvoiceState({
                          ...invoiceState,
                          customer: {
                            ...invoiceState.customer,
                            address: {
                              billing: {
                                ...invoiceState.customer.address.billing,
                                streetAddress:
                                  billingAddresses[billingAddressIndex]
                                    .streetAddress,
                                city: billingAddresses[billingAddressIndex]
                                  .city,
                                state:
                                  billingAddresses[billingAddressIndex].state,
                                stateCode:
                                  billingAddresses[billingAddressIndex]
                                    .stateCode,
                                zip: billingAddresses[billingAddressIndex].zip,
                                country:
                                  billingAddresses[billingAddressIndex].country,
                              },
                            },
                          },
                        })
                        setKey(0)
                      }
                    }}
                    id="billingCity"
                    type="text"
                    placeholder="Enter City"
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                    {...register("billingCity", {
                      required: "Please enter city of Billing Address",
                    })}
                  />
                  <label htmlFor="billingCity" className="float-label">
                    Enter City<span className="text-red-500">&#42;</span>
                  </label>
                  {watch("billingCity").length > 0 && (
                    <motion.div
                      className={`top-12 -z-10 max-h-[70px] overflow-scroll bg-white opacity-100 drop-shadow-lg transition-all duration-300 peer-focus:z-10 peer-focus:opacity-100`}
                    >
                      {billingAddresses.length > 0 ? (
                        billingAddresses
                          .filter((b) =>
                            b.city
                              .toLowerCase()
                              .includes(watch("billingCity").toLowerCase()),
                          )
                          .map((ba, ind) => (
                            <div
                              onClick={() => {
                                sessionStorage.setItem(
                                  "billingAddressIndex",
                                  ind,
                                )
                                setSelectedAddress(true)
                                setBillingAddressIndex(ind)
                                setInvoiceState({
                                  ...invoiceState,
                                  customer: {
                                    ...invoiceState.customer,
                                    address: {
                                      billing: {
                                        ...invoiceState.customer.address
                                          .billing,
                                        streetAddress: ba.streetAddress,
                                        city: ba.city,
                                        state: ba.state,
                                        stateCode: ba.stateCode,
                                        zip: ba.zip,
                                        country: ba.country,
                                      },
                                    },
                                  },
                                })
                                setKey(0)
                              }}
                              key={ind}
                              className={`flex w-full justify-between p-3 text-lg hover:cursor-pointer hover:bg-gray-200 ${key === ind && "bg-gray-400"}`}
                            >
                              <p>{ba.city}</p>
                              <p>{ba.state}</p>
                            </div>
                          ))
                      ) : (
                        <h2 className="py-1 pl-2 text-lg">No Matches Found.</h2>
                      )}
                    </motion.div>
                  )}
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
              <div className="flex flex-col gap-3 rounded-md bg-gray-50 p-5 font-semibold">
                <div className="flex gap-10">
                  <p className="w-[20%]">Street Address</p>
                  <p className="w-[70%]">{address?.streetAddress}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">City</p>
                  <p>{address?.city}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">State</p>
                  <p>{address?.state}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">Zip</p>
                  <p>{address?.zip}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">State Code</p>
                  <p>{address?.stateCode}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[20%]">Country</p>
                  <p>{address?.country}</p>
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
