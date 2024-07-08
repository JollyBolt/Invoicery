import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDebounce } from "../../../../hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchAllCustomers,
  fetchSingleCustomer,
} from "../../../../redux/slices/customerSlice"

const AddCustomer = ({
  register,
  errors,
  watch,
  setValue,
  resetField,
  setInvoiceState,
  invoiceState,
}) => {
  const dispatch = useDispatch()
  const [value, setValueState] = useState("")
  const { customers, loading } = useSelector(
    (state) => state.customers.customers,
  )

  const debouncedValue = useDebounce(value)
  const [selectedCustomer, setSelectedCustomer] = useState()

  useEffect(() => {
    const getCustomer = async () => {
      await dispatch(fetchSingleCustomer(customer.id))
      setSelectedCustomer(true)
    }

    const customer = JSON.parse(sessionStorage.getItem("customer")) //Check if customer already selected in session storage

    if (customer) {
      getCustomer()
    }
  }, [])

  useEffect(() => {
    async function getRecomendations() {
      if (debouncedValue.length > 2) {
        await dispatch(fetchAllCustomers({ search: debouncedValue }))
      }
    }
    getRecomendations()
  }, [debouncedValue])

  const handleSubmit = (customer) => {
    setInvoiceState({
      ...invoiceState,
      customer: {
        ...invoiceState.customer,
        name: customer.client,
        gstin: customer.gstin,
        contactPerson: customer.contactPerson,
        phone: customer.phone,
      },
    })
    sessionStorage.setItem(
      "customer",
      JSON.stringify({
        id: customer._id,
        client: customer.client,
        gstin: customer.gstin,
        contactPerson: customer.contactPerson,
        phone: customer.phone,
      }),
    )
    setSelectedCustomer(true)
    setKey(0)
  }

  const [key, setKey] = useState(0) //State created for key inputs

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        {!selectedCustomer ? (
          <>
            <p className="text-xl">Choose the customer you want to bill.</p>
            <div className="relative mt-2 flex w-full flex-nowrap justify-between gap-x-2 overflow-visible">
              <div className="flex w-full flex-col">
                <input
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown") {
                      if (debouncedValue.length > 2) {
                        if (key < customers.length - 1) {
                          setKey(key + 1)
                        }
                      }
                    } else if (e.key === "ArrowUp") {
                      if (debouncedValue.length > 2) {
                        if (key > 0) {
                          setKey(key - 1)
                        }
                      }
                    } else if (e.key === "Enter") {
                      e.preventDefault()
                      setValue("customer", customers[key].client, {
                        shouldTouch: true,
                      })
                      setValueState(customers[key].client)
                      handleSubmit(customers[key])
                    }
                  }}
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
                    className={`absolute top-12 -z-10 max-h-[70px] w-full overflow-scroll bg-white opacity-100 drop-shadow-lg transition-all duration-300 peer-focus:z-10 peer-focus:opacity-100`}
                  >
                    {customers?.length > 0 ? (
                      customers.map((customer, ind) => {
                        return (
                          <h2
                            onClick={() => {
                              setValue("customer", customer.client, {
                                shouldTouch: true,
                              })
                              setValueState(customer.client)
                              handleSubmit(customer)
                            }}
                            key={ind}
                            className={`w-full py-1 pl-2 text-left text-lg hover:cursor-pointer hover:bg-gray-200 ${key === ind && "bg-gray-400"}`}
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
            </div>
          </>
        ) : (
          <>
            <div className="w-full rounded-md bg-primary p-1">
              <div className="flex flex-col gap-5 rounded-md bg-gray-50 p-5 font-semibold">
                <div className="flex gap-10">
                  <p className="w-[30%]">Customer</p>
                  <p className="">{invoiceState.customer?.name}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[30%]">GSTIN</p>
                  <p>{invoiceState.customer?.gstin}</p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[30%]">Contact Person</p>
                  <p>
                    {invoiceState.customer?.contactPerson
                      ? invoiceState.customer?.contactPerson
                      : "-"}
                  </p>
                </div>
                <div className="flex gap-10">
                  <p className="w-[30%]">Phone</p>
                  <p>{invoiceState.customer?.phone}</p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={() => {
                  setSelectedCustomer(false)
                  setValue("customer", "")
                  setValueState("")
                  sessionStorage.removeItem("customer")
                  sessionStorage.removeItem("billingAddress")
                  sessionStorage.removeItem("shippingAddress")
                  sessionStorage.removeItem("shippingChecked")
                  resetField("shippingStreetAddress", { defaultValue: "" })
                  resetField("shippingCity", { defaultValue: "" })
                  resetField("shippingState", { defaultValue: "" })
                  resetField("shippingStateCode", { defaultValue: "" })
                  resetField("shippingZip", { defaultValue: "" })
                  setInvoiceState({
                    ...invoiceState,
                    customer: {
                      name: "",
                      contactPerson: "",
                      gstin: "",
                      phone: "",
                      address: {
                        billing: {
                          streetAddress: "",
                          city: "",
                          state: "",
                          stateCode: "",
                          zip: "",
                          country: "",
                        },
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
                }}
                className="mt-4 rounded-rounded border-2 border-primary p-3 font-semibold text-primary"
              >
                Change Customer
              </button>
            </div>
          </>
        )}
      </motion.div>
    </>
  )
}

export default AddCustomer
