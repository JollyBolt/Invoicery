import React, { useEffect } from "react"
import { useAnimate, motion } from "framer-motion"

const Stepper = ({ step, template }) => {
  const [scope, animate] = useAnimate()
  const initialAnimate = async () => {
    if (template === "gst") {
      await animate(scope.current, { scaleX: 0 }), { delay: 0 }
      await animate(
        scope.current,
        { backgroundColor: "var(--primary)" },
        { delay: 0 },
      )
      await animate(
        scope.current,
        { scaleX: 0.14 },
        { duration: 0.3, delay: 0 },
      )
    } else if (template === "food") {
      await animate(scope.current, { scaleX: 0 }), { delay: 0 }
      await animate(
        scope.current,
        { backgroundColor: "var(--primary)" },
        { delay: 0 },
      )
      await animate(
        scope.current,
        { scaleX: 0.25 },
        { duration: 0.3, delay: 0 },
      )
    }
  }
  useEffect(() => {
    if (template === "gst") {
      if (step === 1) {
        animate(scope.current, { scaleX: 0.14 }, { duration: 0.3 })
      } else if (step === 2) {
        animate(scope.current, { scaleX: 0.28 }, { duration: 0.3 })
      } else if (step === 3) {
        animate(scope.current, { scaleX: 0.42 }, { duration: 0.3 })
      } else if (step === 4) {
        animate(scope.current, { scaleX: 0.56 }, { duration: 0.3 })
      } else if (step === 5) {
        animate(scope.current, { scaleX: 0.7 }, { duration: 0.3 })
      } else if (step === 6) {
        animate(scope.current, { scaleX: 0.84 }, { duration: 0.3 })
      } else if (step === 7) {
        animate(scope.current, { scaleX: 1 }, { duration: 0.3 })
      }
    } else if (template === "food") {
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
  }, [step])

  useEffect(() => {
    initialAnimate()
  }, [template])

  const gstFormSwitch = () => {
    switch (step) {
      case 1:
        return "Choose Template"
      case 2:
        return "Invoice Details"
      case 3:
        return "Add Customer"
      case 4:
        return "Add Products"
      case 5:
        return "Taxes & Discounts"
      case 6:
        return "Terms & Conditions"
      case 7:
        return "Review Information"
    }
  }

  const foodFormSwitch = () => {
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
      case "food":
        return foodFormSwitch()
    }
  }

  return (
    <div className="pointer-events-none flex w-full items-center justify-center py-2">
      <div className="relative flex w-full flex-col justify-between gap-y-4">
        <div className="pl-4 text-lg text-gray-400">
          <p className="pl-1">
            Step {step} of {template === "gst" ? 7 : template === "food" && 5}
          </p>
          <h1 className="text-4xl font-bold text-black">{templateSwitch()}</h1>
        </div>
        {/* Horizontal Progress Bar */}
        <div className="h-1 w-full bg-gray-200">
          <motion.div
            ref={scope}
            className="h-full w-full origin-left bg-transparent"
          ></motion.div>
        </div>
      </div>
    </div>
  )
}

export default Stepper