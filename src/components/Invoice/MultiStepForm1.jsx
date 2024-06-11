import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import { useReactToPrint } from "react-to-print"

function MultiStepForm({ step, setStep }) {
  const form = useForm({
    defaultValues: {
      invoiceNumber: "",
      customer: "",
      products: [
        {
          name: "",
          quantity: "",
        },
      ],
      termsNConditions: [{ tnc: "" }],
      discount: {
        value: 0.0,
        type: "percent",
      },
      taxes: {
        igst: 0.0,
        cgst: 0.0,
        sgst: 0.0,
      },
      date: "",
    },
    mode: "all",
  })

  const { register, handleSubmit, formState, control, setValue, watch } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: "products",
    control,
  })

  const tNc = useFieldArray({
    name: "termsNConditions",
    control,
  })

  const formSwitch = () => {
    switch (step) {
      case 2:
        return (
          <InvoiceDetails
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        )
      case 3:
        return (
          <AddCustomer
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        )
      case 4:
        return (
          <AddProducts
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
            setValue={setValue}
            watch={watch}
          />
        )
      case 5:
        return (
          <TaxesNDiscounts
            register={register}
            errors={errors}
            setValue={setValue}
          />
        )
      case 6:
        return <TermsNConditions register={register} tNc={tNc} />
      case 7:
        return <Finish />
    }
  }
  return (
    <div className="flex h-full w-full flex-col">
      {/* <Stepper step={step} /> */}
      <div className="mb-10 flex-1">
        <form>{formSwitch()}</form>
      </div>
      <DevTool control={control} />
      <div className="flex w-full justify-between">
        <button
          // disabled={step === 1}
          onClick={() => {
            setStep(step - 1)
          }}
          className="rounded-rounded px-3 py-1 text-xl text-black transition-colors duration-150 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          Go Back
        </button>
        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            if (step < 7) {
              setStep(step + 1)
            }
          }}
          className="rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
        >
          {step === 7 ? "Save" : "Next"}
        </motion.button>
      </div>
    </div>
  )
}

export default MultiStepForm

const InvoiceDetails = ({ register, errors,watch }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <div className="flex w-full flex-col gap-y-10">
          <div>
            <div className="relative flex w-full flex-col flex-nowrap">
              <input
                {...register("invoiceNumber", {
                  required: "Invoice Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invoice Number must be a number",
                  },
                })}
                type="text"
                id="invoiceNo"
                placeholder="Invoice Number"
                className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
              />
              <label htmlFor="invoiceNo" className="float-label">
                Invoice Number
              </label>
            </div>
            <p className="mt-1 text-sm text-red-500">
              {errors.invoiceNumber ? (
                errors.invoiceNumber?.message
              ) : (
                <span className="select-none">&nbsp;</span>
              )}
            </p>
          </div>
          <div>
            <div className="relative flex w-full flex-col flex-nowrap">
              <input
                {...register("date", {
                  required: "Please select a date",
                  onBlur:(e) => (e.target.type = "text")
                } 
              )}
                type="text"
                onFocus={(e) => {
                  e.target.type = "date"
                }}
                id="invoiceDate"
                placeholder="Date"
                className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
              />
              <label htmlFor="invoiceDate" className="float-label">
                Invoice Date
              </label>
            </div>
            <p className="mt-1 text-sm text-red-500">
              {errors.date ? (
                errors.date?.message
              ) : (
                <span className="select-none">&nbsp;</span>
              )}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
}

const AddCustomer = ({ register, errors, watch, setValue }) => {
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
            // onFocus={() => {
            //   if (value.length >= 3) {
            //     setVis(true);
            //   }
            // }}
            // onBlur={() => setVis(false)}
            className="peer w-2/3 rounded-rounded bg-transparent px-2 py-1 text-lg outline outline-1 outline-gray-300 transition-colors duration-500 focus:outline-black"
            placeholder="Type at least 3 characters"
          />
          <motion.button
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
      </motion.div>
    </>
  )
}

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

const TaxesNDiscounts = ({ register, setValue, errors }) => {
  const [selected, setSelected] = useState("percent")

  const TOGGLE_CLASSES =
    "font-medium flex items-center gap-2 cursor-pointer px-3 md:pl-3 md:pr-3.5 text-lg py-3 md:py-1.5 transition-colors relative z-10"

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full"
      >
        <div className="flex w-2/3 flex-col gap-y-3">
          <p className="text-2xl font-semibold">Add Taxes</p>
          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">IGST</p>
            <span>:</span>
            <div className="rounded-rounded bg-white outline outline-1 outline-gray-300">
              <input
                {...register("taxes.igst", {
                  valueAsNumber: true,
                })}
                min={0.0}
                type="number"
                className="h-fit w-14 text-center text-lg outline-none focus:outline-none"
              />
              <span className="pointer-events-none pr-2 text-lg text-gray-400">
                %
              </span>
            </div>
          </div>
          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">CGST</p>
            <span>:</span>
            <div className="rounded-rounded bg-white outline outline-1 outline-gray-300">
              <input
                {...register("taxes.cgst", {
                  valueAsNumber: true,
                })}
                min={0.0}
                type="number"
                className="h-fit w-14 text-center text-lg outline-none focus:outline-none"
              />
              <span className="pointer-events-none pr-2 text-lg text-gray-400">
                %
              </span>
            </div>
          </div>
          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">SGST</p>
            <span>:</span>
            <div className="rounded-rounded bg-white outline outline-1 outline-gray-300">
              <input
                {...register("taxes.sgst", {
                  valueAsNumber: true,
                })}
                min={0.0}
                type="number"
                className="h-fit w-14 text-center text-lg outline-none focus:outline-none"
              />
              <span className="pointer-events-none pr-2 text-lg text-gray-400">
                %
              </span>
            </div>
          </div>

          <div className="mt-4 flex w-2/3 flex-col">
            <p className="text-2xl font-semibold">Add Discounts</p>
            <div className="mt-3 flex flex-nowrap justify-between">
              <input
                type="number"
                {...register("discount.value", {
                  valueAsNumber: true,
                })}
                min={0.0}
                className="h-fit w-20 rounded-rounded py-2 text-center text-xl outline outline-1 outline-gray-300"
              />

              <div className="relative flex w-fit items-center rounded-rounded">
                <p
                  className={`${TOGGLE_CLASSES} ${
                    selected === "percent" ? "text-white" : "text-slate-400"
                  }`}
                  onClick={() => {
                    setSelected("percent")
                    setValue("discount.type", "percent")
                  }}
                >
                  <span className="relative z-10">%</span>
                </p>
                <p
                  className={`${TOGGLE_CLASSES} ${
                    selected === "rupee" ? "text-white" : "text-slate-800"
                  }`}
                  onClick={() => {
                    setSelected("rupee")
                    setValue("discount.type", "rupee")
                  }}
                >
                  <span className="relative z-10">&#x20B9;</span>
                </p>
                <div
                  className={`absolute inset-0 z-0 flex ${
                    selected === "rupee" ? "justify-end" : "justify-start"
                  }`}
                >
                  <motion.span
                    layout
                    transition={{
                      type: "spring",
                      damping: 15,
                      stiffness: 250,
                    }}
                    className="h-full w-1/2 rounded-rounded bg-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}

const TermsNConditions = ({ register, tNc }) => {
  const { fields, append, remove } = tNc
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="mb-5 mt-2 flex flex-col gap-y-4">
          {fields.map((field, ind) => {
            //RHF recommends using field.id as key instead of ind
            return (
              <div
                className="flex w-full flex-nowrap justify-between gap-x-2"
                key={field.id}
              >
                <div className="relative flex w-4/5 flex-col overflow-visible">
                  <input
                    className="peer w-full rounded-md border px-3 py-2 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                    type="text"
                    placeholder="Terms and Conditions"
                    {...register(`termsNConditions[${ind}].tnc`)}
                  />
                </div>

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
          onClick={() => append({ tnc: "" })}
          type="button"
          className="text-md float-right mb-4 rounded-rounded p-1 text-primary outline outline-1 outline-primary hover:bg-primary hover:text-white"
        >
          <span className="text-lg font-semibold">+</span> Add Field
        </button>
      </motion.div>
    </>
  )
}

const Finish = () => {
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full overflow-y-scroll"
      >
        <div className="w-full">
          <h1 className="text-2xl font-semibold">
            Review the Invoice Information.
          </h1>
        </div>
        <button onClick={handlePrint}>Print</button>
      </motion.div>
    </>
  )
}
