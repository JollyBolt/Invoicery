import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useFieldArray, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { editProfile } from "../../redux/slices/userSlice"
import { Loader2 } from "../../assets"

function TnCModal({ editOpen, setEditOpen, user }) {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.user)
  const form = useForm({
    defaultValues: {
      TnC: user.termsNConditions
        ? user.termsNConditions.map((tnc) => {
            return { tnc }
          })
        : [],
    },
  })
  const { control, handleSubmit, watch, register, reset } = form

  const { fields, append, remove } = useFieldArray({
    name: "TnC",
    control,
  })

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleEdit)(e)
    setEditOpen(false)
    reset()
  }
  const handleEdit = ({ TnC }) => {
    // console.log(
    //   TnC.filter((obj) => {
    //     if (!!obj.tnc) {
    //       console.log(obj.tnc)
    //       return true
    //     }
    //   }).map((obj) => obj.tnc),
    // )
    dispatch(
      editProfile({
        ...user,
        termsNConditions: TnC.filter((obj) => {
          if (!!obj.tnc) {
            return true
          }
        }).map((obj) => obj.tnc),
      }),
    )
  }

  return (
    <>
      <AnimatePresence>
        {editOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex h-screen w-full items-center justify-center bg-foreground/50 backdrop-blur-sm"
          >
            <button
              type="button"
              className="absolute right-10 top-10 text-xl text-white"
              onClick={() => setEditOpen(false)}
            >
              X
            </button>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ ease: "easeOut", delay: 0 }}
              className="flex w-2/5 flex-col rounded-rounded bg-background p-10"
            >
              <h2 className="text-center text-3xl font-semibold text-foreground">
                Terms and Conditions
              </h2>
              <form className="mt-4 flex flex-col" onSubmit={onSubmit}>
                <button
                  onClick={() => {
                    append({ tnc: "" })
                    // append("")
                  }}
                  type="button"
                  className="text-md float-right mx-auto mb-4 w-2/3 rounded-rounded p-1 py-2 text-primary outline outline-1 outline-primary hover:bg-primary hover:text-white"
                >
                  <span className="text-lg font-semibold">+</span> Add Field
                </button>
                <div className="mb-5 mt-2 flex h-[200px] flex-col gap-y-4 overflow-scroll">
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
                            className="border-1 border-placeholderText placeholder:text-placeholderText peer w-full rounded-rounded border bg-background px-2 py-2 text-lg text-foreground transition-colors duration-500 focus:border-foreground focus:outline-none"
                            type="text"
                            autoComplete="off"
                            placeholder="Terms and Conditions"
                            {...register(`TnC[${ind}].tnc`, {
                              onBlur: () => {
                                console.log(watch(`TnC`))
                              },
                            })}
                          />
                        </div>

                        {/* {ind > 0 ? ( //can't remove all fields, atleast one field has to be added */}
                        <button
                          className="flex w-fit flex-nowrap justify-center text-white"
                          type="button"
                          onClick={() => {
                            remove(ind)
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

                {loading ? (
                  <div className="flex w-full justify-center rounded-rounded bg-primary text-center">
                    <img src={Loader2} className="w-11" />
                  </div>
                ) : (
                  <motion.input
                    initial={{ scale: 1 }}
                    whileTap={fields.length && { scale: 0.97 }}
                    transition={{ delay: 0 }}
                    disabled={!fields.length}
                    type="submit"
                    value="Submit"
                    className="w-full rounded-rounded bg-primary py-2 text-lg font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight disabled:text-gray-300 disabled:hover:cursor-default"
                  />
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default TnCModal
