import { AnimatePresence, motion } from "framer-motion"
import React from "react"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { editProduct, fetchAllProducts } from "../../redux/slices/productSlice"
import { useDispatch } from "react-redux"

function EditProductModal({ modalOpen, setModalOpen, product }) {
  const EditProductSchema = yup.object({
    name: yup.string().required("Product Name is required"),
    hsn_code: yup.string(),
    price: yup.number("Please enter valid price").required("Price is required"),
  })

  const form = useForm({
    defaultValues: {
      name: product.name,
      hsn_code: product.hsn_code || "",
      price: product.price,
    },
    mode: "all",
    resolver: yupResolver(EditProductSchema),
  })
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleEdit)(e)
    setModalOpen(false)
    reset()
    location.reload()
  }
  const handleEdit = ({ name, hsn_code, price }) => {
    // console.log(product._id);
    dispatch(
      editProduct({ product: { name, hsn_code, price }, id: product._id }),
    )
  }
  const { register, handleSubmit, formState, reset, clearErrors } = form
  const { errors, isSubmitting, isDirty } = formState

  return (
    <>
      <AnimatePresence>
        {modalOpen && (
          <div className="bg-foreground/50 absolute inset-0 z-[100] flex h-screen w-full items-center justify-center backdrop-blur-sm">
            <motion.div
              className="w-full"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {" "}
              <form
                onSubmit={onSubmit}
                noValidate
                className="bg-background mx-auto h-fit w-1/3 max-w-none rounded-rounded px-5 pb-1 pt-4"
              >
                <div className="mx-auto mb-2 flex w-full flex-nowrap justify-between">
                  <h3 className="font-sans text-3xl font-extrabold">
                    Edit Product
                  </h3>
                  <motion.button
                    initial={{ rotate: "0deg" }}
                    whileHover={{ rotate: "180deg" }}
                    transition={{ type: "spring", duration: 0.7 }}
                    type="button"
                    onClick={() => {
                      clearErrors()
                      reset()
                      setModalOpen(false)
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
                            {...register("price", {
                              valueAsNumber: true,
                            })}
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
                  <button
                    onClick={() => {
                      clearErrors()
                      reset()
                      setModalOpen(false)
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
                  ) : !isDirty ? (
                    <div className="text-md flex items-center justify-center rounded-rounded bg-primaryLight px-2 py-1 text-center font-semibold text-gray-300">
                      Submit
                    </div>
                  ) : (
                    <motion.input
                      initial={{ scale: 1 }}
                      whileTap={{ scale: 0.85 }}
                      transition={{ delay: 0, duration: 0.2 }}
                      type="submit"
                      value="Submit"
                      // disabled={!isDirty || isSubmitting}
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

export default EditProductModal
