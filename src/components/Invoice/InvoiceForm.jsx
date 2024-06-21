import React, { useState, useEffect, useRef } from "react"
import MultiStepFormGST from "./MultiStepForm/GST/MultiStepFormGST"
import Stepper from "../../components/Invoice/Stepper"
import { useAnimate, motion } from "framer-motion"
import InvoicePreview from "./InvoicePreview"
import { useReactToPrint } from "react-to-print"

function InvoiceForm({
  template,
  setTemplate,
  invoiceState,
  setInvoiceState,
  printDocRef,
}) {
  const [step, setStep] = useState(1)
  const handlePrint = useReactToPrint({
    content: () => printDocRef.current,
  })
  return (
    <>
      <Stepper step={step} template={template} />

      <div className="h-full bg-white p-14">
        {step === 1 ? (
          <div className="flex h-full w-full flex-col gap-y-5">
            <div className="flex h-full w-full flex-1 justify-center gap-10">
              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.12 }}
                onClick={() => {
                  setTemplate("gst")
                  setInvoiceState({ ...invoiceState, template: "gst" })
                }}
                className={`h-fit w-2/5 rounded-rounded p-2 transition-colors duration-200 ${template === "gst" ? "bg-blue-500" : "bg-green-500"}`}
              >
                <h1 className="text-center text-2xl font-semibold">
                  GST Invoice
                </h1>
                <ul className="list-inside list-disc">
                  <li className="text-center text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla, veritatis.
                  </li>
                  <li className="text-center text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla, veritatis.
                  </li>
                  <li className="text-center text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla, veritatis.
                  </li>
                </ul>
              </motion.button>

              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.12 }}
                type="button"
                onClick={() => {
                  setTemplate("food")
                  setInvoiceState({ ...invoiceState, template: "food" })
                }}
                className={`h-fit w-2/5 rounded-rounded p-2 transition-colors duration-200 ${template === "food" ? "bg-blue-500" : "bg-green-500"}`}
              >
                <h1 className="text-center text-2xl font-semibold">
                  Food Bill
                </h1>
                <ul className="list-inside list-disc">
                  <li className="text-center text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla, veritatis.
                  </li>
                  <li className="text-center text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla, veritatis.
                  </li>
                  <li className="text-center text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla, veritatis.
                  </li>
                </ul>
              </motion.button>
            </div>
            <div className="flex w-full justify-between">
              <button
                disabled
                className="px-3 py-1 text-xl text-black transition-colors duration-150 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
              >
                Go Back
              </button>
              <button type="button" onClick={handlePrint}>
                Print
              </button>
              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  if (step < 4) {
                  }
                  setStep(step + 1)
                }}
                className="rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
              >
                Next
              </motion.button>
            </div>
          </div>
        ) : (
          <MultiStepFormGST
            step={step}
            setStep={setStep}
            // printDocRef={printDocRef}
            handlePrint={handlePrint}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )}
      </div>
    </>
  )
}

export default InvoiceForm
