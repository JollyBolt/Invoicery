import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDebounce } from "../../../../hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCustomers } from "../../../../redux/slices/customerSlice"
import { fetchSingleCustomer } from "../../../../redux/slices/customerSlice"
const AddCustomer = ({
  register,
  errors,
  watch,
  setValue,
  setInvoiceState,
  invoiceState,
}) => {
  const dispatch = useDispatch()
  const [value, setValueState] = useState("")
  const { customers } = useSelector((state) => state.customers)
  const debouncedValue = useDebounce(value)
  const [selectedCustomer, setSelectedCustomer] = useState(
    sessionStorage.getItem("customer")
      ? JSON.parse(sessionStorage.getItem("customer"))
      : null,
  )
  useEffect(() => {
    async function getRecomendations() {
      if (debouncedValue.length > 2) {
        await dispatch(fetchAllCustomers({ search: debouncedValue }))
      }
    }
    getRecomendations()
  }, [debouncedValue])

  // useEffect(() => {
  //   setValueState(watch("customer"))
  // }, [])

  // useEffect(() => {
  // if(sessionStorage.getItem("customer")){
  // dispatch(fetchSingleCustomer(sessionStorage.getItem("customer")))
  // setSelectedCustomer(dispatch(fetchSingleCustomer(sessionStorage.getItem("customer"))))
  // }

  //   async function getSavedValue() {
  //     if (sessionStorage.getItem("customer")) {
  //       await dispatch(fetchSingleCustomer(sessionStorage.getItem("customer")))
  //       setSelectedCustomer(customers)
  //     }
  //   }
  //   getSavedValue()
  // }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {selectedCustomer === null ? (
          <>
            <p className="text-xl">Choose the customer you want to bill.</p>
            <div className="relative mt-2 flex w-full flex-nowrap justify-between gap-x-2 overflow-visible">
              <div className="flex w-full flex-col">
                <input
                  type="text"
                  autoComplete="off"
                  {...register("customer", {
                    required: "Please select a customer",
                    onChange: (e) => {
                      setValueState(watch("customer"))
                    },
                  })}
                  className="peer w-full rounded-rounded bg-transparent px-2 py-2 text-lg outline outline-1 outline-gray-300 transition-colors duration-500 focus:outline-black"
                  placeholder="Type at least 3 characters"
                />
                <p className="mt-1 text-sm text-red-500">
                  {errors.customer ? (
                    errors.customer?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
                {debouncedValue.length > 2 && (
                  <motion.div
                    className={`absolute top-12 -z-10 max-h-[70px] w-2/3 overflow-scroll bg-white opacity-100 drop-shadow-lg transition-all duration-300 peer-focus:z-10 peer-focus:opacity-100`}
                  >
                    {customers.length ? (
                      customers.map((customer, ind) => {
                        return (
                          <h2
                            onClick={() => {
                              setValue("customer", customer.client, {
                                shouldTouch: true,
                              })
                              setValueState(customer.client)
                              setSelectedCustomer(customer)
                              // console.log(customer)
                              sessionStorage.setItem("customer", JSON.stringify(customer))
                            }}
                            key={ind}
                            className="w-full py-1 pl-2 text-left text-lg hover:cursor-pointer hover:bg-gray-200"
                          >
                            {customer.client}
                          </h2>
                        )
                      })
                    ) : (
                      <h2 className="py-1 pl-2 text-lg">No Matches Found.</h2>
                    )}
                  </motion.div>
                )}
              </div>
              {/* <motion.button
            onClick={(e) => {
              setInvoiceState({
                ...invoiceState,
                customer: { ...customers, name: watch("customer.name") },
              })
            }}
            initial={{ scale: 1 }}
            whileTap={{ scale: selectedCustomer === null ? 1 : 0.85 }}
            disabled={selectedCustomer === null}
            type="button"
            className="rounded-rounded bg-primary px-2 py-1 text-lg font-semibold text-white transition-colors duration-150 hover:bg-primaryLight disabled:opacity-25 disabled:hover:bg-primary"
            >
            Save Customer
          </motion.button> */}
            </div>
          </>
        ) : (
          <>
            {/* Display of Customer Data after fetch */}
            {/* {selectedCustomer !== null && ( */}
            <div className="relative mt-10 w-full text-xl">
              <div className="flex">
                <p className="w-36">Customer</p>
                <p>{selectedCustomer && selectedCustomer.client}</p>
              </div>
              <div className="mt-5 flex">
                <p className="w-36">GSTIN</p>
                <p>{selectedCustomer && selectedCustomer.gstin}</p>
              </div>
              <button
                onClick={() => {
                  setSelectedCustomer(null)
                  setValue("customer", "")
                  setValueState("")
                  sessionStorage.removeItem("customer")
                }}
                className="absolute -top-12 right-7 rounded-full px-3 py-1 text-2xl text-red-500 transition-colors duration-150 hover:bg-gray-200"
              >
                X
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  )
}

export default AddCustomer
