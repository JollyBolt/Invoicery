import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import DiscountInput from "./DiscountInput"
import { useDebounce } from "../../../../../hooks/useDebounce"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllProducts } from "../../../../../redux/slices/productSlice"
import MultistepAddProductModal from "./MultistepAddProductModal"
import { FaTrash } from "../../../../../assets/index"

const AddProducts = ({
  errors,
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

  useEffect(() => {
    if (invoiceState.products.length > 0) {
      sessionStorage.setItem(
        "productList",
        JSON.stringify(invoiceState.products),
      )
    }
  }, [invoiceState.products])

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

        <div className="text-center">
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="text-md mb-4 rounded-rounded p-1 text-primary outline-1 outline-primary hover:bg-primary hover:text-white"
          >
            <span className="text-lg font-semibold">+</span> Add Products
          </button>
        </div>

        <div className="gap5 flex w-full flex-col">
          {invoiceState.products &&
            invoiceState.products.map((product, ind) => {
              return (
                <div className="relative w-full pb-5">
                  <h1 className="text-xl font-semibold">{product.name}</h1>
                  <div className="flex w-full justify-between">
                    <p className="text-lg">
                      <span className="text-gray-400">HSN Code: </span>
                      {product.hsn_code}
                    </p>
                    <p className="text-lg">
                      <span className="text-gray-400">Quantity: </span>
                      {product.quantity}
                    </p>
                    <p className="text-lg">
                      <span className="text-gray-400">Discount: </span>
                      {product.discount.value}{" "}
                      {product.discount.type === "percent" ? "%" : "₹"}
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
                      onClick={() => {
                        setInvoiceState({
                          ...invoiceState,
                          products: invoiceState.products.filter((p) => {
                            return p !== product && true
                          }),
                        })
                      }}
                      type="button"
                      className="absolute bottom-7 right-0"
                    >
                      <span className="text-lg font-semibold text-slate-400 transition-colors hover:text-black">
                        <FaTrash />
                      </span>
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
