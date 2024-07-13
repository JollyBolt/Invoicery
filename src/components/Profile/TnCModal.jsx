import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useFieldArray, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { editProfile } from "../../redux/slices/userSlice"

function TnCModal({ isOpen, setIsOpen }) {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.user)
  const form = useForm({
    defaultValues: {
      termsNConditions: [],
    },
  })
  const { control, handleSubmit } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "TnC",
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleEdit)(e)
  }
  const handleEdit = (termsNConditions) => {
    dispatch(editProfile({ id: user._id, body: { ...user, termsNConditions } }))
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ ease: "easeOut", delay: 0 }}
              className="flex w-[500px] flex-col rounded-rounded bg-white p-10"
            ></motion.div>
            <h2 className="text-2xl font-semibold">Terms and Conditions</h2>
            <form>
              <div className="mb-5 mt-2 flex flex-col gap-y-4">
                {fields.map((field, ind) => {
                  //RHF recommends using field.id as key instead of ind
                  return (
                    <div
                      className="flex w-full flex-nowrap justify-between gap-x-2"
                      key={field.id}
                    >
                      <div className="relative flex w-10/12 flex-col overflow-visible">
                        <textarea
                          rows={1}
                          className="peer w-full rounded-md border px-3 py-2 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                          type="text"
                          placeholder="Terms and Conditions"
                          {...register(`termsNConditions[${ind}]`, {})}
                        />
                      </div>

                      {/* {ind > 0 ? ( //can't remove all fields, atleast one field has to be added */}
                      <button
                        className="flex w-fit flex-nowrap justify-center text-white"
                        type="button"
                        onClick={() => {
                          remove(ind)
                          handleDelete(ind)
                        }}
                      >
                        <span className="rounded-full bg-transparent px-4 py-2 text-xl font-light text-red-500 transition-colors hover:bg-neutral-200">
                          X
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>

              <button
                onClick={() => {
                  append("")
                }}
                type="button"
                className="text-md float-right mb-4 rounded-rounded p-1 text-primary outline outline-1 outline-primary hover:bg-primary hover:text-white"
              >
                <span className="text-lg font-semibold">+</span> Add Field
              </button>

              {loading ? (
                <div className="flex w-full justify-center rounded-rounded bg-primary text-center">
                  <img src="/src/assets/Loading2.gif" className="w-11" />
                </div>
              ) : (
                <motion.input
                  initial={{ scale: 1 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ delay: 0 }}
                  type="submit"
                  value="Submit"
                  className="w-full rounded-rounded bg-primary py-2 text-lg font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight"
                />
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TnCModal
