import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch } from "react-redux"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { editCustomer } from "../../redux/slices/customerSlice"
import { useForm } from "react-hook-form"
import { Loader2 } from "../../assets"

function AddBillingAddressesModal({ open, setOpen, customer }) {
  const dispatch = useDispatch()

  const schema = yup.object({
    streetAddress: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    stateCode: yup
      .string()
      .required("State Code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(2, "Must be exactly 2 digits")
      .max(2, "Must be exactly 2 digits"),
    zip: yup
      .string()
      .required("ZIP Code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    country: yup.string().required("Country is required"),
  })
  const form = useForm({
    defaultValues: {
      streetAddress: "",
      city: "",
      state: "",
      stateCode: "",
      zip: "",
      country: "",
    },
    resolver: yupResolver(schema),
    mode: "all",
  })
  const { register, handleSubmit, reset, clearErrors, formState } = form
  const { errors,isSubmitting,isDirty,isValid } = formState

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleEdit)(e)
    setOpen(false)
    reset()
    location.reload()
  }

  const handleEdit = ({
    streetAddress,
    city,
    zip,
    country,
    state,
    stateCode,
  }) => {
    dispatch(
      editCustomer({
        customer: {
          ...customer,
          billingAddresses: [
            ...customer.billingAddresses,
            { streetAddress, city, zip, country, state, stateCode },
          ],
        },
        id:customer._id
      }),
    )
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="absolute inset-0 z-[100] flex h-screen w-full items-center justify-center bg-foreground/50 backdrop-blur-sm">
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
                className="mx-auto h-fit w-2/5 max-w-none rounded-rounded bg-background px-5 pb-1 pt-4"
              >
                <div className="mx-auto mb-2 flex w-full flex-nowrap justify-between">
                  <h3 className="font-sans text-3xl font-extrabold text-foreground">
                    Add Billing Address
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

                {/* Form Starts */}
                <div className="flex flex-col gap-y-4 py-5">
                  <div>
                    <div className="relative flex w-full flex-col flex-nowrap">
                      <input
                        {...register("streetAddress")}
                        type="text"
                        placeholder="Street Address"
                        id="addBillingStreetAddress"
                        autoComplete="off"
                        className="peer rounded-rounded border border-placeholderText bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                      />
                      <label
                        htmlFor="addBillingStreetAddress"
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

                  <div className="flex w-full justify-between gap-x-10">
                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("city")}
                          type="text"
                          placeholder="City"
                          id="addBillingCity"
                          autoComplete="off"
                          className="peer rounded-rounded border border-placeholderText bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                        />
                        <label htmlFor="addBillingCity" className="float-label">
                          City
                          <span className="text-red-500">&#42;</span>
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

                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("zip")}
                          type="text"
                          placeholder="ZIP Code"
                          id="addBillingZip"
                          autoComplete="off"
                          className="peer rounded-rounded border border-placeholderText bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                        />
                        <label htmlFor="addBillingZip" className="float-label">
                          ZIP Code
                          <span className="text-red-500">&#42;</span>
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
                  </div>

                  <div className="flex w-full gap-x-10">
                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("state")}
                          type="text"
                          placeholder="State"
                          id="addBillingState"
                          autoComplete="off"
                          className="peer rounded-rounded border border-placeholderText bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                        />
                        <label
                          htmlFor="addBillingState"
                          className="float-label"
                        >
                          State <span className="text-red-500">&#42;</span>
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

                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("stateCode")}
                          type="text"
                          placeholder="State Code"
                          id="addBillingStateCode"
                          autoComplete="off"
                          className="peer rounded-rounded border border-placeholderText bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                        />
                        <label
                          htmlFor="addBillingStateCode"
                          className="float-label"
                        >
                          State Code <span className="text-red-500">&#42;</span>
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

                  <div>
                    <div className="relative flex w-full flex-col flex-nowrap">
                      <input
                        {...register("country")}
                        type="text"
                        placeholder="Country"
                        id="addBillingCountry"
                        autoComplete="off"
                        className="peer rounded-rounded border border-placeholderText bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                      />
                      <label
                        htmlFor="addBillingCountry"
                        className="float-label"
                      >
                        Country <span className="text-red-500">&#42;</span>
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

                <div className="mb-3 mt-4 flex w-full justify-end gap-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setOpen(false)
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

export default AddBillingAddressesModal
