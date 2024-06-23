import React, { useState, useEffect, useRef } from "react"
import MultiStepFormGST from "./MultiStepForm/GST/MultiStepFormGST"
import Stepper from "../../components/Invoice/Stepper"
import { useAnimate, motion } from "framer-motion"
import InvoicePreview from "./InvoicePreview"
import { useReactToPrint } from "react-to-print"
import AccordionSolutions from "../Accordian"

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

      <div className="h-full max-h-[82dvh] bg-white p-6">
        {step === 1 ? (
          <div className="flex h-full w-full flex-col gap-y-5">
            <div className="w-full flex-1">
            <AccordionSolutions setTemplate={ setTemplate } setInvoiceState={ setInvoiceState } invoiceState={ invoiceState } />
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
