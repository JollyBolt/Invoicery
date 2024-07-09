import { motion } from "framer-motion"
import { useEffect } from "react"

const TermsNConditions = ({ register, tNc, invoiceState, setInvoiceState }) => {
  const { fields, append, remove } = tNc
  useEffect(() => {
    sessionStorage.setItem(
      "termsNConditions",
      JSON.stringify(invoiceState.termsNConditions),
    )
  }, [invoiceState.termsNConditions])
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="mb-5 mt-2 flex flex-col gap-y-4">
          {fields.map((field, ind) => {
            //RHF recommends using field.id as key instead of ind
            return (
              <div
                className="flex w-full flex-nowrap justify-between gap-x-2"
                key={field.id}
              >
                <div className="relative flex w-4/5 flex-col overflow-visible">
                  <input
                    className="peer w-full rounded-md border px-3 py-2 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                    type="text"
                    placeholder="Terms and Conditions"
                    {...register(`termsNConditions[${ind}].tnc`, {
                      onBlur: (e) => {
                        setInvoiceState({
                          ...invoiceState,
                          termsNConditions: invoiceState.termsNConditions.map(
                            (tnc, i) => {
                              if (i === ind) {
                                return e.target.value
                              } else {
                                return tnc
                              }
                            },
                          ),
                        })
                      },
                    })}
                  />
                </div>

                {ind > 0 ? ( //can't remove all fields, atleast one field has to be added
                  <button
                    className="flex w-fit flex-nowrap items-center justify-center rounded-full p-2 text-xl text-white transition-colors hover:bg-neutral-200"
                    type="button"
                    onClick={() => {
                      remove(ind)
                      setInvoiceState({
                        ...invoiceState,
                        termsNConditions: invoiceState.termsNConditions.filter(
                          (tnc, i) => {
                            return i !== ind && true
                          },
                        ),
                      })
                    }}
                  >
                    <span className="bg-transparent px-2 text-xl font-light text-red-500">
                      X
                    </span>
                  </button>
                ) : (
                  <button
                    disabled={true}
                    className="flex w-fit select-none flex-nowrap items-center justify-center rounded-full p-2 text-xl text-white"
                    type="button"
                    // onClick={() => {
                    //   remove(ind)

                    //   // console.log(invoiceState.termsNConditions)
                    // }}
                  >
                    <span className="bg-transparent px-2 text-xl font-light text-white">
                      x
                    </span>
                  </button>
                )}
              </div>
            )
          })}
        </div>

        <button
          onClick={() => {
            append({ tnc: "" })
            setInvoiceState({
              ...invoiceState,
              termsNConditions: invoiceState.termsNConditions.concat([
                // { tnc: "" },
                "",
              ]),
            })
          }}
          type="button"
          className="text-md float-right mb-4 rounded-rounded p-1 text-primary outline outline-1 outline-primary hover:bg-primary hover:text-white"
        >
          <span className="text-lg font-semibold">+</span> Add Field
        </button>
      </motion.div>
    </>
  )
}

export default TermsNConditions
