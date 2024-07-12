import { motion } from "framer-motion"

const OrgInfoForm = ({ register, errors }) => {
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
            id="orgName"
            {...register("orgName")}
            type="text"
            placeholder="Organization Name"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="orgName" className="float-label">
            Organization Name
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.orgName ? (
            errors.orgName?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="orgEmail"
            {...register("orgEmail")}
            type="email"
            placeholder="Organization Email Address"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="orgEmail" className="float-label">
          Organization Email Address
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.orgEmail ? (
            errors.orgEmail?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="gstin"
            {...register("gstin")}
            type="text"
            placeholder="GSTIN"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="gstin" className="float-label">
            GSTIN
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.gstin ? (
            errors.gstin?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

         
    </motion.div>
  )
}

export default OrgInfoForm
