import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

const Taxes = ({
  register,

  invoiceState,
  setInvoiceState,
}) => {

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
          <div className="flex items-center">
            <p className="inline text-2xl font-semibold text-foreground">
              Miscellaneous Charges &nbsp;
            </p>
            <div className="group relative inline-flex items-center justify-center rounded-full border border-foreground px-[6px] text-[12px]">
              <span className="cursor-default font-bold text-foreground">?</span>
              <span className="invisible absolute left-5 top-1 w-[200px] overflow-hidden rounded-md rounded-tl-none border bg-border p-1 px-2 text-xs text-foreground opacity-0 transition-opacity group-hover:visible group-hover:opacity-100">
                Miscellaneous charges can include freight, set up, insurance,
                and a variety of other costs incurred to deliver purchased goods
                to a location.
              </span>
            </div>
          </div>
          <div className="flex w-2/3 flex-nowrap items-center gap-x-4 text-foreground">
            <p className="w-1/5 text-xl">Charges</p>
            <span>:</span>
            <div className="rounded-rounded bg-background outline outline-1 outline-gray-300">
              <input
                {...register("miscellaneous", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      miscellaneous: e.target.value === "" ? 0 : e.target.value,
                    })
                    sessionStorage.setItem(
                      "miscellaneous",
                      e.target.value === "" ? 0 : e.target.value,
                    )
                  },
                })}
                min={0.0}
                placeholder="0"
                type="number"
                className="h-fit w-14 bg-background text-center text-lg outline-none focus:outline-none focus:placeholder:opacity-0"
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
            <div className="rounded-rounded bg-background outline outline-1 outline-gray-300">
              <input
                {...register("taxes.igst", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: {
                        ...invoiceState.taxes,
                        igst: e.target.value === "" ? 0 : e.target.value,
                      },
                    })
                    sessionStorage.setItem(
                      "taxes",
                      JSON.stringify({
                        ...invoiceState.taxes,
                        igst: e.target.value === "" ? 0 : e.target.value,
                      }),
                    )
                  },
                })}
                min={0.0}
                placeholder="0"
                type="number"
                className="h-fit w-14 bg-background text-center text-lg outline-none focus:outline-none focus:placeholder:opacity-0"
              />
              <span className="pointer-events-none pr-2 text-lg text-gray-400">
                %
              </span>
            </div>
          </div>

          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">CGST</p>
            <span>:</span>
            <div className="rounded-rounded bg-background outline outline-1 outline-gray-300">
              <input
                {...register("taxes.cgst", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: {
                        ...invoiceState.taxes,
                        cgst: e.target.value === "" ? 0 : e.target.value,
                      },
                    })
                    sessionStorage.setItem(
                      "taxes",
                      JSON.stringify({
                        ...invoiceState.taxes,
                        cgst: e.target.value === "" ? 0 : e.target.value,
                      }),
                    )
                  },
                })}
                min={0.0}
                placeholder="0"
                type="number"
                className="h-fit w-14 bg-background text-center text-lg outline-none focus:outline-none focus:placeholder:opacity-0"
              />
              <span className="pointer-events-none pr-2 text-lg text-gray-400">
                %
              </span>
            </div>
          </div>
          <div className="flex flex-nowrap items-center gap-x-4">
            <p className="w-1/5 text-xl">SGST</p>
            <span>:</span>
            <div className="rounded-rounded bg-background outline outline-1 outline-gray-300">
              <input
                {...register("taxes.sgst", {
                  valueAsNumber: true,
                  onBlur: (e) => {
                    setInvoiceState({
                      ...invoiceState,
                      taxes: {
                        ...invoiceState.taxes,
                        sgst: e.target.value === "" ? 0 : e.target.value,
                      },
                    })
                    sessionStorage.setItem(
                      "taxes",
                      JSON.stringify({
                        ...invoiceState.taxes,
                        sgst: e.target.value === "" ? 0 : e.target.value,
                      }),
                    )
                  },
                })}
                min={0.0}
                type="number"
                placeholder="0"
                className="h-fit w-14 bg-background text-center text-lg outline-none focus:outline-none focus:placeholder:opacity-0"
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
