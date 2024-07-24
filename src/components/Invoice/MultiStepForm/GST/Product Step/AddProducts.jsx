import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDebounce } from "../../../../../hooks/useDebounce"
import { useDispatch } from "react-redux"
import { fetchAllProducts } from "../../../../../redux/slices/productSlice"
import MultistepAddProductModal from "./MultistepAddProductModal"
import { FaTrash } from "../../../../../assets/index"

const AddProducts = ({
  errors,
  register,
  watch,
  setValue,
  setFocus,
  resetField,
  invoiceState,
  setInvoiceState,
}) => {
  const [value, setValueState] = useState("")
  const debouncedValue = useDebounce(value)
  // const { products } = useSelector((state) => state.products)

  const dispatch = useDispatch()

  useEffect(() => {
    async function getRecomendations() {
      if (debouncedValue.length > 0) {
        await dispatch(fetchAllProducts({ search: debouncedValue }))
      }
    }
    getRecomendations()
  }, [debouncedValue])

  useEffect(() => {
    if (invoiceState.products.length > 0) {
      sessionStorage.setItem(
        "products",
        JSON.stringify(invoiceState.products),
      )
    }
  }, [invoiceState.products])

  /**
   * Handles the deletion of a product from the invoice state.
   * If the product to be deleted is the only one in the list, it removes the session storage item "products".
   *
   * @param {number} ind - The index of the product to be deleted in the invoice state's products array.
   * @returns {void}
   */
  const handleDelete = (ind) => {
    if (invoiceState.products.length === 1) {
      sessionStorage.removeItem("products")
    }
    setInvoiceState((prevState) => {
      return {
        ...prevState,
        products: prevState.products.filter((p, i) => i !== ind),
      }
    })
  }

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
          setFocus={setFocus}
          resetField={resetField}
          setOpen={setOpen}
          invoiceState={invoiceState}
          setInvoiceState={setInvoiceState}
        />

        <div className="w-full text-center">
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="text-md mb-4 w-full rounded-rounded bg-primary p-1 text-white hover:bg-primaryLight"
          >
            <span className="text-lg font-semibold">+</span> Add Products
          </button>
        </div>

        <div className="flex w-full flex-col gap-5">
          {invoiceState.products &&
            invoiceState.products.toReversed().map((product, ind) => {
              return (
                <div className="flex w-full justify-between rounded-md border border-primary bg-border p-2 pb-5 text-foreground">
                  <div className="flex flex-1 flex-col gap-0.5 text-sm">
                    <p className="text-xl font-semibold">{product.name}</p>
                    <div className="flex w-full">
                      <p className="w-1/2">
                        <span className="text-gray-400">HSN </span>
                        {product.hsn_code}
                      </p>
                      <p className="">
                        <span className="text-gray-400">Price: </span>₹
                        {product.price.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-1/2">
                        <span className="text-gray-400">Quantity: </span>
                        {product.quantity}
                      </p>
                      <p className="">
                        <span className="text-gray-400">Discount: </span>
                        {product.discount.value}{" "}
                        {product.discount.type === "percent" ? "%" : "₹"}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="w-1/2">
                        <span className="text-gray-400">Final Price: </span>₹
                        {product.finalPrice.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="">
                        <span className="text-gray-400">Amount: </span>₹
                        {product.amount.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-full w-[10%] shrink-0 items-center justify-center">
                    <button
                      onClick={() => {
                        handleDelete(ind)
                      }}
                      type="button"
                      className="py-3 text-lg font-semibold text-slate-400 transition-colors duration-150 hover:text-foreground"
                    >
                      <FaTrash />
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
