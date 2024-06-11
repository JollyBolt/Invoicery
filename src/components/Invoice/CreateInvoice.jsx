import React, { useState, useEffect, useRef } from "react";
import MultiStepForm1 from "./MultiStepForm1";
import { useAnimate, motion } from "framer-motion";
import InvoicePreview from "./InvoicePreview";
// import { useReactToPrint } from "react-to-print";

function CreateInvoice() {
  const [template, setTemplate] = useState("gst");
  const [step, setStep] = useState(1);
  const componentRef = useRef();

  return (
    <>
      <div className="flex w-full">
        <div className="flex h-[80vh] w-1/2 shrink-0 flex-col rounded-r-3xl bg-white">
          <Stepper step={step} template={template}/>

          <div className="h-full bg-white p-14">
            {step === 1 ? (
              <div className="flex h-full w-full flex-col gap-y-5">
                <div className="flex h-full w-full flex-1 justify-center gap-10">
                  <motion.button
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.12 }}
                    onClick={() => setTemplate("gst")}
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
                    onClick={() => setTemplate("food")}
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
                  <motion.button
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      if (step < 4) {
                      }
                      setStep(step + 1);
                    }}
                    className="rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
                  >
                    Next
                  </motion.button>
                </div>
              </div>
            ) : (
              <MultiStepForm1
                step={step}
                setStep={setStep}
                printDocRef={componentRef}
              />
            )}
          </div>
        </div>
        <div className="h-[80vh] w-full overflow-y-scroll px-10">
          <InvoicePreview ref={componentRef} />
        </div>
      </div>
    </>
  );
}

export default CreateInvoice;

function Stepper({ step, template }) {
  const [scope, animate] = useAnimate();
  const initialAnimate = async () => {
    if (template === "gst") {
      await animate(scope.current, { scaleX: 0 }), { delay: 0 };
      await animate(
        scope.current,
        { backgroundColor: "var(--primary)" },
        { delay: 0 },
      );
      await animate(
        scope.current,
        { scaleX: 0.14 },
        { duration: 0.3, delay: 0 },
      );
    } else if (template === "food") {
      await animate(scope.current, { scaleX: 0 }), { delay: 0 };
      await animate(
        scope.current,
        { backgroundColor: "var(--primary)" },
        { delay: 0 },
      );
      await animate(
        scope.current,
        { scaleX: 0.25 },
        { duration: 0.3, delay: 0 },
      );
    }
  };
  useEffect(() => {
    if (template === "gst") {
      if (step === 1) {
        animate(scope.current, { scaleX: 0.14 }, { duration: 0.3 });
      } else if (step === 2) {
        animate(scope.current, { scaleX: 0.28 }, { duration: 0.3 });
      } else if (step === 3) {
        animate(scope.current, { scaleX: 0.42 }, { duration: 0.3 });
      } else if (step === 4) {
        animate(scope.current, { scaleX: 0.56 }, { duration: 0.3 });
      } else if (step === 5) {
        animate(scope.current, { scaleX: 0.7 }, { duration: 0.3 });
      } else if (step === 6) {
        animate(scope.current, { scaleX: 0.84 }, { duration: 0.3 });
      } else if (step === 7) {
        animate(scope.current, { scaleX: 1 }, { duration: 0.3 });
      }
    } else if (template === "food") {
      if (step === 1) {
        animate(scope.current, { scaleX: 0.2 }, { duration: 0.3 });
      } else if (step === 2) {
        animate(scope.current, { scaleX: 0.4 }, { duration: 0.3 });
      } else if (step === 3) {
        animate(scope.current, { scaleX: 0.6 }, { duration: 0.3 });
      } else if (step === 4) {
        animate(scope.current, { scaleX: 0.8 }, { duration: 0.3 });
      } else if (step === 5) {
        animate(scope.current, { scaleX: 1 }, { duration: 0.3 });
      }
    }
  }, [step]);

  useEffect(() => {
    initialAnimate();
  }, [template]);

  const gstFormSwitch = () => {
    switch (step) {
      case 1:
        return "Choose Template";
      case 2:
        return "Invoice Details";
      case 3:
        return "Add Customer";
      case 4:
        return "Add Products";
      case 5:
        return "Taxes & Discounts";
      case 6:
        return "Terms & Conditions";
      case 7:
        return "Review Information";
    }
  };

  const foodFormSwitch = () => {
    switch (step) {
      case 1:
        return "Choose Template";
      case 2:
        return "Add Customer";
      case 3:
        return "Add Products";
      case 4:
        return "Terms & Conditions";
      case 5:
        return "Review Information";
    }
  };

  const templateSwitch = () => {
    switch (template) {
      case "gst":
        return gstFormSwitch();
      case "food":
        return foodFormSwitch();
    }
  };

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
  );
}
