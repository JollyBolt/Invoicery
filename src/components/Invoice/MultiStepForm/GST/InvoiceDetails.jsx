import { motion } from "framer-motion"

const InvoiceDetails = ({ register, errors, watch }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full"
      >
        <div className="flex w-full flex-col gap-y-10">
          <div>
            <div className="relative flex w-full flex-col flex-nowrap">
              <input
                {...register("invoiceNumber", {
                  required: "Invoice Number is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invoice Number must be a number",
                  },
                })}
                type="text"
                id="invoiceNo"
                placeholder="Invoice Number"
                className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
              />
              <label htmlFor="invoiceNo" className="float-label">
                Invoice Number
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
                {...register("date", {
                  required: "Please select a date",
                  onBlur: (e) => (e.target.type = "text"),
                })}
                type="text"
                onFocus={(e) => {
                  e.target.type = "date"
                }}
                id="invoiceDate"
                placeholder="Date"
                className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
              />
              <label htmlFor="invoiceDate" className="float-label">
                Invoice Date
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
        </div>
      </motion.div>
    </>
  )
}

export default InvoiceDetails