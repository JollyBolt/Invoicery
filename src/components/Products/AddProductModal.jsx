import React, { useState } from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { postProduct } from "../../redux/slices/productSlice"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { DevTool } from "@hookform/devtools"

const AddProductModal = ({ isOpen, setIsOpen }) => {
  const productSchema = yup.object({
    name: yup.string().required("Product Name is required"),
    hsn_code: yup.string(),
    price: yup.number("Please enter valid price").required("Price is required"),
  })

  const form = useForm({
    defaultValues: {
      name: "",
      hsn_code: "",
      price: "",
    },
    // mode: "all",
    resolver: yupResolver(productSchema),
  })

  const { register, handleSubmit, formState, reset, clearErrors, control } =
    form
  const { errors, isSubmitting } = formState
  // const { loading } = useSelector((state) => state.products);
  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handlePost)(e)
    setIsOpen(false)
    location.reload()
  }
  const handlePost = ({ name, hsn_code, price }) => {
    // console.log("object");
    dispatch(postProduct({ name, hsn_code, price }))
  }

  return (
    <>
      {/* <DevTool control={control} /> */}
      <AnimatePresence>
        {isOpen && (
          <div className="absolute inset-0 z-[100] flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              className="w-full"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <form
                onSubmit={onSubmit}
                noValidate
                className="mx-auto w-1/3 max-w-none rounded-rounded bg-white p-2 px-4"
              >
                <div className="mx-auto mb-2 flex w-full flex-nowrap justify-between">
                  <h3 className="font-sans text-3xl font-extrabold">
                    Add a Product
                  </h3>
                  {/* if there is a button in form, it will close the modal */}
                  <motion.button
                    initial={{ rotate: "0deg" }}
                    whileHover={{ rotate: "180deg" }}
                    transition={{ type: "spring", duration: 0.7 }}
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setIsOpen(false)
                    }}
                    className="rounded-full px-3 py-1 text-xl font-extralight text-red-500"
                  >
                    ✕
                  </motion.button>
                </div>
                <hr />
                <div className="my-6 space-y-4">
                  <div>
                    <div className="mt-4 grid grid-cols-1 gap-3">
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            id="productName"
                            {...register("name")}
                            type="text"
                            placeholder="Product Name"
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                          />
                          <label htmlFor="productName" className="float-label">
                            Product Name
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.name ? (
                            errors.name?.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            id="hsnCode"
                            {...register("hsn_code")}
                            type="text"
                            placeholder="HSN Code"
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                          />
                          <label htmlFor="hsnCode" className="float-label">
                            HSN Code
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.hsn_code ? (
                            errors.hsn_code?.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                      <div>
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            id="price"
                            {...register("price")}
                            type="number"
                            min={0.0}
                            placeholder="HSN Code"
                            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
                          />
                          <label htmlFor="price" className="float-label">
                            Price(INR)
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.price ? (
                            errors.price?.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 mt-2 flex w-full justify-end gap-x-4">
                  {/* <form method="dialog"> */}
                  <button
                    onClick={() => {
                      clearErrors()
                      reset()
                      setIsOpen(false)
                    }}
                    type="button"
                    className="text-md rounded-rounded border-none bg-transparent px-2 py-1 text-lg text-black shadow-none transition-colors duration-200 hover:border-none hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  {/* </form> */}
                  {isSubmitting ? (
                    <div className="flex w-20 justify-center rounded-rounded bg-primary text-center">
                      <img src="/src/assets/Loading2.gif" className="w-9" />
                    </div>
                  ) : (
                    <motion.input
                      initial={{ scale: 1 }}
                      whileTap={{ scale: 0.85 }}
                      transition={{ delay: 0 }}
                      type="submit"
                      value="Submit"
                      // disabled={isSubmitting}
                      className="text-md rounded-rounded bg-primary px-2 py-1 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight"
                    />
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default AddProductModal
