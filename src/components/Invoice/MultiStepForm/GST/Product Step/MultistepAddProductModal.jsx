import React, { useState, useEffect, useRef } from "react"
import { useDebounce } from "../../../../../hooks/useDebounce"
import { fetchAllProducts } from "../../../../../redux/slices/productSlice"
import { motion, AnimatePresence } from "framer-motion"
import DiscountInput from "./DiscountInput"
import { useDispatch, useSelector } from "react-redux"

function MultistepAddProductModal({
  open,
  setOpen,
  setInvoiceState,
  resetField,
  register,
  setFocus,
  watch,
  setValue,
  invoiceState,
}) {
  const dispatch = useDispatch()
  const [value, setValueState] = useState("")
  const debouncedValue = useDebounce(value)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { products } = useSelector((state) => state.products.products)

  useEffect(() => {
    async function getRecomendations() {
      await dispatch(fetchAllProducts({ search: debouncedValue }))
    }
    getRecomendations()
  }, [debouncedValue])

  const onSubmit = async (e) => {
    e.preventDefault()
    setInvoiceState((prevState) => {
      return {
        ...prevState,
        products: [
          ...prevState.products,
          {
            name: selectedProduct.name,
            quantity: watch("product.quantity"),
            price: selectedProduct.price,
            hsn_code: selectedProduct.hsn_code,
            finalPrice: watch("product.finalPrice"),
            amount: watch("product.amount"),
            discount: {
              value: isNaN(watch("product.discount.value"))
                ? 0
                : watch("product.discount.value"),
              type: watch("product.discount.type"),
            },
          },
        ],
      }
    })
    setValue(`product.name`, "")
    setValue(`product.quantity`, 1)
    setValueState("")
    setSelectedProduct(null)
    setOpen(false)
  }

  const [key, setKey] = useState(0)
  const [id, setId] = useState(0)
  const ref = useRef()
  const handleScrollUp = () => {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      })
  }
  const handleScrollDown = () => {
    if (ref.current)
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
  }

  useEffect(() => {
    if (id < key) {
      setId(key)
      handleScrollDown()
    } else {
      setId(key)
      handleScrollUp()
    }
  }, [key])

  useEffect(()=>{
open && !selectedProduct && setFocus('product.name')
  },[open,selectedProduct])


  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="absolute inset-0 z-[100] flex h-screen w-full items-center justify-center bg-foreground/50 backdrop-blur-sm">
            <motion.div
              className="w-full"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mx-auto h-fit w-2/5 max-w-none rounded-rounded bg-background px-7 pb-5 pt-3">
                <div className="flex w-full justify-end">
                  <motion.button
                    initial={{ rotate: "0deg" }}
                    whileHover={{ rotate: "180deg" }}
                    transition={{ type: "spring", duration: 0.7 }}
                    type="button"
                    className="flex items-center justify-center rounded-full px-3 pb-2 pt-1 text-2xl text-red-500"
                    onClick={() => {
                      setValue(`product.name`, "")
                      setValue(`product.quantity`, 1)
                      setValueState("")
                      setSelectedProduct(null)
                      setOpen(false)
                      setKey(0)
                    }}
                  >
                    x
                  </motion.button>
                </div>
                <form noValidate className="">
                  {!selectedProduct ? (
                    <div className="mb-5 flex flex-col gap-y-4">
                      <div className="flex w-full flex-col flex-nowrap justify-between gap-4">
                        <div>
                          <h1 className="mb-2 px-1 text-2xl font-semibold text-foreground">
                            Enter Product Name
                          </h1>
                          <div className="relative flex w-full flex-col overflow-visible">
                            <input
                              className="border-1 peer w-full rounded-rounded border border-placeholderText bg-background px-2 py-2 text-lg text-foreground transition-colors duration-500 focus:border-foreground focus:outline-none outline-none"
                              type="text"
                              autoComplete="off"
                              onKeyDown={(e) => {
                                if (e.key === "ArrowDown") {
                                  if (products.length > 2) {
                                    if (key < products.length - 1) {
                                      setKey(key + 1)
                                    }
                                  }
                                } else if (e.key === "ArrowUp") {
                                  if (products.length > 2) {
                                    if (key > 0) {
                                      setKey(key - 1)
                                    }
                                  }
                                } else if (e.key === "Enter") {
                                  e.preventDefault()

                                  setValue(`product.name`, products[key].name, {
                                    shouldTouch: true,
                                  })
                                  setValueState(products[key].name)
                                  setSelectedProduct(products[key])
                                  setValue(
                                    "product.finalPrice",
                                    products[key].price,
                                  )
                                  setValue(
                                    "product.amount",
                                    products[key].price,
                                  )
                                  setKey(0)
                                }
                              }}
                              placeholder="Enter Product Name"
                              {...register(`product.name`, {
                                onChange: (e) => {
                                  setValueState(watch(`product.name`))
                                },
                              })}
                            />
                            {debouncedValue.length >= 0 && (
                              <motion.div
                                className={`absolute top-12 -z-10 h-fit max-h-[250px] w-full overflow-scroll rounded-md bg-background p-0.5 opacity-0 drop-shadow-lg transition-all duration-300 peer-focus:z-50 peer-focus:opacity-100`}
                              >
                                {products?.length > 0 ? (
                                  products.map((product, i) => {
                                    return (
                                      <div
                                        ref={id === i ? ref : null}
                                        onClick={() => {
                                          setValue(
                                            `product.name`,
                                            product.name,
                                            { shouldTouch: true },
                                          )
                                          setValueState(product.name)
                                          setSelectedProduct(product)
                                          setValue(
                                            "product.finalPrice",
                                            product.price,
                                          )
                                          setValue(
                                            "product.amount",
                                            product.price,
                                          )
                                        }}
                                        key={i}
                                        onMouseEnter={() => setKey(i)}
                                        className={`rounded-md py-1 pl-2 text-lg text-foreground hover:cursor-pointer ${key === i && "bg-border"}`}
                                      >
                                        {product.name}
                                      </div>
                                    )
                                  })
                                ) : (
                                  <h2 className="py-1 pl-2 text-lg text-foreground">
                                    No Matches Found.
                                  </h2>
                                )}
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h1 className="w-full text-xl font-bold text-foreground">
                        Product Name: {selectedProduct.name}
                      </h1>
                      <div className="flex w-full flex-nowrap gap-x-4 text-foreground">
                        <p>Price: {selectedProduct.price}</p>
                        <p>HSN Code: {selectedProduct.hsn_code}</p>
                      </div>
                      <div className="mt-4 flex gap-x-4">
                        <div className="relative flex w-2/5 flex-col flex-nowrap">
                          <input
                            type="number"
                            id="qty"
                            placeholder="Quantity"
                            className="peer rounded-rounded border border-placeholderText bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
                            min={1}
                            max={999}
                            {...register(`product.quantity`, {
                              required: "Quantity is required",
                              valueAsNumber: {
                                value: true,
                                message: "Please enter a valid number",
                              },
                              min: {
                                value: 1,
                                message: "Quantity has to at least be 1",
                              },
                              onBlur: (e) => {
                                setValue(
                                  "product.amount",
                                  watch("product.finalPrice") * e.target.value,
                                )
                              },
                            })}
                          />
                          <label htmlFor="qty" className="float-label">
                            Quantity<span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <DiscountInput
                          register={register}
                          setValue={setValue}
                          watch={watch}
                          product={selectedProduct}
                          invoiceState={invoiceState}
                          resetField={resetField}
                          setInvoiceState={setInvoiceState}
                        />
                      </div>

                      <div className="mt-3 flex w-full flex-nowrap justify-center text-foreground">
                        <p className="w-1/3">Final Price:</p>
                        <span className="">{watch("product.finalPrice")}</span>
                      </div>
                      <div className="flex w-full flex-nowrap justify-center text-foreground">
                        <p className="w-1/3">Amount:</p>
                        <span>{watch("product.amount")}</span>
                      </div>
                    </>
                  )}

                  {selectedProduct && (
                    <div
                      className={`mt-10 flex w-full flex-nowrap justify-between`}
                    >
                      <button
                        onClick={() => {
                          setValue(`product.name`, "")
                          setValue(`product.quantity`, 1)
                          setValueState("")
                          setSelectedProduct(null)
                        }}
                        type="button"
                        className="rounded-rounded px-2 py-1 text-foreground transition-colors duration-200 hover:bg-secondaryBtnHover"
                      >
                        Change Product
                      </button>
                      <motion.button
                        type="button"
                        onClick={onSubmit}
                        initial={{ scale: 1 }}
                        whileTap={{ scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className="rounded-rounded bg-primary px-3 py-1 text-lg font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight"
                      >
                        Save
                      </motion.button>
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MultistepAddProductModal
