import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { editCustomer } from "../../redux/slices/customerSlice"
import Mr_Ms_Mrs from "./Mr_Ms_Mrs"
import { Loader2 } from "../../assets"

const EditCustomer = ({ modalOpen, setModalOpen, customer }) => {
  const customerSchema = yup.object({
    client: yup.string().required("Client name is required"),
    email: yup.string().email("Please enter valid email"),
    contactPerson: yup.string(),
    title: yup.string(),
    phone: yup
      .string()
      .required("Contact is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Please enter valid contact number")
      .max(10, "Please enter valid contact number"),
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

  const [selectedTitle, setSelectedTitle] = useState(
    customer.contactPerson ? customer.contactPerson.split(" ")[0] : "Mr",
  )

  const form = useForm({
    defaultValues: {
      client: customer.client,
      email: customer.email || "",
      phone: customer.phone,
      contactPerson: customer.contactPerson.split(" ").slice(1).join(" ") || "",
      gstin: customer.gstin,
      title: customer.contactPerson
        ? customer.contactPerson.split(" ")[0]
        : "Mr",
    },
    mode: "all",
    resolver: yupResolver(customerSchema),
  })
  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState,
    watch,
    setValue,
  } = form
  const { errors, isSubmitting, isDirty,isValid } = formState
  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleEdit)(e)
    setModalOpen(false)
    reset()
    location.reload()
  }

  const handleEdit = ({ client, email, phone, contactPerson, gstin }) => {
    if (watch("contactPerson").trim() !== "") {
      contactPerson = selectedTitle + " " + contactPerson
    }
    dispatch(
      editCustomer({
        customer: {
          client,
          email,
          phone,
          contactPerson,
          billingAdresses: customer.billingAdresses,
          gstin,
        },
        id: customer._id,
      }),
    )
  }
  return (
    <>
      <AnimatePresence>
        {modalOpen && (
          <div className="bg-foreground/50 absolute inset-0 z-[100] flex h-screen w-full items-center justify-center backdrop-blur-sm">
            <motion.div
              className="w-full"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2, delay: 0 }}
            >
              <form
                onSubmit={onSubmit}
                noValidate
                className="bg-background mx-auto h-fit w-2/3 max-w-none rounded-rounded px-5 pb-1 pt-4"
              >
                <div className="mx-auto mb-2 flex w-full flex-nowrap justify-between">
                  <h3 className="font-sans text-3xl font-extrabold text-foreground">
                    Edit Customer
                  </h3>
                  <motion.button
                    initial={{ rotate: "0deg" }}
                    whileHover={{ rotate: "180deg" }}
                    transition={{ type: "spring", duration: 0.7 }}
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setModalOpen(false)
                    }}
                    className="rounded-full px-3 py-1 text-xl font-extralight text-red-500"
                  >
                    ✕
                  </motion.button>
                </div>
                <hr />
                <div className="mt-5">
                  <div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("client")}
                            type="text"
                            id="editClient"
                            autoComplete="off"
                            placeholder="Client Name"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label htmlFor="editClient" className="float-label">
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
                            id="editCustomerEmail"
                            autoComplete="off"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="editCustomerEmail"
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
                          setValue={setValue}
                          watch={watch}
                          selected={selectedTitle}
                          setSelected={setSelectedTitle}
                        />
                        <div className="w-full">
                          <div className="relative flex w-full flex-col flex-nowrap">
                            <input
                              {...register("contactPerson")}
                              type="text"
                              id="editCustomerContactPerson"
                              autoComplete="off"
                              className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                              placeholder="Contact Person"
                            />
                            <label
                              htmlFor="editCustomerContactPerson"
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
                            id="editCustomerPhone"
                            placeholder="Contact Number"
                            autoComplete="off"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="editCustomerPhone"
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
                            id="editCustomerGstin"
                            autoComplete="off"
                            placeholder="GSTIN"
                            className="border-placeholderText bg-background peer rounded-rounded border p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                          />
                          <label
                            htmlFor="editCustomerGstin"
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
                </div>

                <p className="text-center text-xs text-foreground">
                  Billing Adresses are added & edited inside{" "}
                  <span className="text-primaryLight">Customer Detail </span>
                  page.
                </p>

                <div className="mb-3 mt-4 flex w-full justify-end gap-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setModalOpen(false)
                    }}
                    className="text-md hover:bg-secondaryBtnHover h-fit w-fit rounded-rounded border-none bg-transparent p-2 shadow-none transition-colors duration-150 hover:border-none text-foreground"
                  >
                    Cancel
                  </button>
                  {isSubmitting ? (
                    <div className="flex w-20 justify-center rounded-rounded bg-primary text-center">
                      <img src={Loader2} className="w-9" />
                    </div>
                  ) : !isDirty || !isValid ? (
                    <div className="text-md text-disabledText flex items-center justify-center rounded-rounded bg-primaryLight px-2 py-1 text-center font-semibold">
                      Submit
                    </div>
                  ) : (
                    <motion.input
                      initial={{ scale: 1 }}
                      whileTap={{ scale: 0.85 }}
                      transition={{ delay: 0, duration: 0.2 }}
                      type="submit"
                      value="Submit"
                      // disabled={!isDirty || isSubmitting}
                      className="text-md rounded-rounded bg-primary px-2 py-1 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight"
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

export default EditCustomer
