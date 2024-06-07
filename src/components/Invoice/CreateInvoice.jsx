import React, { useState,useEffect } from "react";
import MultiStepForm from "./MultiStepForm";
import { useAnimate,motion } from "framer-motion";

function CreateInvoice() {
  const [formData, setFormData] = useState({ name: "" });
  const [step, setStep] = useState(1);
  return (
    <>
    <div className="bg-white rounded-rounded h-full">
<Stepper step={step}/>
      <div className="flex flex-nowrap justify-between h-full
      ">
        <div className="w-1/2 p-14 max-h-full bg-white rounded-r-3xl">
          {/* <input className="border border-gray-500 focus:outline-none pl-2 py-1"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          /> */}
          <MultiStepForm step={step} setStep={setStep}/>
        </div>
        {/* <div className="relative w-1/2">
            <div className="sticky top-0 left-0 w-full">
            <input className="border border-gray-500 pl-2 py-1 focus:outline-none" type="text" value={formData.name} disabled/>
            </div>
          </div> */}
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
    await animate(scope.current, { scaleX: 0.25 },{ duration: 0.3,delay:0 });
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
        return 'Add Customer';
      case 2:
        return 'Add Products';
      case 3:
        return 'Taxes & Discounts';
      case 4:
        return 'Review Informatiom';
    }
  };

  return (
    <div className="w-full pointer-events-none py-2 flex justify-center items-center mb-10">
      <div className="relative flex-col gap-y-4 flex w-full justify-between ">
        <div className="pl-4 text-lg text-gray-400">
          <p className="pl-1">
Step {step} of 4
          </p>
<h1 className="text-4xl font-bold text-black">{formSwitch()}</h1>
        </div>
        {/* Horizontal Progress Bar */}
        <div className=" bg-gray-200 h-1 w-full">
          <motion.div
            ref={scope}
            className=" origin-left bg-transparent h-full w-full"
          ></motion.div>
        </div>
   
      </div>
    </div>
  );
}