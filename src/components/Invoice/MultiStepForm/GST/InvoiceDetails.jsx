import { motion } from "framer-motion"
import { useEffect } from "react"

const InvoiceDetails = ({
  register,
  errors,
  setValue,
  setFocus,
  invoiceState,
  setInvoiceState,
}) => {
  useEffect(() => {
    sessionStorage.getItem("invoiceNumber") &&
      setValue("invoiceNumber", sessionStorage.getItem("invoiceNumber"), {
        shouldTouch: true,
      })
    sessionStorage.getItem("date") &&
      setValue("date", sessionStorage.getItem("date"), { shouldTouch: true })
  }, [])

  useEffect(() => {
    setFocus("invoiceNumber")
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <div className="flex w-full flex-col gap-y-4">
          <div>
            <div className="relative flex w-full flex-col flex-nowrap">
              <input
                autoComplete="off"
                {...register("invoiceNumber", {
                  required: "Invoice Number is required",
                  onBlur: (e) => {
                    sessionStorage.setItem("invoiceNumber", e.target.value)
                    setInvoiceState({
                      ...invoiceState,
                      invoiceNumber: e.target.value,
                    })
                  },
                })}
                type="text"
                id="invoiceNo"
                placeholder="Invoice Number"
                className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
              />
              <label htmlFor="invoiceNo" className="float-label">
                Invoice Number<span className="text-red-500">&#42;</span>
              </label>
            </div>
            <p className="mt-1 text-sm text-red-500">
              {errors.invoiceNumber ? (
                errors.invoiceNumber?.message
              ) : (
                <span className="select-none">&nbsp;</span>
              )}
            </p>
          </div>

          <div>
            <div className="relative flex w-full flex-col flex-nowrap">
              <input
                autoComplete="off"
                {...register("date", {
                  required: "Please select invoice issue date",
                  onBlur: (e) => {
                    e.target.type = "text"
                    sessionStorage.setItem("date", e.target.value)
                    // console.log({
                    //   day: new Date(e.target.value).getDate(),
                    //   month: new Date(e.target.value).getMonth(),
                    //   year: new Date(e.target.value).getFullYear(),
                    // })

                    setInvoiceState({
                      ...invoiceState,
                      invoiceDate: {
                        day: new Date(e.target.value).getDate(),
                        month: new Date(e.target.value).getMonth(),
                        year: new Date(e.target.value).getFullYear(),
                      },
                    })
                  },
                })}
                type="text"
                onFocus={(e) => {
                  e.target.type = "date"
                }}
                id="invoiceDate"
                placeholder="Invoice Date"
                className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
              />
              <label htmlFor="invoiceDate" className="float-label">
                Invoice Date<span className="text-red-500">&#42;</span>
              </label>
            </div>
            <p className="mt-1 text-sm text-red-500">
              {errors.date ? (
                errors.date?.message
              ) : (
                <span className="select-none">&nbsp;</span>
              )}
            </p>
          </div>

          <div>
            <div className="relative flex w-full flex-col flex-nowrap">
              <input
                autoComplete="off"
                {...register("purchaseOrder", {
                  onBlur: (e) => {
                    sessionStorage.setItem("purchaseOrder", e.target.value)
                    setInvoiceState({
                      ...invoiceState,
                      purchaseOrder: e.target.value,
                    })
                  },
                })}
                type="text"
                id="purchaseOrderNumber"
                placeholder="Purchase Order Number"
                className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
              />
              <label htmlFor="purchaseOrderNumber" className="float-label">
                Purchase Order Number
              </label>
            </div>
            <p className="mt-1 text-sm text-red-500">
              {errors.purchaseOrder ? (
                errors.purchaseOrder?.message
              ) : (
                <span className="select-none">&nbsp;</span>
              )}
            </p>
          </div>

          <div>
            <div className="relative flex w-full flex-col flex-nowrap">
              <input
                autoComplete="off"
                {...register("purchaseOrderDate", {
                  onBlur: (e) => {
                    e.target.type = "text"
                    sessionStorage.setItem("purchaseOrderDate", e.target.value)
                    setInvoiceState({
                      ...invoiceState,
                      purchaseOrderDate: e.target.value,
                    })
                  },
                })}
                type="text"
                onFocus={(e) => {
                  e.target.type = "date"
                }}
                id="purchaseOrderDate"
                placeholder="Purchase Order Date"
                className="border-placeholderText peer rounded-rounded border bg-background p-3 text-lg text-foreground transition-colors duration-150 placeholder:text-transparent focus:border-foreground focus:outline-none"
              />
              <label htmlFor="purchaseOrderDate" className="float-label">
                Purchase Order Date
              </label>
            </div>
            <p className="mt-1 text-sm text-red-500">
              {errors.purchaseOrderDate ? (
                errors.purchaseOrderDate?.message
              ) : (
                <span className="select-none">&nbsp;</span>
              )}
            </p>
          </div>
          {/* Form ends here */}
        </div>
      </motion.div>
    </>
  )
}

export default InvoiceDetails
