import { motion, AnimatePresence } from "framer-motion"
import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from "react-redux"
import { editCustomer } from "../../redux/slices/customerSlice"

const EditCustomer = ({ modalOpen, setModalOpen, customer }) => {
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
    gstin: yup
      .string()
      .required("GSTIN is required")
      .min(15, "Please enter valid 15 digit GSTIN")
      .max(15, "Please enter valid 15 digit GSTIN"),
  })

  const form = useForm({
    defaultValues: {
      client: customer.client,
      email: customer.email || "",
      phone: customer.phone,
      contactPerson: customer.contactPerson || "",
      gstin: customer.gstin,
    },
    mode: "all",
    resolver: yupResolver(customerSchema),
  })
  const { register, handleSubmit, reset, clearErrors, formState } = form
  const { errors, isSubmitting, isDirty } = formState
  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleEdit)(e)
    setModalOpen(false)
    reset()
    location.reload()
  }
  const handleEdit = ({ client, email, phone, contactPerson, gstin }) => {
    // console.log("object");
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

  // console.log(customer)

  return (
    <>
      <AnimatePresence>
        {modalOpen && (
          <div className="absolute inset-0 z-[100] flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm">
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
                className="mx-auto h-fit w-2/5 max-w-none rounded-rounded bg-white px-5 pb-1 pt-4"
              >
                <div className="mx-auto mb-2 flex w-full flex-nowrap justify-between">
                  <h3 className="font-sans text-3xl font-extrabold">
                    Edit Customer
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setModalOpen(false)
                    }}
                    className="btn btn-circle btn-ghost btn-sm text-lg text-red-500"
                  >
                    ✕
                  </button>
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
                            placeholder="Client Name"
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
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
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
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
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("contactPerson")}
                            type="text"
                            id="editCustomerContactPerson"
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
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
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("phone")}
                            type="text"
                            id="editCustomerPhone"
                            placeholder="Contact Number"
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
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
                            {...register("gstin")}
                            type="text"
                            id="editCustomerGstin"
                            placeholder="GSTIN"
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
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

                <p className="text-center text-xs">
                  Billing Adresses are added & edited inside{" "}
                  <span className="text-primaryLight">Customer Detail </span>
                  page.
                </p>

                <div className="mb-3 mt-4 flex w-full justify-end gap-x-2">
                  <button
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setModalOpen(false)
                    }}
                    className="text-md btn h-fit w-fit rounded-rounded border-none bg-transparent text-black shadow-none hover:border-none hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                  {isSubmitting ? (
                    <div className="flex w-20 justify-center rounded-rounded bg-primary text-center">
                      <img src="/src/assets/Loading2.gif" className="w-9" />
                    </div>
                  ) : !isDirty ? (
                    <div className="text-md flex items-center justify-center rounded-rounded bg-primaryLight px-2 py-1 text-center font-semibold text-gray-300">
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
