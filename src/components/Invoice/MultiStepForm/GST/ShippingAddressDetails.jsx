import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

function ShippingAddressDetails({
  register,
  errors,
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
            <h1 className="text-2xl font-semibold text-foreground">
              Shipping Address
            </h1>
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
                    setValue("shippingCountry", "", { shouldTouch: true })
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
                            country: "",
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
                    setValue(
                      "shippingStreetAddress",
                      invoiceState.customer.address.billing.streetAddress,
                      { shouldTouch: true, shouldDirty: true },
                    )
                    setValue(
                      "shippingCity",
                      invoiceState.customer.address.billing.city,
                      { shouldTouch: true, shouldDirty: true },
                    )
                    setValue(
                      "shippingState",
                      invoiceState.customer.address.billing.state,
                      { shouldTouch: true, shouldDirty: true },
                    )
                    setValue(
                      "shippingStateCode",
                      invoiceState.customer.address.billing.stateCode,
                      { shouldTouch: true, shouldDirty: true },
                    )
                    setValue(
                      "shippingZip",
                      invoiceState.customer.address.billing.zip,
                      { shouldTouch: true, shouldDirty: true },
                    )
                    setValue(
                      "shippingCountry",
                      invoiceState.customer.address.billing.country,
                      { shouldTouch: true, shouldDirty: true },
                    )
                    // resetField("shippingStreetAddress", {
                    //   defaultValue:
                    //     invoiceState.customer.address.billing.streetAddress,
                    //   keepDirty: true,
                    // })
                    // resetField("shippingCity", {
                    //   defaultValue: invoiceState.customer.address.billing.city,
                    //   keepDirty: true,
                    // })
                    // resetField("shippingState", {
                    //   defaultValue: invoiceState.customer.address.billing.state,
                    //   keepDirty: true,
                    // })
                    // resetField("shippingStateCode", {
                    //   defaultValue:
                    //     invoiceState.customer.address.billing.stateCode,
                    //   keepDirty: true,
                    // })
                    // resetField("shippingZip", {
                    //   defaultValue: invoiceState.customer.address.billing.zip,
                    //   keepDirty: true,
                    // })
                    // resetField("shippingCountry", {
                    //   defaultValue:
                    //     invoiceState.customer.address.billing.country,
                    //   keepDirty: true,
                    // })
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
                            country:
                              invoiceState.customer.address.billing.country,
                          },
                        },
                      },
                    })
                  }
                }}
              />
              <label htmlFor="checkSameAsBilling" className="text-foreground">
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
                  autoComplete="off"
                  className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
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
                      sessionStorage.setItem(
                        "shippingAddress",
                        JSON.stringify({
                          ...invoiceState.customer.address.shipping,
                          streetAddress: e.target.value,
                        }),
                      )
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
                    autoComplete="off"
                    type="text"
                    placeholder="City"
                    className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
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
                        sessionStorage.setItem(
                          "shippingAddress",
                          JSON.stringify({
                            ...invoiceState.customer.address.shipping,
                            city: e.target.value,
                          }),
                        )
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
                    id="shippingZip"
                    type="text"
                    autoComplete="off"
                    placeholder="ZIP Code"
                    className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                    {...register("shippingZip", {
                      required: "ZIP Code is required",
                      disabled: checked,
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "ZIP Code must be only 6 digits",
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
                        sessionStorage.setItem(
                          "shippingAddress",
                          JSON.stringify({
                            ...invoiceState.customer.address.shipping,
                            zip: e.target.value,
                          }),
                        )
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

            <div className="flex w-full flex-nowrap justify-between">
              <div className="relative flex w-2/5 flex-col">
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    id="shippingState"
                    autoComplete="off"
                    type="text"
                    placeholder="State"
                    className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
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
                        sessionStorage.setItem(
                          "shippingAddress",
                          JSON.stringify({
                            ...invoiceState.customer.address.shipping,
                            state: e.target.value,
                          }),
                        )
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

              <div className="relative flex w-2/5 flex-col">
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    id="shippingStateCode"
                    type="text"
                    autoComplete="off"
                    placeholder="State Code"
                    className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                    {...register("shippingStateCode", {
                      required: "State Code is required",
                      disabled: checked,
                      pattern: {
                        value: /^[0-9]{2}$/,
                        message: "State Code must be only 2 digits",
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
                        sessionStorage.setItem(
                          "shippingAddress",
                          JSON.stringify({
                            ...invoiceState.customer.address.shipping,
                            stateCode: e.target.value,
                          }),
                        )
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
            </div>

            <div className="relative flex w-2/5 flex-col">
              <div className="relative flex w-full flex-col flex-nowrap">
                <input
                  id="shippingCountry"
                  type="text"
                  placeholder="Country"
                  autoComplete="off"
                  className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                  {...register("shippingCountry", {
                    required: "Shipping Country is required",
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
                              country: e.target.value,
                            },
                          },
                        },
                      })
                      sessionStorage.setItem(
                        "shippingAddress",
                        JSON.stringify({
                          ...invoiceState.customer.address.shipping,
                          country: e.target.value,
                        }),
                      )
                    },
                  })}
                />
                <label htmlFor="shippingCountry" className="float-label">
                  Country<span className="text-red-500">&#42;</span>
                </label>
              </div>
              <p className="mt-1 text-sm text-red-500">
                {errors.shippingCountry ? (
                  errors.shippingCountry?.message
                ) : (
                  <span className="select-none">&nbsp;</span>
                )}
              </p>
            </div>
            {/* Form ends here */}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default ShippingAddressDetails
