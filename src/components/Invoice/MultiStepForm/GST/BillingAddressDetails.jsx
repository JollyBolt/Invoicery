import React from "react"
import { motion } from "framer-motion"
function BillingAddressDetails({
  register,
  errors,
  watch,
  invoiceState,
  setInvoiceState,
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <div className="flex w-full flex-col gap-y-3">
          <h1 className="text-2xl font-semibold">Billing Address</h1>
          <div className="flex w-full flex-nowrap justify-between">
            <div className="w-3/5">
              <div className="relative flex w-full flex-col flex-nowrap">
                <input
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
              </div>
              <p className="absolute mt-1 text-sm text-red-500">
                {errors.billingCity ? (
                  errors.billingCity?.message
                ) : (
                  <span className="select-none">&nbsp;</span>
                )}
              </p>
            </div>
            <motion.button
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2 }}
              onClick={() => {
                setInvoiceState({
                  ...invoiceState,
                  customer: {
                    ...invoiceState.customer,
                    address: {
                      ...invoiceState.customer.address,
                      billing: {
                        ...invoiceState.customer.address.billing,
                        city: watch("billingCity"),
                      },
                    },
                  },
                })
              }}
              type="button"
              className="rounded-rounded bg-primary px-3 font-semibold text-white transition-colors duration-200 hover:bg-primaryLight"
            >
              Save Billing Address
            </motion.button>
          </div>
        </div>

        {/* <div className="mt-3 flex w-full flex-col gap-y-3">
          <h1 className="text-2xl font-semibold">Shipping Address</h1>
          <div className="flex w-full flex-col gap-y-3">
            <div className="w-full">
              <div className="relative flex w-full flex-col flex-nowrap">
                <input
                  id="shippingStreetAddress"
                  type="text"
                  placeholder="Street Address"
                  className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                  {...register("shippingStreetAddress", {
                    required: "Street Address is required",
                    onBlur: (e) => {
                      setInvoiceState({
                        ...invoiceState,
                        customer: {
                          ...invoiceState.customer,
                          address: {
                            ...invoiceState.customer.address,
                            shipping: {
                              ...invoiceState.customer.address.shipping,
                              streetAddress: e.target.value,
                            },
                          },
                        },
                      })
                    },
                  })}
                />
                <label htmlFor="shippingStreetAddress" className="float-label">
                  Street Address<span className="text-red-500">&#42;</span>
                </label>
              </div>
              <p className="mt-1 text-sm text-red-500">
                {errors.shippingStreetAddress ? (
                  errors.shippingStreetAddress?.message
                ) : (
                  <span className="select-none">&nbsp;</span>
                )}
              </p>
            </div>
            <div className="flex w-full flex-nowrap justify-between">
              <div className="relative flex w-2/5 flex-col">
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    id="shippingCity"
                    type="text"
                    placeholder="City"
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                    {...register("shippingCity", {
                      required: "City is required",
                      onBlur: (e) => {
                        setInvoiceState({
                          ...invoiceState,
                          customer: {
                            ...invoiceState.customer,
                            address: {
                              ...invoiceState.customer.address,
                              shipping: {
                                ...invoiceState.customer.address.shipping,
                                city: e.target.value,
                              },
                            },
                          },
                        })
                      },
                    })}
                  />
                  <label htmlFor="shippingCity" className="float-label">
                    City<span className="text-red-500">&#42;</span>
                  </label>
                </div>
                <p className="mt-1 text-sm text-red-500">
                  {errors.shippingCity ? (
                    errors.shippingCity?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
              </div>

              <div className="relative flex w-2/5 flex-col">
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    id="shippingState"
                    type="text"
                    placeholder="State"
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                    {...register("shippingState", {
                      required: "State is required",
                      onBlur: (e) => {
                        setInvoiceState({
                          ...invoiceState,
                          customer: {
                            ...invoiceState.customer,
                            address: {
                              ...invoiceState.customer.address,
                              shipping: {
                                ...invoiceState.customer.address.shipping,
                                state: e.target.value,
                              },
                            },
                          },
                        })
                      },
                    })}
                  />
                  <label htmlFor="shippingState" className="float-label">
                    State<span className="text-red-500">&#42;</span>
                  </label>
                </div>
                <p className="mt-1 text-sm text-red-500">
                  {errors.shippingState ? (
                    errors.shippingState?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex w-full flex-nowrap justify-between">
              <div className="relative flex w-2/5 flex-col">
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    id="shippingStateCode"
                    type="text"
                    placeholder="State Code"
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                    {...register("shippingStateCode", {
                      required: "State Code is required",
                      min: {
                        value: 2,
                        message: "State Code must be 2 digits",
                      },
                      max: {
                        value: 2,
                        message: "State Code must be 2 digits",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "State Code must be only digits",
                      },
                      onBlur: (e) => {
                        setInvoiceState({
                          ...invoiceState,
                          customer: {
                            ...invoiceState.customer,
                            address: {
                              ...invoiceState.customer.address,
                              shipping: {
                                ...invoiceState.customer.address.shipping,
                                stateCode: e.target.value,
                              },
                            },
                          },
                        })
                      },
                    })}
                  />
                  <label htmlFor="shippingStateCode" className="float-label">
                    State Code<span className="text-red-500">&#42;</span>
                  </label>
                </div>
                <p className="mt-1 text-sm text-red-500">
                  {errors.shippingStateCode ? (
                    errors.shippingStateCode?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
              </div>

              <div className="relative flex w-2/5 flex-col">
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    id="shippingZip"
                    type="text"
                    placeholder="ZIP Code"
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                    {...register("shippingZip", {
                      required: "ZIP Code is required",
                      min: {
                        value: 6,
                        message: "ZIP Code must be 6 digits",
                      },
                      max: {
                        value: 6,
                        message: "ZIP Code must be 6 digits",
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "ZIP Code must be only digits",
                      },
                      onBlur: (e) => {
                        setInvoiceState({
                          ...invoiceState,
                          customer: {
                            ...invoiceState.customer,
                            address: {
                              ...invoiceState.customer.address,
                              shipping: {
                                ...invoiceState.customer.address.shipping,
                                zip: e.target.value,
                              },
                            },
                          },
                        })
                      },
                    })}
                  />
                  <label htmlFor="shippingZip" className="float-label">
                    ZIP Code<span className="text-red-500">&#42;</span>
                  </label>
                </div>
                <p className="mt-1 text-sm text-red-500">
                  {errors.shippingZip ? (
                    errors.shippingZip?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </motion.div>
    </>
  )
}

export default BillingAddressDetails
