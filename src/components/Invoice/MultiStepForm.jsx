import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MultiStepForm({ step, setStep }) {
  // const [step, setStep] = useState(1);

  const formSwitch = () => {
    switch (step) {
      case 1:
        return <AddCustomer />;
      case 2:
        return <AddProducts />;
      case 3:
        return <TaxesNDiscounts />;
      case 4:
        return <Finish />;
    }
  };
  return (
    <div className="h-full w-full">
      {/* <Stepper step={step} /> */}
      <div className="mb-10">{formSwitch()}</div>

      <div className="flex w-full justify-between">
        <button
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
            }
          }}
          className="rounded-rounded px-3 py-1 text-xl text-black transition-colors duration-150 hover:bg-gray-300"
        >
          Go Back
        </button>
        <button
          onClick={() => {
            if (step < 4) {
              setStep(step + 1);
            }
          }}
          className="rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
        >
          {step === 4 ? "Save" : "Next"}
        </button>
      </div>
    </div>
  );
}

export default MultiStepForm;

const AddCustomer = () => {
  const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
  ];

  const [value, setValue] = useState("");
  const filteredPeople = people.filter((customer) => {
    return customer.name.toLowerCase().includes(value.toLowerCase());
  });

  const [savedCustomer, setSavedCustomer] = useState(null);
  // const [vis, setVis] = useState(false);

  // useEffect(() => {
  //   if (value.length >= 3) {
  //     setVis(true);
  //   } else {
  //     setVis(false);
  //   }
  // }, [value]);
  return (
    <>
      {/* <AnimatePresence mode="wait"> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <p className="text-xl">Choose the customer you want to bill.</p>

        <div className="relative mt-2 flex w-full flex-nowrap gap-x-2 overflow-visible">
          <input
            type="text"
            // onFocus={() => {
            //   if (value.length >= 3) {
            //     setVis(true);
            //   }
            // }}
            // onBlur={() => setVis(false)}
            className="peer w-2/3 rounded-rounded bg-transparent px-2 py-1 text-lg outline outline-1 outline-gray-300 transition-colors duration-500 focus:outline-black"
            placeholder="Type at least 3 characters"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />

          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1 }}
            onClick={() => {
              setSavedCustomer(value);
            }}
            className="text-md rounded-rounded bg-primary px-3 py-1 font-semibold text-white hover:bg-primaryLight"
          >
            Save Customer
          </motion.button>

          {value.length >= 3 && (
            <motion.div
              className={`absolute top-12 z-10 w-full bg-white opacity-0 drop-shadow-lg transition-all duration-300 peer-focus:opacity-100`}
            >
              {filteredPeople.length ? (
                filteredPeople.map((person, ind) => {
                  return (
                    <h2
                      onClick={() => {
                        setValue(person.name);
                      }}
                      key={ind}
                      className="w-full py-1 pl-2 text-left text-lg hover:cursor-pointer hover:bg-gray-200"
                    >
                      {person.name}
                    </h2>
                  );
                })
              ) : (
                <h2 className="py-1 pl-2 text-lg">No Matches Found.</h2>
              )}
            </motion.div>
          )}
        </div>

        {/* {
  savedCustomer && <div>
   { people[people.indexOf(value)].name}
  </div>
} */}
      </motion.div>
      {/* </AnimatePresence> */}
    </>
  );
};

const AddProducts = () => {
  const people = [
    { id: 1, name: "Wade Cooper" },
    { id: 2, name: "Arlene Mccoy" },
    { id: 3, name: "Devon Webb" },
    { id: 4, name: "Tom Cook" },
    { id: 5, name: "Tanya Fox" },
    { id: 6, name: "Hellen Schmidt" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const [value, setValue] = useState("");
  const filteredPeople = people.filter((customer) => {
    return customer.name.toLowerCase().includes(value.toLowerCase());
  });

  // const [vis, setVis] = useState(false);

  // useEffect(() => {
  //   if (value.length >= 3) {
  //     setVis(true);
  //   } else {
  //     setVis(false);
  //   }
  // }, [value]);

  const [productData, setProductData] = useState([]);

  const handleSubmit = () => {
    setProductData([
      ...productData,
      {
        name: value,
        // price: "",
        quantity: document.getElementById("productQty").value,
      },
    ]);
  };
  return (
    <>
      {/* <AnimatePresence mode="wait"> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="text-md float-right mb-4 rounded-rounded p-1 text-primary outline outline-1 outline-primary hover:bg-primary hover:text-white"
        >
          <span className="text-lg font-semibold">+</span> Add Products
        </button>

        <div className="mt-4 grid w-full auto-rows-max grid-cols-8 gap-0 overflow-y-scroll">
          {productData.length !== 0 && (
            <>
              <div className="col-span-1 border border-black p-2 font-semibold">
                S No.
              </div>
              <div className="col-span-3 border-y border-r border-black p-2 font-semibold">
                Product Name
              </div>
              <div className="col-span-2 border-y border-r border-black p-2 font-semibold">
                Quantity
              </div>
              <div className="col-span-2 self-center border-y border-r border-black p-2 font-semibold">
                Actions
              </div>
              {productData.map((product, ind) => {
                return (
                  <>
                    <div className="col-span-1 self-center border-x border-b border-black p-2">
                      {ind + 1}
                    </div>
                    <div className="col-span-3 self-center border-b border-r border-black p-2">
                      {product.name}
                    </div>
                    <div className="col-span-2 self-center border-b border-r border-black p-2">
                      {product.quantity}
                    </div>
                    <div className="col-span-2 self-center border-b border-r border-black p-2">
                      <button
                        data-key={product.name}
                        onClick={(e) => {
                          setProductData(
                            productData.filter((product, ind) => {
                              if (
                                product.name !=
                                e.target.getAttribute("data-key")
                              ) {
                                return product;
                              }
                            }),
                          );
                        }}
                        className="h-full rounded-rounded text-sm text-red-500 hover:underline hover:underline-offset-2"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                );
              })}
            </>
          )}
        </div>
      </motion.div>
      {/* </AnimatePresence> */}

      {/* Modal Starts */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 grid place-items-center overflow-y-scroll bg-slate-900/20 p-8 backdrop-blur"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md cursor-default overflow-hidden rounded-lg bg-white p-6 shadow-xl"
            >
              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-bold">Choose Product</h3>

                {/* Modal Form Starts */}

                <form>
                  <div className="mt-2 flex h-[50px] w-full flex-col gap-y-2 overflow-visible">
                    <input
                      type="text"
                      // onFocus={() => {
                      //   if (value.length >= 3) {
                      //     setVis(true);
                      //   }
                      // }}
                      // onBlur={() => setVis(false)}
                      className="peer w-full rounded-rounded bg-transparent px-2 py-1 text-lg outline outline-1 outline-gray-300 transition-colors duration-500 focus:outline-black"
                      placeholder="Type at least 3 characters"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                    {value.length >= 3 && (
                      <motion.div
                        className={`-z-10 w-full bg-white opacity-0 drop-shadow-lg transition-all duration-300 peer-focus:z-10 peer-focus:opacity-100`}
                      >
                        {filteredPeople.length ? (
                          filteredPeople.map((person, ind) => {
                            return (
                              <h2
                                onClick={() => {
                                  setValue(person.name);
                                }}
                                key={ind}
                                className="py-1 pl-2 text-lg hover:cursor-pointer hover:bg-gray-200"
                              >
                                {person.name}
                              </h2>
                            );
                          })
                        ) : (
                          <h2 className="py-1 pl-2 text-lg">
                            No Matches Found.
                          </h2>
                        )}
                      </motion.div>
                    )}
                  </div>

                  <div className="my-2 flex flex-nowrap items-center justify-center gap-x-2">
                    <h3 className="text-xl">Choose Quantity : </h3>
                    <input
                      type="number"
                      name="qty"
                      min={1}
                      max={999}
                      defaultValue="1"
                      id="productQty"
                      className="h-fit w-14 rounded-rounded text-center text-lg outline outline-1 outline-gray-300"
                    />
                  </div>
                </form>

                {/* Modal Form Ends */}

                <div className="mt-7 flex justify-end gap-2">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-1/5 rounded-rounded bg-transparent py-2 font-semibold transition-colors hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSubmit();
                      setIsOpen(false);
                      setValue("");
                    }}
                    className="w-1/4 rounded-rounded bg-primary py-2 font-semibold text-white transition-opacity hover:bg-primaryLight hover:opacity-90"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const TaxesNDiscounts = () => {
  const [selected, setSelected] = useState("percent");

  const TOGGLE_CLASSES =
    "font-medium flex items-center gap-2 cursor-pointer px-3 md:pl-3 md:pr-3.5 text-lg py-3 md:py-1.5 transition-colors relative z-10";

  return (
    <>
      {/* <AnimatePresence mode="wait"> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative w-full"
      >
        <form>
          <div className="flex w-2/3 flex-col gap-y-3">
            <p className="text-2xl font-semibold">Add Taxes</p>
            <div className="flex flex-nowrap items-center gap-x-4">
              <p className="w-1/5 text-xl">IGST</p>
              <span>:</span>
              <div className="rounded-rounded bg-white outline outline-1 outline-gray-300">
                <input
                  defaultValue={"0.0"}
                  min={0.0}
                  type="number"
                  className="h-fit w-14 text-center text-lg outline-none focus:outline-none"
                />
                <span className="pointer-events-none pr-2 text-lg text-gray-400">
                  %
                </span>
              </div>
            </div>
            <div className="flex flex-nowrap items-center gap-x-4">
              <p className="w-1/5 text-xl">CGST</p>
              <span>:</span>
              <div className="rounded-rounded bg-white outline outline-1 outline-gray-300">
                <input
                  defaultValue={"0.0"}
                  min={0.0}
                  type="number"
                  className="h-fit w-14 text-center text-lg outline-none focus:outline-none"
                />
                <span className="pointer-events-none pr-2 text-lg text-gray-400">
                  %
                </span>
              </div>
            </div>
            <div className="flex flex-nowrap items-center gap-x-4">
              <p className="w-1/5 text-xl">SGST</p>
              <span>:</span>
              <div className="rounded-rounded bg-white outline outline-1 outline-gray-300">
                <input
                  defaultValue={"0.0"}
                  min={0.0}
                  type="number"
                  className="h-fit w-14 text-center text-lg outline-none focus:outline-none"
                />
                <span className="pointer-events-none pr-2 text-lg text-gray-400">
                  %
                </span>
              </div>
            </div>

            <div className="mt-4 flex w-2/3 flex-col">
              <p className="text-2xl font-semibold">Add Discounts</p>
              <div className="mt-3 flex flex-nowrap justify-between">
                <input
                  type="number"
                  name="discount"
                  defaultValue={"0.0"}
                  min={0.0}
                  className="h-fit w-20 rounded-rounded py-2 text-center text-xl outline outline-1 outline-gray-300"
                />

                <div className="relative flex w-fit items-center rounded-rounded">
                  <p
                    className={`${TOGGLE_CLASSES} ${
                      selected === "percent" ? "text-white" : "text-slate-400"
                    }`}
                    onClick={() => {
                      setSelected("percent");
                    }}
                  >
                    <span className="relative z-10">%</span>
                  </p>
                  <p
                    className={`${TOGGLE_CLASSES} ${
                      selected === "rupee" ? "text-white" : "text-slate-800"
                    }`}
                    onClick={() => {
                      setSelected("rupee");
                    }}
                  >
                    <span className="relative z-10">&#x20B9;</span>
                  </p>
                  <div
                    className={`absolute inset-0 z-0 flex ${
                      selected === "rupee" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <motion.span
                      layout
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 250,
                      }}
                      className="h-full w-1/2 rounded-rounded bg-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </motion.div>
      {/* </AnimatePresence> */}
    </>
  );
};

const Finish = () => {
  return (
    <>
      {/* <AnimatePresence mode="wait"> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full overflow-y-scroll"
      >
        <div className="w-full">
          <h1 className="text-2xl font-semibold">
            Review the Invoice Information.
          </h1>
        </div>
      </motion.div>
      {/* </AnimatePresence> */}
    </>
  );
};
