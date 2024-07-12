import { motion } from "framer-motion"

const BankingInfoForm = ({ register, errors }) => {
  return (
    <motion.div
      className="mb-2 flex w-full flex-col gap-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="bankName"
            {...register("bankName")}
            type="text"
            placeholder="Bank Name"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="bankName" className="float-label">
            Bank Name
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.bankName ? (
            errors.bankName?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="branch"
            {...register("branch")}
            type="text"
            placeholder="Bank Branch"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="branch" className="float-label">
            Bank Branch
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.branch ? (
            errors.branch?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="accountNumber"
            {...register("accountNumber")}
            type="text"
            placeholder="Account Number"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="accountNumber" className="float-label">
            Account Number
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.accountNumber ? (
            errors.accountNumber?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="ifsc"
            {...register("ifsc")}
            type="text"
            placeholder="IFSC Code"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="ifsc" className="float-label">
            IFSC Code
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.ifsc ? (
            errors.ifsc?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
    </motion.div>
  )
}

export default BankingInfoForm
