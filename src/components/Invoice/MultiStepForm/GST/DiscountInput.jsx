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
    <div className="flex w-1/2 flex-nowrap">
      <input
        type="number"
        placeholder="Discount"
        {...register(`products[${index}].discount.value`, {
          valueAsNumber: true,
          onBlur: (e) => {
            setInvoiceState({
              ...invoiceState,
              products: invoiceState.products.map((FieldObject, i) => {
                if (i === index) {
                  return {
                    ...FieldObject,
                    discount: {
                      ...FieldObject.discount,
                      value: e.target.value,
                    },
                  }
                } else {
                  return FieldObject
                }
              }),
            })
          },
        })}
        min={0.0}
        className="border-1 w-full rounded-l-rounded border-y border-l border-gray-200 pl-2 text-lg focus:outline-none"
      />

      <div className="border-1 outlin relative flex w-fit items-center rounded-r-rounded border border-gray-200">
        <p
          className={`${TOGGLE_CLASSES} ${
            selected === "percent" ? "text-white" : "text-slate-400"
          }`}
          onClick={() => {
            setSelected("percent")
            setValue(`products[${index}].discount.type`, "percent")
            setInvoiceState({
              ...invoiceState,
              products: invoiceState.products.map((FieldObject, i) => {
                if (i === index) {
                  return {
                    ...FieldObject,
                    discount: {
                      ...FieldObject.discount,
                      type: "percent",
                    },
                  }
                } else {
                  return FieldObject
                }
              }),
            })
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
            setInvoiceState({
              ...invoiceState,
              products: invoiceState.products.map((FieldObject, i) => {
                if (i === index) {
                  return {
                    ...FieldObject,
                    discount: {
                      ...FieldObject.discount,
                      value: "rupee",
                    },
                  }
                } else {
                  return FieldObject
                }
              }),
            })
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
