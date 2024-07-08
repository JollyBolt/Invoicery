import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

function ShippingAddressDetails({
  register,
  errors,
  watch,
  resetField,
  setValue,
  invoiceState,
  setInvoiceState,
}) {
  const [checked, setChecked] = useState(
    sessionStorage.getItem("shippingChecked")
      ? !!sessionStorage.getItem("shippingChecked")
      : false,
  )

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <div className="mt-3 flex w-full flex-col gap-y-3">
          <div className="flex flex-nowrap items-center justify-between">
            <h1 className="text-2xl font-semibold">Shipping Address</h1>
            <div>
              <input
                type="checkbox"
                name="checkSameAsBilling"
                id="checkSameAsBilling"
                checked={!!sessionStorage.getItem("shippingChecked")}
                onClick={(e) => {
                  if (!e.target.checked) {
                    setChecked(false)
                    sessionStorage.removeItem("shippingChecked")
                    sessionStorage.removeItem("shippingAddress")
                    setValue("shippingStreetAddress", "", { shouldTouch: true })
                    setValue("shippingCity", "", { shouldTouch: true })
                    setValue("shippingState", "", { shouldTouch: true })
                    setValue("shippingStateCode", "", { shouldTouch: true })
                    setValue("shippingZip", "", { shouldTouch: true })
                    setInvoiceState({
                      ...invoiceState,
                      customer: {
                        ...invoiceState.customer,
                        address: {
                          ...invoiceState.customer.address,
                          shipping: {
                            streetAddress: "",
                            city: "",
                            state: "",
                            stateCode: "",
                            zip: "",
                          },
                        },
                      },
                    })
                  } else {
                    setChecked(true)
                    sessionStorage.setItem("shippingChecked", "true")
                    sessionStorage.setItem(
                      "shippingAddress",
                      JSON.stringify(invoiceState.customer.address.billing),
                    )
                    // setValue(
                    //   "shippingStreetAddress",
                    //   invoiceState.customer.address.billing.streetAddress,
                    //   { shouldTouch: true },
                    // )
                    // setValue(
                    //   "shippingCity",
                    //   invoiceState.customer.address.billing.city,
                    //   { shouldTouch: true },
                    // )
                    // setValue(
                    //   "shippingState",
                    //   invoiceState.customer.address.billing.state,
                    //   { shouldTouch: true },
                    // )
                    // setValue(
                    //   "shippingStateCode",
                    //   invoiceState.customer.address.billing.stateCode,
                    //   { shouldTouch: true },
                    // )
                    // setValue(
                    //   "shippingZip",
                    //   invoiceState.customer.address.billing.zip,
                    //   { shouldTouch: true },
                    // )
                    
                    resetField("shippingStreetAddress", {
                      defaultValue:
                        invoiceState.customer.address.billing.streetAddress,
                    })
                    resetField("shippingCity", {
                      defaultValue: invoiceState.customer.address.billing.city,
                    })
                    resetField("shippingState", {
                      defaultValue: invoiceState.customer.address.billing.state,
                    })
                    resetField("shippingStateCode", {
                      defaultValue:
                        invoiceState.customer.address.billing.stateCode,
                    })
                    resetField("shippingZip", {
                      defaultValue: invoiceState.customer.address.billing.zip,
                    })
                    setInvoiceState({
                      ...invoiceState,
                      customer: {
                        ...invoiceState.customer,
                        address: {
                          ...invoiceState.customer.address,
                          shipping: {
                            streetAddress:
                              invoiceState.customer.address.billing
                                .streetAddress,
                            city: invoiceState.customer.address.billing.city,
                            state: invoiceState.customer.address.billing.state,
                            stateCode:
                              invoiceState.customer.address.billing.stateCode,
                            zip: invoiceState.customer.address.billing.zip,
                          },
                        },
                      },
                    })
                  }
                  // console.log(invoiceState)
                }}
              />
              <label htmlFor="checkSameAsBilling">
                {" "}
                Same as Billing Address
              </label>
            </div>
          </div>
          <div className="flex w-full flex-col gap-y-3">
            <div className="w-full">
              <div className="relative flex w-full flex-col flex-nowrap">
                <input
                  id="shippingStreetAddress"
                  type="text"
                  placeholder="Street Address"
                  className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none disabled:bg-white"
                  {...register("shippingStreetAddress", {
                    required: "Street Address is required",
                    disabled: checked,
                    onChange: (e) => {
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
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none disabled:bg-white"
                    {...register("shippingCity", {
                      required: "City is required",
                      disabled: checked,
                      onChange: (e) => {
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
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none disabled:bg-white"
                    {...register("shippingState", {
                      required: "State is required",
                      disabled: checked,
                      onChange: (e) => {
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
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none disabled:bg-white"
                    {...register("shippingStateCode", {
                      required: "State Code is required",
                      disabled: checked,
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
                      onChange: (e) => {
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
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none disabled:bg-white"
                    {...register("shippingZip", {
                      required: "ZIP Code is required",
                      disabled: checked,
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
                      onChange: (e) => {
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
        </div>
      </motion.div>
    </>
  )
}

export default ShippingAddressDetails
