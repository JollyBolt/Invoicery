import React, { useState } from "react"
import { motion } from "framer-motion"

const Taxes = ({ register, setValue, errors }) => {
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

          {/* <div className="mt-4 flex w-2/3 flex-col">
            <p className="text-2xl font-semibold">Add Discounts</p> */}
            {/* <div className="mt-3 flex flex-nowrap justify-between">
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
            </div> */}
          {/* </div> */}
        </div>
      </motion.div>
    </>
  )
}

export default Taxes
