import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { useReactToPrint } from "react-to-print"

const AddCustomer = ({
  register,
  errors,
  watch,
  setValue,
  setInvoiceState,
  invoiceState,
}) => {
  const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
  ]

  const [value, setValueState] = useState("")
  const filteredPeople = people.filter((customer) => {
    return customer.name.toLowerCase().includes(value.toLowerCase())
  })

  useEffect(() => {
    setValueState(watch("customer"))
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <p className="text-xl">Choose the customer you want to bill.</p>

        <div className="relative mt-2 flex w-full flex-nowrap justify-between gap-x-2 overflow-visible">
          <input
            type="text"
            {...register("customer", {
              required: {
                value: true,
                message: "Please select a customer",
              },
              onChange: (e) => {
                setValueState(watch("customer"))
              },
            })}
            className="peer w-2/3 rounded-rounded bg-transparent px-2 py-1 text-lg outline outline-1 outline-gray-300 transition-colors duration-500 focus:outline-black"
            placeholder="Type at least 3 characters"
          />
          <motion.button
            onClick={(e) => {
              setInvoiceState({
                ...invoiceState,
                customer: { ...customer, name: watch("customer.name") },
              })
            }}
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.85 }}
            type="button"
            className="rounded-rounded bg-primary px-2 py-1 text-lg font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
          >
            Save Customer
          </motion.button>

          {watch("customer").length >= 3 && (
            <motion.div
              className={`absolute top-12 -z-10 max-h-[70px] w-2/3 overflow-scroll bg-white opacity-0 drop-shadow-lg transition-all duration-300 peer-focus:z-10 peer-focus:opacity-100`}
            >
              {filteredPeople.length ? (
                filteredPeople.map((person, ind) => {
                  return (
                    <h2
                      onClick={() => {
                        setValue("customer", person.name)
                      }}
                      key={ind}
                      className="w-full py-1 pl-2 text-left text-lg hover:cursor-pointer hover:bg-gray-200"
                    >
                      {person.name}
                    </h2>
                  )
                })
              ) : (
                <h2 className="py-1 pl-2 text-lg">No Matches Found.</h2>
              )}
            </motion.div>
          )}
        </div>
        {/* Display of Customer Data after fetch */}
      </motion.div>
    </>
  )
}

export default AddCustomer
