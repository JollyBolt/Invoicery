import React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

function DiscountInput({
  invoiceState,
  setInvoiceState,
  register,
  setValue,
  index,
}) {
  const [selected, setSelected] = useState("percent")
  const TOGGLE_CLASSES =
    "font-medium flex items-center cursor-pointer px-3 md:pl-3 md:pr-3.5 text-lg py-2 md:py-1.5 transition-colors relative z-10"
  return (
    <div className="flex w-2/6 flex-nowrap">
      <input
        type="number"
        placeholder="Discount"
        {...register(`products[${index}].discount.value`, {
          valueAsNumber: true,
        })}
        min={0.0}
        className="border-1 w-full rounded-l-rounded border-y focus:outline-none border-l border-gray-200 pl-2 text-lg"
      />

      <div className="border-1 outlin relative flex w-fit items-center rounded-r-rounded border border-gray-200">
        <p
          className={`${TOGGLE_CLASSES} ${
            selected === "percent" ? "text-white" : "text-slate-400"
          }`}
          onClick={() => {
            setSelected("percent")
            setValue(`products[${index}].discount.type`, "percent")
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
            setValue(`products[${index}]discount.type`, "rupee")
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
              //   type: "spring",
              ease: "easeOut",
              //   damping: 15,
              //   stiffness: 250,
            }}
            className={`h-full w-1/2 transition-[border-radius] duration-700 ${selected === "rupee" ? "rounded-r-rounded" : ""} bg-primary`}
          />
        </div>
      </div>
    </div>
  )
}

export default DiscountInput
