import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Taxes = ({
  register,
  setValue,
  errors,
  // watch,
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
        <div className="mb-6 flex w-full flex-col gap-y-3">
          <div>
            <p className="inline text-2xl font-semibold text-foreground">
              Miscellaneous Charges &nbsp;
            </p>
            <div className="group relative inline-flex items-center justify-center rounded-full border border-black border-primaryLight px-2">
              <span className="text-primaryLight">?</span>
              <span className="invisible absolute left-10 top-1 text-xs text-foreground opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                Miscellaneous charges can include freight, set up, insurance,
                and a variety of other costs incurred to deliver purchased goods
                to a location.{" "}
              </span>
            </div>
          </div>
          <div className="flex w-2/3 flex-nowrap items-center gap-x-4 text-foreground">
            <p className="w-1/5 text-xl">Charges</p>
            <span>:</span>
            <div className="bg-background rounded-rounded outline outline-1 outline-gray-300">
              <input
                {...register("miscellaneous", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      miscellaneous: e.target.value,
                    })
                    sessionStorage.setItem("miscellaneous", e.target.value)
                  },
                })}
                min={0.0}
                placeholder="0"
                type="number"
                className="bg-background h-fit w-14 text-center text-lg outline-none focus:outline-none focus:placeholder:opacity-0"
              />
              <span className="pointer-events-none pr-2.5 text-lg text-gray-400">
                ₹
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-2/3 flex-col gap-y-3 text-foreground">
          <p className="text-2xl font-semibold">Add Taxes</p>
          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">IGST</p>
            <span>:</span>
            <div className="bg-background rounded-rounded outline outline-1 outline-gray-300">
              <input
                {...register("taxes.igst", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: { ...invoiceState.taxes, igst: e.target.value },
                    })
                    sessionStorage.setItem(
                      "taxes",
                      JSON.stringify({
                        ...invoiceState.taxes,
                        igst: e.target.value,
                      }),
                    )
                  },
                })}
                min={0.0}
                placeholder="0"
                type="number"
                className="bg-background h-fit w-14 text-center text-lg outline-none focus:outline-none focus:placeholder:opacity-0"
              />
              <span className="pointer-events-none pr-2 text-lg text-gray-400">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">CGST</p>
            <span>:</span>
            <div className="bg-background rounded-rounded outline outline-1 outline-gray-300">
              <input
                {...register("taxes.cgst", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: { ...invoiceState.taxes, cgst: e.target.value },
                    })
                    sessionStorage.setItem(
                      "taxes",
                      JSON.stringify({
                        ...invoiceState.taxes,
                        cgst: e.target.value,
                      }),
                    )
                  },
                })}
                min={0.0}
                placeholder="0"
                type="number"
                className="h-fit w-14 text-center text-lg bg-background outline-none focus:outline-none focus:placeholder:opacity-0"
              />
              <span className="pointer-events-none pr-2 text-lg text-gray-400">
                %
              </span>
            </div>
          </div>
          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">SGST</p>
            <span>:</span>
            <div className="bg-background rounded-rounded outline outline-1 outline-gray-300">
              <input
                {...register("taxes.sgst", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: { ...invoiceState.taxes, sgst: e.target.value },
                    })
                    sessionStorage.setItem(
                      "taxes",
                      JSON.stringify({
                        ...invoiceState.taxes,
                        sgst: e.target.value,
                      }),
                    )
                  },
                })}
                min={0.0}
                type="number"
                placeholder="0"
                className="h-fit w-14 text-center text-lg bg-background outline-none focus:outline-none focus:placeholder:opacity-0"
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
