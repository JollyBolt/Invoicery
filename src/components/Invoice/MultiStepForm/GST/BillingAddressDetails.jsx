import React from "react"
import { motion } from "framer-motion"
import { useSelector } from 'react-redux';
function BillingAddressDetails({
  register,
  errors,
  watch,
  invoiceState,
  setInvoiceState,
}) {
  const { customers } = useSelector((state) => state.customers)
  
  const billingAddresses = customers[0]?.billingAddresses
  console.log(billingAddresses)
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
      </motion.div>
    </>
  )
}

export default BillingAddressDetails
