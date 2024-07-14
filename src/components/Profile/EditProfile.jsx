import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { editProfile } from "../../redux/slices/userSlice"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

function EditProfile({ open, setOpen }) {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const editProfileSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email format is not valid"),
    phone: yup
      .string()
      .required("Contact number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Please enter valid contact number")
      .max(10, "Please enter valid contact number"),
    orgName: yup.string().required("Organization name is required"),
    orgEmail: yup
      .string()
      .required("Organization email is required")
      .email("Email format is not valid"),
    streetAddress: yup
      .string()
      .required("Organization street address is required"),
    city: yup.string().required("Organization city is required"),
    state: yup.string().required("Organization state is required"),
    zip: yup
      .string()
      .required("Organization ZIP code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    gstin: yup
      .string()
      .required("Organization gstin is required")
      .min(15, "Please enter valid 15 digit GSTIN")
      .max(15, "Please enter valid 15 digit GSTIN"),
    bankName: yup.string().required("Organization bank name is required"),
    branch: yup.string().required("Organization bank branch is required"),
    accountNumber: yup
      .string()
      .required("Organization account number is required"),
    ifsc: yup
      .string()
      .required("Organization ifsc code is required")
      .min(11, "Please enter valid 11 digit IFSC code")
      .max(11, "Please enter valid 11 digit IFSC code"),
  })

  const form = useForm({
    defaultValues: {
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ")[1],
      phone: user.phone,
      email: "",

      orgName: user.org.name,
      orgEmail: user.org.email,
      streetAddress: user.org.address.streetAddress,
      city: user.org.address.city,
      state: user.org.address.state,
      zip: user.org.address.zip,
      gstin: user.org.gstin,

      bankName: user.banking.bankName,
      branch: user.banking.branch,
      accountNumber: user.banking.accountNumber,
      ifsc: user.banking.ifsc,
    },
    mode: "onBlur",
    resolver: yupResolver(editProfileSchema),
  })
  const { register, handleSubmit, formState, reset, clearErrors } = form
  const { errors, isDirty } = formState

  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleEdit)(e)
  }
  const handleEdit = ({
    firstName,
    lastName,
    phone,
    email,

    orgEmail,
    orgName,
    streetAddress,
    state,
    city,
    zip,
    gstin,

    ifsc,
    branch,
    bankName,
    accountNumber,
  }) => {
    console.log("object")
    dispatch(
      editProfile({
        name: firstName + " " + lastName,
        email,
        phone,
        org: {
          name: orgName,
          email: orgEmail,
          address: {
            streetAddress,
            city,
            state,
            zip,
          },
          gstin,
        },
        banking: {
          bankName,
          branch,
          accountNumber,
          ifsc,
        },
      }),
    )
  }
  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="bg-foreground/50 absolute inset-0 z-[100] flex h-screen w-full items-center justify-center backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-background w-2/3 rounded-rounded"
            >
              <form
                noValidate
                onSubmit={onSubmit}
                className="flex w-full flex-col px-10 py-4"
              >
                <div className="flex w-full justify-between gap-x-7">
                  <div className="flex w-1/2 flex-col gap-y-4">
                    {/* User Details */}
                    <h1 className="text-3xl font-semibold text-foreground">User Details</h1>
                    <div className="flex w-full flex-nowrap justify-between gap-x-4">
                      <div className="w-1/2">
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("firstName")}
                            type="text"
                            id="editFirstName"
                            placeholder="First Name"
                            className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                          <label
                            htmlFor="editFirstName"
                            className="float-label"
                          >
                            First Name
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.firstName ? (
                            errors.firstName.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>

                      <div className="w-1/2">
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("lastName")}
                            type="text"
                            id="editLastName"
                            placeholder="Last Name"
                            className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                          <label htmlFor="editLastName" className="float-label">
                            Last Name
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.lastName ? (
                            errors.lastName.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("phone")}
                          type="text"
                          id="editPhone"
                          placeholder="Contact Number"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editPhone" className="float-label">
                          Contact Number
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.phone ? (
                          errors.phone.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>

                    <div className="w-full">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("email")}
                          type="text"
                          id="editEmail"
                          placeholder="Email Address"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editEmail" className="float-label">
                          Email Address
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.email ? (
                          errors.email.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-1/2 flex-col gap-y-4">
                    {/* Banking Details */}
                    <h1 className="text-3xl font-semibold text-foreground">Banking Details</h1>

                    <div className="flex w-full flex-nowrap gap-x-4">
                      <div className="w-1/2">
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("bankName")}
                            type="text"
                            id="editBankName"
                            placeholder="Bank Name"
                            className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                          <label htmlFor="editBankName" className="float-label">
                            Bank Name
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.bankName ? (
                            errors.bankName.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>

                      <div className="w-1/2">
                        <div className="relative flex w-full flex-col flex-nowrap">
                          <input
                            {...register("branch")}
                            type="text"
                            id="editBankBranch"
                            placeholder="Bank Branch"
                            className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                          <label
                            htmlFor="editBankBranch"
                            className="float-label"
                          >
                            Bank Branch
                            <span className="text-red-500">&#42;</span>
                          </label>
                        </div>
                        <p className="text-xs text-red-500">
                          {errors.branch ? (
                            errors.branch.message
                          ) : (
                            <span className="select-none">&nbsp;</span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("accountNumber")}
                          type="text"
                          id="editAccountNumber"
                          placeholder="Account Number"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label
                          htmlFor="editAccountNumber"
                          className="float-label"
                        >
                          Account Number
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.accountNumber ? (
                          errors.accountNumber.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>

                    <div className="w-full">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("ifsc")}
                          type="text"
                          id="editIfsc"
                          autoComplete="off"
                          placeholder="IFSC Code"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editIfsc" className="float-label">
                          IFSC Code
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.ifsc ? (
                          errors.ifsc.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>

                    {/* fvonov */}
                  </div>
                </div>

                {/* Org details */}
                <div className="flex w-full flex-col gap-y-4">
                <h1 className="text-3xl font-semibold text-foreground">
                      Organization Details
                    </h1>

                  <div className="flex w-full flex-nowrap gap-x-7">
                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("orgName")}
                          type="text"
                          id="editOrgName"
                          placeholder="Organization Name"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editOrgName" className="float-label">
                          Organization Name{" "}
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.orgName ? (
                          errors.orgName.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>

                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("orgEmail")}
                          type="text"
                          id="editOrgEmail"
                          placeholder="Organization Email Address"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editOrgEmail" className="float-label">
                          Organization Email Address
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.orgEmail ? (
                          errors.orgEmail.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                    <div className="relative flex w-full flex-col flex-nowrap">
                      <input
                        {...register("streetAddress")}
                        type="text"
                        id="editstreetAddress"
                        placeholder="Street Address"
                        className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                      <label
                        htmlFor="editStreetAddress"
                        className="float-label"
                      >
                        Street Address
                        <span className="text-red-500">&#42;</span>
                      </label>
                    </div>
                    <p className="text-xs text-red-500">
                      {errors.streetAddress ? (
                        errors.streetAddress.message
                      ) : (
                        <span className="select-none">&nbsp;</span>
                      )}
                    </p>
                  </div>

                  <div className="flex w-full flex-nowrap gap-x-7">
                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("city")}
                          type="text"
                          id="editCity"
                          placeholder="City"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editCity" className="float-label">
                          City
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.city ? (
                          errors.city.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>

                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("state")}
                          type="text"
                          id="editState"
                          placeholder="State"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editState" className="float-label">
                          State
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.state ? (
                          errors.state.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="flex w-full flex-nowrap gap-x-7">
                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("zip")}
                          type="text"
                          id="editZip"
                          placeholder="ZIP Code"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editZip" className="float-label">
                          ZIP Code
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.zip ? (
                          errors.zip.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>

                    <div className="w-1/2">
                      <div className="relative flex w-full flex-col flex-nowrap">
                        <input
                          {...register("gstin")}
                          type="text"
                          id="editGstin"
                          placeholder="GSTIN Number"
                          className="peer rounded-rounded border border-placeholderText p-3 text-lg transition-colors duration-150 placeholder:text-transparent focus:border-foreground bg-background focus:outline-none text-foreground" />
                        <label htmlFor="editGstin" className="float-label">
                          GSTIN Number
                          <span className="text-red-500">&#42;</span>
                        </label>
                      </div>
                      <p className="text-xs text-red-500">
                        {errors.gstin ? (
                          errors.gstin.message
                        ) : (
                          <span className="select-none">&nbsp;</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-1/4 flex-nowrap justify-end gap-x-4 self-end">
                    <button
                      onClick={() => {
                        clearErrors()
                        reset()
                        setOpen(false)
                      }}
                      type="button"
                      className="rounded-rounded px-2 py-1 text-lg text-foreground transition-colors duration-200 hover:bg-secondaryBtnHover "
                    >
                      Cancel
                    </button>
                    <motion.input
                      initial={{ sclae: 1 }}
                      whileTap={isDirty && { scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      type="submit"
                      disabled={!isDirty}
                      value="Submit"
                      className="rounded-rounded bg-primary px-2 py-1 text-lg font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight disabled:bg-primaryLight disabled:text-disabledText disabled:hover:cursor-default"
                    />
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EditProfile
