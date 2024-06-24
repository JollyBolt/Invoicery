import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DiscountInput from "../DiscountInput"
import { useDebounce } from "../../../../../hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../../../../redux/slices/productSlice"
import MultistepAddProductModal from "./MultistepAddProductModal"

const AddProducts = ({
  errors,
  // fields,
  // append,
  // remove,
  register,
  watch,
  setValue,
  invoiceState,
  setInvoiceState,
}) => {
  const [value, setValueState] = useState("")
  const debouncedValue = useDebounce(value)
  // const { products } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    async function getRecomendations() {
      if (debouncedValue.length > 2) {
        await dispatch(fetchAllProducts({ search: debouncedValue }))
      }
    }
    getRecomendations()
  }, [debouncedValue])

  const [open, setOpen] = useState(false)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <MultistepAddProductModal
          setValue={setValue}
          register={register}
          watch={watch}
          errors={errors}
          open={open}
          setOpen={setOpen}
          invoiceState={invoiceState}
          setInvoiceState={setInvoiceState}
        />
        {/* <div className="mb-5 mt-2 flex flex-col gap-y-4">
          {fields.map((field, ind) => {
            //RHF recommends using field.id as key instead of ind
            return (
              <div
                className="flex w-full flex-col flex-nowrap justify-between gap-4"
                key={field.id}
              >
                <div>
                  <div className="relative flex w-full flex-col overflow-visible">
                    <input
                      className="peer w-full rounded-md border px-3 py-2 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                      type="text"
                      placeholder="Product Name"
                      {...register(`products[${ind}].name`, {
                        required: {
                          value: true,
                          message: "Please enter a Product name",
                        },
                        onChange: (e) => {
                          setValueState(watch(`products[${ind}]`).name)
                        },
                        onBlur: (e) => {
                          setInvoiceState({
                            ...invoiceState,
                            products: invoiceState.products.map(
                              (FieldObject, i) => {
                                if (i === ind) {
                                  return {
                                    ...FieldObject,
                                    name: e.target.value,
                                  }
                                } else {
                                  return FieldObject
                                }
                              },
                            ),
                          })
                        },
                      })}
                    />
                    {debouncedValue.length >= 3 && (
                      <motion.div
                        className={`absolute top-12 -z-10 max-h-[100px] w-full overflow-scroll bg-white opacity-0 drop-shadow-lg transition-all duration-300 peer-focus:z-50 peer-focus:opacity-100`}
                      >
                        {products.length ? (
                          products.map((product, i) => {
                            return (
                              <h2
                                onClick={() => {
                                  setValue(
                                    `products[${ind}].name`,
                                    product.name,
                                  )
                                }}
                                key={i}
                                className="py-1 pl-2 text-lg hover:cursor-pointer hover:bg-gray-200"
                              >
                                {product.name}
                              </h2>
                            )
                          })
                        ) : (
                          <h2 className="py-1 pl-2 text-lg">
                            No Matches Found.
                          </h2>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between gap-3">
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-1/2 rounded border pl-2 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                    min={1}
                    max={999}
                    {...register(`products[${ind}].quantity`, {
                      valueAsNumber: {
                        value: true,
                        message: "Please enter a valid number",
                      },
                      onBlur: (e) => {
                        setInvoiceState({
                          ...invoiceState,
                          products: invoiceState.products.map(
                            (FieldObject, i) => {
                              if (i === ind) {
                                return {
                                  ...FieldObject,
                                  quantity: e.target.value,
                                }
                              } else {
                                return FieldObject
                              }
                            },
                          ),
                        })
                      },
                    })}
                  />
                  <DiscountInput
                    index={ind}
                    register={register}
                    setValue={setValue}
                    invoiceState={invoiceState}
                    setInvoiceState={setInvoiceState}
                  />
                  {ind > 0 && ( //can't remove all fields, atleast one field has to be added
                    <button
                      className="flex w-fit flex-nowrap items-center justify-center rounded-full p-2 text-xl text-white transition-colors hover:bg-neutral-200"
                      type="button"
                      onClick={() => remove(ind)}
                    >
                      <span className="bg-transparent px-2 text-xl font-light text-red-500">
                        X
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div> */}

        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="text-md mb-4 rounded-rounded p-1 text-primary outline outline-1 outline-primary hover:bg-primary hover:text-white"
          >
            <span className="text-lg font-semibold">+</span> Add Products
          </button>
        </div>

        <div className="flex w-full flex-col gap-y-5">
          {invoiceState.products &&
            invoiceState.products.map((product, ind) => {
              return (
                <div className="relative w-full pb-5">
                  <h1 className="text-xl font-semibold">{product.name}</h1>
                  <div className="flex w-2/3 justify-between">
                    <p className="text-lg">
                      <span className="text-gray-400">HSN Code: </span>
                      {product.hsnCode}
                    </p>
                    <p className="text-lg">
                      <span className="text-gray-400">Quantity: </span>
                      {product.quantity}
                    </p>
                  </div>
                  <div className="flex w-2/3 justify-between">
                    <p className="text-lg">
                      <span className="text-gray-400">Price: </span>
                      {product.finalPrice}
                    </p>
                    <p className="text-lg">
                      <span className="text-gray-400">Amount: </span>
                      {product.amount}
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() =>
                        setInvoiceState({
                          ...invoiceState,
                          products: invoiceState.products.filter((p) => {
                            return p !== product && true
                          })
                        })
                      }
                      type="button"
                      className="absolute bottom-0 right-0"
                    >
                      <span className="text-lg font-semibold">Delete</span>
                    </button>
                  </div>
                </div>
              )
            })}
        </div>
      </motion.div>
    </>
  )
}

export default AddProducts
