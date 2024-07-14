import React from "react"
import { motion } from "framer-motion"

function UserAuthForm({ register, errors }) {
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
            id="emailSignUp"
            {...register("email")}
            type="email"
            autoComplete="off"
            placeholder="Email Address"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="emailSignUp" className="float-label bg-white">
            Email Address
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.email ? (
            errors.email?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="passwordSignUp"
            {...register("password")}
            type="password"
            autoComplete="off"
            placeholder="Password"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="passwordSignUp" className="float-label bg-white">
            Password
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.password ? (
            errors.password?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div>
        <div className="relative flex w-full flex-col flex-nowrap">
          <input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="password"
            autoComplete="off"
            placeholder="Confirm Password"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="confirmPassword" className="float-label bg-white">
            Confirm Password
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.confirmPassword ? (
            errors.confirmPassword?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div className="relative flex w-full items-center justify-center">
        <hr className="my-3 w-full border bg-gray-300" />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 font-medium text-gray-400">
          OR
        </span>
      </div>

      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.85 }}
        transition={{ delay: 0 }}
        type="button"
        className="rounded-rounded border py-2 font-semibold"
      >
        Sign Up with OTP
      </motion.button>
      <motion.button
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.85 }}
        transition={{ delay: 0 }}
        type="button"
        className="rounded-rounded border py-2 font-semibold"
      >
        Sign Up with Google
      </motion.button>
    </motion.div>
  )
}

export default UserAuthForm
