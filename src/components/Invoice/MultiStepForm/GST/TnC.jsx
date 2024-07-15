import { motion } from "framer-motion"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const TermsNConditions = ({ register, tNc, invoiceState, setInvoiceState }) => {
  const { fields, append, remove } = tNc

  useEffect(() => {
    if (invoiceState.termsNConditions.length > 0) {
      sessionStorage.setItem(
        "termsNConditions",
        JSON.stringify(invoiceState.termsNConditions),
      )
    }
  }, [invoiceState.termsNConditions])

  /**
   * Handles the deletion of a specific term and condition from the list.
   * If the list contains only one term and condition, it removes the item from session storage.
   * Updates the invoice state by removing the selected term and condition.
   *
   * @param {number} ind - The index of the term and condition to be deleted.
   * @returns {void}
   */
  const handleDelete = (ind) => {
    if (invoiceState.termsNConditions.length === 1) {
      sessionStorage.removeItem("termsNConditions")
    }
    setInvoiceState((prevState) => {
      return {
        ...prevState,
        termsNConditions: prevState.termsNConditions.filter(
          (tnc, i) => i !== ind,
        ),
      }
    })
  }

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
                <div className="relative flex w-10/12 flex-col overflow-visible">
                  <textarea
                    rows={1}
                    className="border-1 border-placeholderText placeholder:text-placeholderText peer w-full rounded-rounded border bg-background px-2 py-2 text-lg text-foreground transition-colors duration-500 focus:border-foreground focus:outline-none"
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
