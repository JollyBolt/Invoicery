import React from "react"
import { motion } from "framer-motion"

function OrgAddressForm({ register, errors }) {
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
            id="streetAddressSignUp"
            {...register("streetAddress")}
            type="text"
            autoComplete="off"
            placeholder="Street Address"
            className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
          />
          <label htmlFor="streetAddressSignUp" className="float-label bg-white">
            Street Address
            <span className="text-red-500">&#42;</span>
          </label>
        </div>
        <p className="text-xs text-red-500">
          {errors.streetAddress ? (
            errors.streetAddress?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>

      <div className="flex w-full flex-nowrap justify-between">
        <div>
          <div className="relative flex w-full flex-col flex-nowrap">
            <input
              id="citySignUp"
              {...register("city")}
              type="text"
              placeholder="City"
              autoComplete="off"
              className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
            />
            <label htmlFor="citySignUp" className="float-label bg-white">
              City
              <span className="text-red-500">&#42;</span>
            </label>
          </div>
          <p className="text-xs text-red-500">
            {errors.city ? (
              errors.city?.message
            ) : (
              <span className="select-none">&nbsp;</span>
            )}
          </p>
        </div>

        <div>
          <div className="relative flex w-full flex-col flex-nowrap">
            <input
              id="zipSignUp"
              {...register("zip")}
              type="text"
              autoComplete="off"
              placeholder="ZIP Code"
              className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
            />
            <label htmlFor="zipSignUp" className="float-label bg-white">
              ZIP Code
              <span className="text-red-500">&#42;</span>
            </label>
          </div>
          <p className="text-xs text-red-500">
            {errors.zip ? (
              errors.zip?.message
            ) : (
              <span className="select-none">&nbsp;</span>
            )}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-nowrap justify-between">
        <div>
          <div className="relative flex w-full flex-col flex-nowrap">
            <input
              id="stateSignUp"
              {...register("state")}
              type="text"
              autoComplete="off"
              placeholder="State"
              className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none"
            />
            <label htmlFor="stateSignUp" className="float-label bg-white">
              State
              <span className="text-red-500">&#42;</span>
            </label>
          </div>
          <p className="text-xs text-red-500">
            {errors.state ? (
              errors.state?.message
            ) : (
              <span className="select-none">&nbsp;</span>
            )}
          </p>
        </div>

        <div>
          <div className="relative flex w-full flex-col flex-nowrap">
            <input
              id="countrySignUp"
              {...register("country")}
              type="text"
              autoComplete="off"
              placeholder="Country"
              className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-black focus:outline-none "
            />
            <label htmlFor="countrySignUp" className="float-label bg-white">
              Country
              <span className="text-red-500">&#42;</span>
            </label>
          </div>
          <p className="text-xs text-red-500">
            {errors.country ? (
              errors.country?.message
            ) : (
              <span className="select-none">&nbsp;</span>
            )}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default OrgAddressForm
