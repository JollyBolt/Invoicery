import React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function DiscountInput({
  invoiceState,
  setInvoiceState,
  register,
  setValue,
  watch,
  resetField,
  product,
}) {
  const [selected, setSelected] = useState("percent")
  const TOGGLE_CLASSES =
    "font-medium flex items-center cursor-pointer px-3 md:pl-3 md:pr-3.5 text-lg py-2 md:py-1.5 transition-colors relative z-10"
  useEffect(() => {
    // setValue("product.discount.value", 0)
    resetField("product.discount.value")
    setValue("product.finalPrice", product.price)
    setValue("product.amount", product.price * watch("product.quantity"))
  }, [selected])
  return (
    <div className="flex w-2/5 flex-nowrap gap-x-3">
      <div className="relative flex w-full flex-col flex-nowrap">
        <input
          type="number"
          min={0}
          id="discount"
          placeholder="Discount"
          {...register(`product.discount.value`, {
            valueAsNumber: true,
            onBlur: (e) => {
              if (
                watch("product.discount.value") !== "" &&
                !isNaN(watch("product.discount.value"))
              ) {
                if (selected === "rupee") {
                  setValue(
                    "product.finalPrice",
                    product.price - watch("product.discount.value"),
                  )
                } else {
                  setValue(
                    "product.finalPrice",
                    product.price -
                      (product.price * watch("product.discount.value")) / 100,
                  )
                }
                setValue(
                  "product.amount",
                  watch("product.finalPrice") * watch("product.quantity"),
                )
              } else {
                setValue("product.finalPrice", product.price)
                setValue(
                  "product.amount",
                  product.price * watch("product.quantity"),
                )
              }
              // setInvoiceState({
              //   ...invoiceState,
              //   products: invoiceState.products.map((FieldObject, i) => {
              //     if (i === index) {
              //       return {
              //         ...FieldObject,
              //         discount: {
              //           ...FieldObject.discount,
              //           value: e.target.value,
              //         },
              //       }
              //     } else {
              //       return FieldObject
              //     }
              //   }),
              // })
            },
          })}
          // min={0.0}
          // className="border-1 w-full rounded-l-rounded border-y border-l border-gray-200 pl-2 text-lg focus:outline-none"
          className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
        />
        <label htmlFor="discount" className="float-label">
          Discount
        </label>
      </div>
      <div className="border-1 border-placeholderText relative flex w-fit items-center rounded-rounded border">
        <p
          className={`${TOGGLE_CLASSES} ${
            selected === "percent" ? "text-white" : "text-placeholderText"
          }`}
          onClick={() => {
            setSelected("percent")
            setValue(`product.discount.type`, "percent")
            // setInvoiceState({
            //   ...invoiceState,
            //   products: invoiceState.products.map((FieldObject, i) => {
            //     if (i === index) {
            //       return {
            //         ...FieldObject,
            //         discount: {
            //           ...FieldObject.discount,
            //           type: "percent",
            //         },
            //       }
            //     } else {
            //       return FieldObject
            //     }
            //   }),
            // })
          }}
        >
          <span className="relative z-10">%</span>
        </p>
        <p
          className={`${TOGGLE_CLASSES} ${
            selected === "rupee" ? "text-white" : "text-placeholderText"
          }`}
          onClick={() => {
            setSelected("rupee")
            setValue(`product.discount.type`, "rupee")
            // setInvoiceState({
            //   ...invoiceState,
            //   products: invoiceState.products.map((FieldObject, i) => {
            //     if (i === index) {
            //       return {
            //         ...FieldObject,
            //         discount: {
            //           ...FieldObject.discount,
            //           value: "rupee",
            //         },
            //       }
            //     } else {
            //       return FieldObject
            //     }
            //   }),
            // })
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
            className={`h-full w-1/2 transition-[border-radius] duration-700 ${selected === "rupee" ? "rounded-r-rounded" : "rounded-l-rounded"} bg-primary`}
          />
        </div>
      </div>
    </div>
  )
}

export default DiscountInput
