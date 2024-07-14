import { motion } from "framer-motion"

const PersonalInfoForm = ({ register, errors }) => {
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
            id="firstName"
            {...register("firstName")}
            type="text"
            placeholder="First Name"
            autoComplete="off"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="firstName" className="float-label bg-white">
            First Name
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.firstName ? (
            errors.firstName?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="lastName"
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
            autoComplete="off"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="lastName" className="float-label bg-white">
            Last Name
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.lastName ? (
            errors.lastName?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="phoneSignUp"
            {...register("phone")}
            type="text"
            autoComplete="off"
            placeholder="Phone Number"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="phoneSignUp" className="float-label bg-white">
            Phone Number
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.phone ? (
            errors.phone?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
    </motion.div>
  )
}

export default PersonalInfoForm
