import React, { useState, useEffect,useRef } from "react";
import MultiStepForm from "./MultiStepForm";
import { useAnimate, motion } from "framer-motion";
import InvoicePreview from "./InvoicePreview";
import { useReactToPrint } from "react-to-print";

function CreateInvoice() {
  const [formData, setFormData] = useState({ name: "" });
  const [step, setStep] = useState(1);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <>
      <div className="flex w-full">
        <div className="h-[80vh] w-1/2 shrink-0 rounded-r-3xl bg-white">
          <Stepper step={step} />
          {/* <div className="flex h-full flex-nowrap"> */}
          <div className="bg-white p-14">
            <MultiStepForm step={step} setStep={setStep} />
            <button onClick={handlePrint}>Print</button>
          </div>
          {/* </div> */}
        </div>
        <div className="h-[80vh] w-full  px-10 overflow-y-scroll">
          <InvoicePreview ref={ componentRef } />
        </div>
      </div>
    </>
  );
}

export default CreateInvoice;

function Stepper({ step }) {
  const [scope, animate] = useAnimate();
  const initialAnimate = async () => {
    await animate(scope.current, { scaleX: 0 });
    await animate(scope.current, { backgroundColor: "var(--primary)" });
    await animate(scope.current, { scaleX: 0.25 }, { duration: 0.3, delay: 0 });
  };
  useEffect(() => {
    if (step === 1) {
      animate(scope.current, { scaleX: 0.25 }, { duration: 0.3 });
    } else if (step === 2) {
      animate(scope.current, { scaleX: 0.5 }, { duration: 0.3 });
    } else if (step === 3) {
      animate(scope.current, { scaleX: 0.75 }, { duration: 0.3 });
    } else if (step === 4) {
      animate(scope.current, { scaleX: 1 }, { duration: 0.3 });
    }
  }, [step]);

  useEffect(() => {
    initialAnimate();
  }, []);

  const formSwitch = () => {
    switch (step) {
      case 1:
        return "Add Customer";
      case 2:
        return "Add Products";
      case 3:
        return "Taxes & Discounts";
      case 4:
        return "Review Informatiom";
    }
  };

  return (
    <div className="pointer-events-none flex w-full items-center justify-center py-2">
      <div className="relative flex w-full flex-col justify-between gap-y-4">
        <div className="pl-4 text-lg text-gray-400">
          <p className="pl-1">Step {step} of 4</p>
          <h1 className="text-4xl font-bold text-black">{formSwitch()}</h1>
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
  );
}
