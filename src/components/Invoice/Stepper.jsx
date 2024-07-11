import React, { useEffect } from "react"
import { useAnimate, motion } from "framer-motion"

const Stepper = ({ step, template }) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (template === "gst") {
      if (step === 1) {
        animate(scope.current, { scaleX: 0.11 }, { duration: 0.3 })
      } else if (step === 2) {
        animate(scope.current, { scaleX: 0.22 }, { duration: 0.3 })
      } else if (step === 3) {
        animate(scope.current, { scaleX: 0.33 }, { duration: 0.3 })
      } else if (step === 4) {
        animate(scope.current, { scaleX: 0.44 }, { duration: 0.3 })
      } else if (step === 5) {
        animate(scope.current, { scaleX: 0.55 }, { duration: 0.3 })
      } else if (step === 6) {
        animate(scope.current, { scaleX: 0.66 }, { duration: 0.3 })
      } else if (step === 7) {
        animate(scope.current, { scaleX: 0.77 }, { duration: 0.3 })
      } else if (step === 8) {
        animate(scope.current, { scaleX: 0.88 }, { duration: 0.3 })
      } else if (step === 9) {
        animate(scope.current, { scaleX: 1 }, { duration: 0.3 })
      }
    } else if (template === "simple") {
      if (step === 1) {
        animate(scope.current, { scaleX: 0.2 }, { duration: 0.3 })
      } else if (step === 2) {
        animate(scope.current, { scaleX: 0.4 }, { duration: 0.3 })
      } else if (step === 3) {
        animate(scope.current, { scaleX: 0.6 }, { duration: 0.3 })
      } else if (step === 4) {
        animate(scope.current, { scaleX: 0.8 }, { duration: 0.3 })
      } else if (step === 5) {
        animate(scope.current, { scaleX: 1 }, { duration: 0.3 })
      }
    }
  }, [step, template])

  const gstFormSwitch = () => {
    switch (step) {
      case 1:
        return "Choose Template"
      case 2:
        return "Invoice Details"
      case 3:
        return "Add Customer"
      case 4:
        return "Billing Address Details"
      case 5:
        return "Shipping Address Details"
      case 6:
        return "Add Products"
      case 7:
        return "Taxes & Charges"
      case 8:
        return "Terms & Conditions"
      case 9:
        return "Review Information"
    }
  }

  const simpleFormSwitch = () => {
    switch (step) {
      case 1:
        return "Choose Template"
      case 2:
        return "Add Customer"
      case 3:
        return "Add Products"
      case 4:
        return "Terms & Conditions"
      case 5:
        return "Review Information"
    }
  }

  const templateSwitch = () => {
    switch (template) {
      case "gst":
        return gstFormSwitch()
      case "simple":
        return simpleFormSwitch()
    }
  }

  return (
    <div className="pointer-events-none flex w-full items-center justify-center py-2">
      <div className="relative flex w-full flex-col justify-between gap-y-4">
        <div className="pl-4 text-lg text-gray-400">
          <p className="pl-1">
            Step {step} of {template === "gst" ? 9 : template === "simple" && 5}
          </p>
          <h1 className="text-4xl font-bold text-black">{templateSwitch()}</h1>
        </div>
        {/* Horizontal Progress Bar */}
        <div className="h-1 w-full bg-gray-200">
          <motion.div
            initial={{ scaleX: 0 }}
            ref={scope}
            className="h-full w-full origin-left bg-primary"
          ></motion.div>
        </div>
      </div>
    </div>
  )
}

export default Stepper
