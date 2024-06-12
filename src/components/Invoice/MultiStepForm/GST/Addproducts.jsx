import React, { useState } from "react"
import { motion } from "framer-motion"

const AddProducts = ({
  fields,
  errors,
  append,
  remove,
  register,
  watch,
  setValue,
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

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <div className="mb-5 mt-2 flex flex-col gap-y-4">
          {fields.map((field, ind) => {
            //RHF recommends using field.id as key instead of ind
            return (
              <div
                className="flex w-full flex-nowrap justify-between gap-x-2"
                key={field.id}
              >
                <div className="relative flex w-3/5 flex-col overflow-visible">
                  <input
                    className="peer w-full rounded-md border px-3 py-2 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                    type="text"
                    placeholder="Product Name"
                    {...register(`products[${ind}].name`, {
                      required: {
                        value: true,
                        message: "Please enter a customer name",
                      },
                      onChange: (e) => {
                        setValueState(watch(`products[${ind}]`).name)
                      },
                    })}
                  />
                  {watch(`products[${ind}]`).name.length >= 3 && (
                    <motion.div
                      className={`absolute top-12 -z-10 max-h-[100px] w-full overflow-scroll bg-white opacity-0 drop-shadow-lg transition-all duration-300 peer-focus:z-10 peer-focus:opacity-100`}
                    >
                      {filteredPeople.length ? (
                        filteredPeople.map((person, i) => {
                          return (
                            <h2
                              onClick={() => {
                                setValue(`products[${ind}].name`, person.name)
                              }}
                              key={i}
                              className="py-1 pl-2 text-lg hover:cursor-pointer hover:bg-gray-200"
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
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-1/6 rounded border pl-2 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                  min={1}
                  max={999}
                  {...register(`products[${ind}].quantity`, {
                    valueAsNumber: {
                      value: true,
                      message: "Please enter a valid number",
                    },
                  })}
                />
                {ind > 0 ? ( //can't remove all fields, atleast one field has to be added
                  <button
                    className="flex w-fit flex-nowrap items-center justify-center rounded-full p-2 text-xl text-white transition-colors hover:bg-neutral-200"
                    type="button"
                    onClick={() => remove(ind)}
                  >
                    <span className="bg-transparent px-2 text-xl font-light text-red-500">
                      X
                    </span>
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="flex w-fit select-none flex-nowrap items-center justify-center rounded-full p-2 text-xl text-white"
                    type="button"
                    onClick={() => remove(ind)}
                  >
                    <span className="bg-transparent px-2 text-xl font-light text-white">
                      X
                    </span>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={() => append({ name: "", quantity: "" })}
          type="button"
          className="text-md float-right mb-4 rounded-rounded p-1 text-primary outline outline-1 outline-primary hover:bg-primary hover:text-white"
        >
          <span className="text-lg font-semibold">+</span> Add Products
        </button>
      </motion.div>
    </>
  )
}

export default AddProducts