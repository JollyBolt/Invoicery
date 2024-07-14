import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { postCustomer } from "../../redux/slices/customerSlice"
import Mr_Ms_Mrs from "./Mr_Ms_Mrs"

export default function CreateCustomer({ open, setOpen }) {
  const customerSchema = yup.object({
    client: yup.string().required("Client name is required"),
    email: yup.string().email("Please enter valid email"),
    contactPerson: yup.string(),
    phone: yup
      .string()
      .required("Contact is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Please enter valid contact number")
      .max(10, "Please enter valid contact number"),
    streetAddress: yup.string().required("Street Address is required"),
    city: yup.string().required("City is required"),
    country: yup.string().required("Country is required"),
    state: yup.string().required("State is required"),
    stateCode: yup
      .string()
      .required("State Code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(2, "Must be exactly 2 digits")
      .max(2, "Must be exactly 2 digits"),
    zip: yup
      .string()
      .required("Zip is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    gstin: yup
      .string()
      .required("GSTIN is required")
      .min(15, "Please enter valid 15 digit GSTIN")
      .max(15, "Please enter valid 15 digit GSTIN")
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
        "Invalid GSTIN Format",
      ),
  })

  const form = useForm({
    defaultValues: {
      client: "",
      email: "",
      phone: "",
      contactPerson: "",
      streetAddress: "",
      city: "",
      state: "",
      stateCode: "",
      zip: "",
      country: "",
      gstin: "",
    },
    mode: "all",
    resolver: yupResolver(customerSchema),
  })
  const { register, handleSubmit, reset, clearErrors, formState, watch } = form
  const { errors, isSubmitting, isDirty, isValid } = formState
  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handlePost)(e)
    setOpen(false)
    reset()
    location.reload()
  }

  const [selectedTitle, setSelectedTitle] = useState("Mr")

  const handlePost = ({
    client,
    email,
    phone,
    contactPerson,
    streetAddress,
    city,
    country,
    state,
    stateCode,
    zip,
    gstin,
  }) => {
    if (watch("contactPerson").trim() !== "") {
      contactPerson = selectedTitle + " " + contactPerson
    }
    dispatch(
      postCustomer({
        client,
        email,
        phone,
        contactPerson,
        billingAddresses: [
          { streetAddress, city, state, stateCode, zip, country },
        ],
        gstin,
      }),
    )
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="bg-foreground/50 absolute inset-0 z-[100] flex h-screen w-full items-center justify-center backdrop-blur-sm">
            <motion.div
              className="w-full"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <form
                onSubmit={onSubmit}
                noValidate
                className="bg-background mx-auto h-fit w-2/3 max-w-none rounded-rounded px-5 pb-1 pt-4"
              >
                <div className="mx-auto mb-2 flex w-full flex-nowrap justify-between">
                  <h3 className="font-sans text-3xl font-extrabold text-foreground">
                    Add a Customer
                  </h3>

                  <motion.button
                    initial={{ rotate: "0deg" }}
                    whileHover={{ rotate: "180deg" }}
                    transition={{ type: "spring", duration: 0.7 }}
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setOpen(false)
                    }}
                    className="rounded-full px-3 py-1 text-xl font-extralight text-red-500"
                  >
                    ✕
                  </motion.button>
                </div>
                <hr />
                <div className="mt-2 space-y-1">
                  {/* Client Details */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Client Details
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("client")}
                            type="text"
                            id="client"
                            autoComplete="off"
                            placeholder="Client Name"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label htmlFor="client" className="float-label">
                            Client Name (Person/Firm)
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.client ? (
                            errors.client.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="Email Address"
                            id="customerEmail"
                            autoComplete="off"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="customerEmail"
                            className="float-label"
                          >
                            Email Address
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.email ? (
                            errors.email.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-nowrap gap-x-3">
                        <Mr_Ms_Mrs
                          selected={selectedTitle}
                          setSelected={setSelectedTitle}
                        />
                        <div className="w-full">
                          <div className="relative flex w-full flex-col flex-nowrap">
                            <input
                              {...register("contactPerson")}
                              type="text"
                              id="contactPerson"
                              autoComplete="off"
                              placeholder="Contact Person"
                              className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                            />
                            <label
                              htmlFor="contactPerson"
                              className="float-label"
                            >
                              Contact Person
                            </label>
                          </div>
                          <p className="text-xs text-red-500">
                            {errors.contactPerson ? (
                              errors.contactPerson.message
                            ) : (
                              <span className="select-none">&nbsp;</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("phone")}
                            type="text"
                            id="customerPhone"
                            autoComplete="off"
                            placeholder="Contact Number"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="customerPhone"
                            className="float-label"
                          >
                            Contact Number
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.phone ? (
                            errors.phone.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>

                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("gstin", {
                              onChange: (e) => {
                                e.target.value = e.target.value.toUpperCase()
                              },
                            })}
                            type="text"
                            id="customerGstin"
                            autoComplete="off"
                            placeholder="GSTIN"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="customerGstin"
                            className="float-label"
                          >
                            GSTIN<span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.gstin ? (
                            errors.gstin.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />

                  {/* Billing Address */}
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">
                      Billing Address
                    </h3>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("streetAddress")}
                            type="text"
                            autoComplete="off"
                            id="customerStreetAddress"
                            placeholder="Street Address"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="customerStreetAddress"
                            className="float-label"
                          >
                            Street Address
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.streetAddress ? (
                            errors.streetAddress.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("city")}
                            type="text"
                            placeholder="City"
                            autoComplete="off"
                            id="customerCity"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label className="float-label">
                            City<span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.city ? (
                            errors.city.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("zip")}
                            type="text"
                            placeholder="ZIP Code"
                            id="customerZip"
                            autoComplete="off"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label htmlFor="customerZip" className="float-label">
                            ZIP Code<span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.zip ? (
                            errors.zip.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("state")}
                            type="text"
                            placeholder="State"
                            id="customerState"
                            autoComplete="off"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="customerState"
                            className="float-label"
                          >
                            State<span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.state ? (
                            errors.state.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("stateCode")}
                            type="text"
                            placeholder="State Code"
                            id="customerStateCode"
                            autoComplete="off"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="customerStateCode"
                            className="float-label"
                          >
                            State Code
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.stateCode ? (
                            errors.stateCode.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="w-1/2 pr-1.5">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("country")}
                          type="text"
                          placeholder="Country"
                          id="customerCountry"
                          autoComplete="off"
                          className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                        />
                        <label
                          htmlFor="customerCountry"
                          className="float-label"
                        >
                          Country
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.country ? (
                          errors.country.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-3 flex w-full justify-end gap-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setOpen(false)
                    }}
                    className="text-md hover:bg-secondaryBtnHover h-fit w-fit rounded-rounded border-none bg-transparent p-2 text-foreground shadow-none transition-colors duration-150 hover:border-none"
                  >
                    Cancel
                  </button>
                  {isSubmitting ? (
                    <div className="flex w-20 justify-center rounded-rounded bg-primary text-center">
                      <img src="/src/assets/Loading2.gif" className="w-9" />
                    </div>
                  ) : (
                    <motion.input
                      initial={{ scale: 1 }}
                      whileTap={isDirty && isValid && { scale: 0.85 }}
                      transition={{ delay: 0 }}
                      type="submit"
                      value="Submit"
                      disabled={isSubmitting || !isDirty || !isValid}
                      className="text-md disabled:text-disabledText rounded-rounded bg-primary px-2 py-1 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight disabled:cursor-default disabled:bg-primaryLight"
                    />
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
