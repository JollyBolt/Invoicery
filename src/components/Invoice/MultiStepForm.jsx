import React, { useEffect, useState } from "react";
import { motion, useAnimate, AnimatePresence } from "framer-motion";
import { FaCheck } from "../../assets/index";
import { FiMoon, FiSun } from "react-icons/fi";

function MultiStepForm() {
  const [step, setStep] = useState(1);

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
    <div className="w-full mt-5">
      <Stepper step={step} />
      <div className="h-[60vh]">{formSwitch()}</div>

      <div className="flex w-full justify-between">
        <button
          onClick={() => {
            if (step > 1) {
              setStep(step - 1);
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
            }
          }}
          className="text-white bg-primary hover:bg-primaryLight transition-colors rounded-rounded duration-150 font-semibold text-xl py-1 px-3"
        >
          {step === 4 ? "Save" : "Next"}
        </button>
      </div>
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
    <div className="w-full pointer-events-none py-2 flex justify-center items-center mb-14">
      <div className="relative flex w-full justify-between items-center">
        {/* Horizontal Progress Bar */}
        <div className="absolute  overflow-visible left-0 bg-gray-200 h-1 w-full">
          <motion.div
            ref={scope}
            className=" origin-left bg-transparent h-full w-full"
          ></motion.div>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <div
            className={`rounded-full ${
              step >= 1 ? "bg-primary" : "bg-gray-200"
            } text-white z-10 w-10 h-10 flex justify-center items-center`}
          >
            {step > 1 ? <FaCheck /> : 1}
          </div>
          <p className="absolute top-12 text-xs text-center">Add Customers</p>
        </div>

        <div className="flex flex-col gap-y-2 items-center">
          <div
            className={`rounded-full transition-colors duration-300 ${
              step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-black"
            } z-10 w-10 h-10 flex justify-center items-center`}
          >
            {step > 2 ? <FaCheck /> : 2}
          </div>
          <p className="absolute top-12 text-xs text-center">
            Add
            <br /> Products
          </p>
        </div>

        <div className="flex flex-col gap-y-2 items-center">
          <div
            className={`rounded-full transition-colors duration-300 ${
              step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-black"
            } z-10 w-10 h-10 flex justify-center items-center`}
          >
            {step > 3 ? <FaCheck /> : 3}
          </div>
          <p className="absolute top-12 text-xs text-center">
            Taxes & Discounts
          </p>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <div
            className={`rounded-full transition-colors duration-300 ${
              step >= 4 ? "bg-primary text-white" : "bg-gray-200 text-black"
            } z-10 w-10 h-10 flex justify-center items-center`}
          >
            4
          </div>
          <p className="absolute top-12 text-xs">Finish</p>
        </div>
      </div>
    </div>
  );
}

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
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full "
      >
        <p className="text-xl">Choose the customer you want to bill.</p>

        <div className="overflow-visible relative gap-x-2 w-full mt-2 flex flex-nowrap">
          <input
            type="text"
            // onFocus={() => {
            //   if (value.length >= 3) {
            //     setVis(true);
            //   }
            // }}
            // onBlur={() => setVis(false)}
            className="focus:outline-black bg-transparent px-2 py-1 text-lg w-2/3 outline outline-gray-300 transition-colors duration-500 outline-1 rounded-rounded peer"
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
            className="text-white hover:bg-primaryLight text-md font-semibold py-1 px-3 rounded-rounded bg-primary"
          >
            Save Customer
          </motion.button>

          {value.length >= 3 && (
            <motion.div
              className={`w-full transition-all absolute opacity-0 top-12 z-10 peer-focus:opacity-100 duration-300 drop-shadow-lg bg-white
            `}
            >
              {filteredPeople.length ? (
                filteredPeople.map((person, ind) => {
                  return (
                    <h2
                      onClick={() => {
                        setValue(person.name);
                      }}
                      key={ind}
                      className="text-lg pl-2 py-1 w-full text-left hover:bg-gray-200 hover:cursor-pointer"
                    >
                      {person.name}
                    </h2>
                  );
                })
              ) : (
                <h2 className="text-lg pl-2 py-1">No Matches Found.</h2>
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
    </AnimatePresence>
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
      <AnimatePresence mode="wait">
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
            className="outline outline-1 outline-primary text-primary hover:bg-primary hover:text-white p-1 rounded-rounded text-md"
          >
            <span className="text-lg font-semibold">+</span> Add Products
          </button>

          <div className="flex flex-col overflow-y-scroll h-[50vh] mt-2">
            {productData &&
              productData.map((product, ind) => {
                return (
                  <div
                    key={product.name}
                    className="flex flex-nowrap w-full justify-between items-center"
                  >
                    <div className="flex flex-nowrap justify-between w-5/6 items-center text-lg">
                      <div>
                        <span className="font-semibold">Product Name: </span>
                        {product.name}
                      </div>
                      {/* <div>Product Price:{product.price}</div> */}
                      <div>
                        <span className="font-semibold">Quantity: </span>
                        {product.quantity}
                      </div>
                    </div>
                    <button
                      data-key={product.name}
                      onClick={(e) => {
                        setProductData(
                          productData.filter((product, ind) => {
                            if (
                              product.name != e.target.getAttribute("data-key")
                            ) {
                              return product;
                            }
                          })
                        );
                      }}
                      className="text-red-500 text-xl font-thin py-1 px-3 rounded-full hover:bg-gray-200"
                    >
                      X
                    </button>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Modal Starts */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // onClick={() => setIsOpen(false)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-20 grid place-items-center  overflow-y-scroll "
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className=" bg-white p-6 rounded-lg w-full max-w-md shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Choose Product</h3>

                {/* Modal Form Starts */}

                <form>
                  <div className="overflow-visible h-[50px] flex flex-col gap-y-2 w-full mt-2">
                    <input
                      type="text"
                      // onFocus={() => {
                      //   if (value.length >= 3) {
                      //     setVis(true);
                      //   }
                      // }}
                      // onBlur={() => setVis(false)}
                      className="focus:outline-black bg-transparent peer px-2 py-1 text-lg w-full outline outline-gray-300 transition-colors duration-500 outline-1 rounded-rounded"
                      placeholder="Type at least 3 characters"
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                    {value.length >= 3 && (
                      <motion.div
                        className={`w-full drop-shadow-lg bg-white -z-10
                    transition-all opacity-0 peer-focus:opacity-100 peer-focus:z-10 duration-300
                    `}
                      >
                        {filteredPeople.length ? (
                          filteredPeople.map((person, ind) => {
                            return (
                              <h2
                                onClick={() => {
                                  setValue(person.name);
                                }}
                                key={ind}
                                className="text-lg pl-2 py-1 hover:bg-gray-200 hover:cursor-pointer"
                              >
                                {person.name}
                              </h2>
                            );
                          })
                        ) : (
                          <h2 className="text-lg pl-2 py-1">
                            No Matches Found.
                          </h2>
                        )}
                      </motion.div>
                    )}
                  </div>

                  <div className="flex flex-nowrap items-center justify-center gap-x-2 my-2">
                    <h3 className="text-xl">Choose Quantity : </h3>
                    <input
                      type="number"
                      name="qty"
                      min={1}
                      max={999}
                      defaultValue="1"
                      id="productQty"
                      className="text-lg outline outline-1 text-center outline-gray-300 rounded-rounded h-fit w-14"
                    />
                  </div>
                </form>

                {/* Modal Form Ends */}

                <div className="flex gap-2 justify-end mt-7">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent hover:bg-gray-200 transition-colors font-semibold w-1/5 py-2 rounded-rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handleSubmit();
                      setIsOpen(false);
                    }}
                    className="bg-primary hover:opacity-90 transition-opacity text-white font-semibold hover:bg-primaryLight py-2 rounded-rounded w-1/4"
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
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full relative"
      >
        <form>
          <div className="flex flex-col gap-y-3 w-2/3">
            <p className="text-2xl font-semibold">Add Taxes</p>
            <div className="flex flex-nowrap items-center gap-x-4">
              <p className="text-xl w-1/5">IGST</p>
              <span>:</span>
              <div className="bg-white outline outline-1 outline-gray-300 rounded-rounded ">
                <input
                  defaultValue={"0.0"}
                  min={0.0}
                  type="number"
                  className="text-lg text-center h-fit w-14 focus:outline-none outline-none"
                />
                <span className="pr-2 text-lg text-gray-400 pointer-events-none">
                  %
                </span>
              </div>
            </div>
            <div className="flex flex-nowrap items-center gap-x-4">
              <p className="text-xl w-1/5">CGST</p>
              <span>:</span>
              <div className="bg-white outline outline-1 outline-gray-300 rounded-rounded ">
                <input
                  defaultValue={"0.0"}
                  min={0.0}
                  type="number"
                  className="text-lg text-center h-fit w-14 focus:outline-none outline-none"
                />
                <span className="pr-2 text-lg text-gray-400 pointer-events-none">
                  %
                </span>
              </div>
            </div>
            <div className="flex flex-nowrap items-center gap-x-4">
              <p className="text-xl w-1/5">SGST</p>
              <span>:</span>
              <div className="bg-white outline outline-1 outline-gray-300 rounded-rounded ">
                <input
                  defaultValue={"0.0"}
                  min={0.0}
                  type="number"
                  className="text-lg text-center h-fit w-14 focus:outline-none outline-none"
                />
                <span className="pr-2 text-lg text-gray-400 pointer-events-none">
                  %
                </span>
              </div>
            </div>

            <div className="w-2/3 mt-4 flex flex-col">
              <p className="text-2xl font-semibold">Add Discounts</p>
              <div className="mt-3 flex flex-nowrap justify-between">
                <input
                  type="number"
                  name="discount"
                  defaultValue={"0.0"}
                  min={0.0}
                  className="text-xl text-center h-fit w-20 outline py-2 outline-1 outline-gray-300 rounded-rounded"
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
    </AnimatePresence>
  );
};

const Finish = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <h1>Finish</h1>
      </motion.div>
    </AnimatePresence>
  );
};
