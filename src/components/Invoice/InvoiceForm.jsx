import React, { useState, useEffect, useRef } from "react"
import MultiStepFormGST from "./MultiStepForm/GST/MultiStepFormGST"
import Stepper from "../../components/Invoice/Stepper"
import { motion } from "framer-motion"
import { useReactToPrint } from "react-to-print"
import AccordionSolutions from "../Accordian"

function InvoiceForm({
  template,
  setTemplate,
  invoiceState,
  setInvoiceState,
  printDocRef,
}) {
  const [step, setStep] = useState(
    sessionStorage.getItem("step") ? Number(sessionStorage.getItem("step")) : 1,
  )
  useEffect(() => {
    if (!sessionStorage.getItem("step")) {
      sessionStorage.setItem("step", step)
    }
  }, [])

  const handlePrint = useReactToPrint({
    content: () => printDocRef.current,
    documentTitle: invoiceState.invoiceNumber,
  })

  const formSwitch = () => {
    switch (template) {
      case "gst":
        return (
          <MultiStepFormGST
            step={step}
            setStep={setStep}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
            handlePrint={handlePrint}
          />
        )
      // case "simple":
      //   return <SimpleFormGST step={step} setStep={setStep} invoiceState={invoiceState} setInvoiceState={setInvoiceState} handlePrint={handlePrint} />
    }
  }
  return (
    <>
      <Stepper step={step} template={template} />

      <div className="h-full bg-background p-6">
        {step === 1 ? (
          <div className="flex h-full w-full flex-col gap-y-5">
            <div className="w-full flex-1">
              <AccordionSolutions
                setTemplate={setTemplate}
                setInvoiceState={setInvoiceState}
                invoiceState={invoiceState}
              />
            </div>
            <div className="flex w-full justify-between">
              <button disabled className="px-3 py-1 text-xl text-gray-400">
                Go Back
              </button>
              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.85 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  if (step < 4) {
                  }
                  setStep(step + 1)
                  sessionStorage.setItem("step", step + 1)
                }}
                className="rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
              >
                Next
              </motion.button>
            </div>
          </div>
        ) : (
          formSwitch()
        )}
      </div>
    </>
  )
}

export default InvoiceForm
