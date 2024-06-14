import React, { useState } from "react"
import { motion } from "framer-motion"

const Taxes = ({
  register,
  setValue,
  errors,
  invoiceState,
  setInvoiceState,
}) => {
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
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: { ...taxes, igst: e.target.value },
                    })
                  },
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
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: { ...taxes, cgst: e.target.value },
                    })
                  },
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
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: { ...taxes, sgst: e.target.value },
                    })
                  },
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
        </div>
      </motion.div>
    </>
  )
}

export default Taxes
