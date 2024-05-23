import React, { useEffect, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import { FaCheck } from "../../assets/index";
function MultiStepForm() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full">
      <Stepper step={step} />

      <button
        onClick={() => {
          if (step > 1) {
            setStep(step - 1);
            console.log(step);
          }
        }}
        className="text-black hover:bg-gray-300  text-xl py-1 px-3"
      >
        Go Back
      </button>
      <button
        onClick={() => {
          if (step < 4) {
            setStep(step + 1);
            console.log(step);
          }
        }}
        className="text-white bg-primary font-semibold text-xl py-1 px-3"
      >
        {step === 4 ? "Save" : "Next"}
      </button>
    </div>
  );
}

export default MultiStepForm;

function Stepper({ step }) {
  const [scope, animate] = useAnimate();
  const initialAnimate = async () => {
    await animate(scope.current, { scaleX: 0 });
    await animate(scope.current, { backgroundColor: "var(--primary)" });
  };
  useEffect(() => {
    if (step === 1) {
      animate(scope.current, { scaleX: 0 }, { duration: 0.3 });
    } else if (step === 2) {
      animate(scope.current, { scaleX: 0.34 }, { duration: 0.3 });
    } else if (step === 3) {
      animate(scope.current, { scaleX: 0.67 }, { duration: 0.3 });
    } else if (step === 4) {
      animate(scope.current, { scaleX: 1 }, { duration: 0.3 });
    }
  }, [step]);

  useEffect(() => {
    initialAnimate();
  }, []);

  return (
    <div className="w-full px-4 py-2 flex justify-center items-center mb-24">
      <div className="relative flex w-full justify-between items-center">
        {/* Horizontal Progress Bar */}
        <div className="absolute  overflow-visible left-0 bg-gray-200 h-1 w-full">
          <motion.div
            ref={scope}
            className=" origin-left bg-transparent h-full w-full"
          ></motion.div>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <div className={`rounded-full ${step>=1?'bg-primary':'bg-gray-200'} text-white z-10 w-10 h-10 flex justify-center items-center`}>
            {step > 1 ? <FaCheck /> : 1}
          </div>
          <p className="absolute top-12 text-xs">Details</p>
        </div>

        <div className="flex flex-col gap-y-2 items-center">
          <div className={`rounded-full transition-colors duration-300 ${step>=2?'bg-primary text-white':'bg-gray-200 text-black'} z-10 w-10 h-10 flex justify-center items-center`}>
            {step > 2 ? <FaCheck /> : 2}
          </div>
          <p className="absolute top-12 text-xs">Add Products</p>
        </div>

        <div className="flex flex-col gap-y-2 items-center">
          <div className={`rounded-full transition-colors duration-300 ${step>=3?'bg-primary text-white':'bg-gray-200 text-black'} z-10 w-10 h-10 flex justify-center items-center`}>
            {step > 3 ? <FaCheck /> : 3}
          </div>
          <p className="absolute top-12 text-xs">Signature</p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <div className={`rounded-full transition-colors duration-300 ${step>=4?'bg-primary text-white':'bg-gray-200 text-black'} z-10 w-10 h-10 flex justify-center items-center`}>
            4
          </div>
          <p className="absolute top-12 text-xs">Finish</p>
        </div>
      </div>
    </div>
  );
}
