import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { MdEdit, MdDelete, FaCheck } from "../../../../assets/index"

const TermsNConditions = ({
  register,
  tNc,
  invoiceState,
  setInvoiceState,
  watch,
}) => {
  const { fields, append, remove } = tNc
  const [disableAdd, setDisableAdd] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [add, setAdd] = useState(false)
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <button
          disabled={disableAdd}
          onClick={() => {
            append({ tnc: "" })
            setInvoiceState((prev) => {
              return {
                ...prev,
                termsNConditions: prev.termsNConditions.concat([""]),
              }
            })
            setAdd(true)
          }}
          type="button"
          className="text-md mb-4 w-full rounded-rounded bg-primary p-1 text-white disabled:bg-primaryLight disabled:text-disabledText"
        >
          <span className="text-lg font-semibold">+</span> Add Field
        </button>

        <div className="mb-5 mt-2 flex flex-col gap-y-4">
          {fields.map((field, ind) => {
            //RHF recommends using field.id as key instead of ind
            return (
              <div key={field.id}>
                <Input
                  remove={remove}
                  ind={ind}
                  register={register}
                  invoiceState={invoiceState}
                  setInvoiceState={setInvoiceState}
                  add={add}
                  watch={watch}
                  setDisableAdd={setDisableAdd}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              </div>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}

export default TermsNConditions

const Input = ({
  remove,
  ind,
  register,
  invoiceState,
  setInvoiceState,
  add,
  watch,
  setDisableAdd,
  isEditing,
  setIsEditing,
}) => {
  const [save, setSave] = useState(add ? false : true)

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
    sessionStorage.getItem("termsNConditions") &&
      sessionStorage.setItem(
        "termsNConditions",
        JSON.stringify(
          invoiceState.termsNConditions.filter((tnc, i) => i !== ind),
        ),
      )
  }
  const handleEdit = (ind) => {
    let newTnc = invoiceState.termsNConditions.map((tnc, i) => {
      if (i === ind) {
        return ""
      } else {
        return tnc
      }
    })
    setInvoiceState((prev) => {
      return { ...prev, termsNConditions: newTnc }
    })

    sessionStorage.setItem(
      "termsNConditions",
      JSON.stringify(
        invoiceState.termsNConditions.filter((tnc, i) => i !== ind),
      ),
    )
    setSave(false)
  }

  useEffect(() => {
    JSON.parse(sessionStorage.getItem("termsNConditions")).length !==
    invoiceState.termsNConditions.length
      ? setDisableAdd(true)
      : setDisableAdd(false)
  }, [invoiceState.termsNConditions])

  return (
    <div className="flex w-full flex-nowrap justify-between gap-x-2">
      <div className="relative flex w-10/12 flex-col overflow-visible">
        {save ? (
          <p className="text-foreground">
            {watch(`termsNConditions[${ind}].tnc`)}
          </p>
        ) : (
          <textarea
            rows={4}
            className="border-1 peer w-full rounded-rounded border border-placeholderText bg-background px-2 py-2 text-sm text-foreground transition-colors duration-500 placeholder:text-placeholderText focus:border-foreground focus:outline-none"
            type="text"
            placeholder="Terms and Conditions"
            {...register(`termsNConditions[${ind}].tnc`)}
          />
        )}
      </div>

      {save ? (
        <button
          className="flex w-fit flex-nowrap justify-center px-4 py-2 text-xl text-slate-400 transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:hover:text-slate-400"
          type="button"
          disabled={isEditing}
          onClick={() => {
            setIsEditing(true)
            setSave(false)
            handleEdit(ind)
          }}
        >
          <MdEdit />
        </button>
      ) : (
        <button
          className="flex w-fit flex-nowrap justify-center px-4 py-2 text-xl text-slate-400 transition-colors hover:text-foreground"
          type="button"
          disabled={watch(`termsNConditions[${ind}].tnc`) === ""}
          onClick={() => {
            setIsEditing(false)
            let newTnc = invoiceState.termsNConditions.map((tnc, i) => {
              if (i === ind) {
                return watch(`termsNConditions[${ind}].tnc`)
              } else {
                return tnc
              }
            })
            console.log(newTnc)
            setInvoiceState((prev) => {
              return {
                ...prev,
                termsNConditions: prev.termsNConditions.map((tnc, i) => {
                  if (i === ind) {
                    return watch(`termsNConditions[${ind}].tnc`)
                  } else {
                    return tnc
                  }
                }),
              }
            })
            setSave(true)
            sessionStorage.setItem("termsNConditions", JSON.stringify(newTnc))
          }}
        >
          <FaCheck />
        </button>
      )}
      <button
        className="flex w-fit flex-nowrap justify-center px-4 py-2 text-xl text-slate-400 transition-colors hover:text-foreground"
        type="button"
        onClick={() => {
          remove(ind)
          handleDelete(ind)
        }}
      >
        <MdDelete />
      </button>
    </div>
  )
}
