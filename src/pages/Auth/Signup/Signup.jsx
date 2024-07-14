import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useDispatch, useSelector } from "react-redux"
import { signup } from "../../../redux/slices/authSlice"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { HiArrowLongLeft } from "../../../assets/index"
import { authSlice } from "../../../redux/slices/authSlice"
import PersonalInfoForm from "./PersonalInfoForm"
import OrgInfoForm from "./OrgInfoForm"
import BankingInfoForm from "./BankingInfoForm"
import UserAuthForm from "./UserAuthForm"
import OrgAddressForm from "./OrgAddressForm"

function Signup() {
  const signupSchema = yup.object({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email format is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    phone: yup
      .string()
      .required("Contact is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Please enter valid contact number")
      .max(10, "Please enter valid contact number"),

    orgName: yup.string().required("Organization Name is required"),
    orgEmail: yup
      .string()
      .required("Organization Email is required")
      .email("Email format is not valid"),
    gstin: yup
      .string()
      .required("GSTIN is required")
      .min(15, "Please enter valid 15 digit GSTIN")
      .max(15, "Please enter valid 15 digit GSTIN")
      .matches(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
        "Invalid GSTIN Format",
      ),
    streetAddress: yup.string().required("Street Address is required"),
    city: yup.string().required("City is required"),
    zip: yup
      .string()
      .required("ZIP Code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),

    bankName: yup.string().required("Bank Name is required"),
    branch: yup.string().required("Branch is required"),
    accountNumber: yup.string().required("Account Number is required"),
    ifsc: yup
      .string()
      .required("IFSC is required")
      .min(11, "Please enter valid 11 digit IFSC code")
      .max(11, "Please enter valid 11 digit IFSC code"),
  })

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",

      orgName: "",
      orgEmail: "",
      gstin: "",
      streetAddress: "",
      city: "",
      zip: "",
      state: "",
      country: "",

      bankName: "",
      branch: "",
      accountNumber: "",
      ifsc: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "all",
  })

  const { register, formState, handleSubmit, getFieldState } = form
  const { errors, isValid } = formState
  const onSubmit = async (e) => {
    e.preventDefault()
    await handleSubmit(handleSignup)(e)
  }

  const dispatch = useDispatch()
  const handleSignup = async ({
    firstName,
    lastName,
    email,
    password,
    phone,

    orgName,
    orgEmail,
    gstin,
    streetAddress,
    city,
    state,
    zip,
    country,

    bankName,
    branch,
    accountNumber,
    ifsc,
  }) => {
    await dispatch(
      signup({
        userBody: {
          name: firstName + " " + lastName,
          phone,
          org: {
            name: orgName,
            email: orgEmail,
            gstin,
            address: {
              streetAddress,
              city,
              state,
              zip,
              country,
            },
          },
          banking: {
            bankName,
            branch,
            accountNumber,
            ifsc,
          },
        },
        userAuthBody: {
          email,
          password,
          mode: "password",
        },
      }),
    )
    // if(loggedIn){
    //     console.log(loggedIn)
    //     navigate('/')
    // }
  }

  const [step, setStep] = useState(1)
  const formSwitch = () => {
    switch (step) {
      case 1:
        return <UserAuthForm register={register} errors={errors} />
      case 2:
        return <PersonalInfoForm register={register} errors={errors} />
      case 3:
        return <OrgInfoForm register={register} errors={errors} />
      case 4:
        return <OrgAddressForm register={register} errors={errors} />
      case 5:
        return <BankingInfoForm register={register} errors={errors} />
    }
  }

  const nameSwitch = () => {
    switch (step) {
      case 1:
        return (
          <h1>
            Sign
            <br />
            Up
          </h1>
        )
      case 2:
        return <h1>Personal Information</h1>
      case 3:
        return <h1>Organization Information</h1>
      case 4:
        return <h1>Organization Address</h1>
      case 5:
        return <h1>Banking Information</h1>
    }
  }

  const disableSwitch = () => {
    switch (step) {
      case 1:
        if (
          getFieldState("email", formState).error ||
          getFieldState("password", formState).error ||
          getFieldState("confirmPassword", formState).error
        ) {
          return true
        } else if (
          !getFieldState("email", formState).isDirty ||
          !getFieldState("password", formState).isDirty ||
          !getFieldState("confirmPassword", formState).isDirty
        ) {
          return true
        } else {
          return false
        }
      case 2:
        if (
          getFieldState("firstName", formState).error ||
          getFieldState("lastName", formState).error ||
          getFieldState("phone", formState).error
        ) {
          return true
        } else if (
          !getFieldState("firstName", formState).isDirty ||
          !getFieldState("lastName", formState).isDirty ||
          !getFieldState("phone", formState).isDirty
        ) {
          return true
        } else {
          return false
        }
      case 3:
        if (
          getFieldState("orgName", formState).error ||
          getFieldState("orgEmail", formState).error ||
          getFieldState("gstin", formState).error
        ) {
          return true
        } else if (
          !getFieldState("orgName", formState).isDirty ||
          !getFieldState("orgEmail", formState).isDirty ||
          !getFieldState("gstin", formState).isDirty
        ) {
          return true
        } else {
          return false
        }
      case 4:
        if (
          getFieldState("streetAddress", formState).error ||
          getFieldState("city", formState).error ||
          getFieldState("state", formState).error ||
          getFieldState("zip", formState).error ||
          getFieldState("country", formState).error
        ) {
          return true
        } else if (
          !getFieldState("streetAddress", formState).isDirty ||
          !getFieldState("city", formState).isDirty ||
          !getFieldState("state", formState).isDirty ||
          !getFieldState("zip", formState).isDirty ||
          !getFieldState("country", formState).isDirty
        ) {
          return true
        } else {
          return false
        }
    }
  }

  const { refreshAuth } = authSlice.actions
  const { loggedIn, loading } = useSelector((state) => state.auth)
  useEffect(() => {
    dispatch(refreshAuth())
  }, [])

  const navigate = useNavigate()
  return (
    <div className="flex h-screen flex-nowrap">
      <div className="flex w-1/2 flex-col items-center justify-evenly bg-black">
        {/* Left Div */}
        <motion.button
          initial={{ x: 0 }}
          whileHover={{
            x: -5,
            transition: {
              repeat: Infinity,
              duration: 0.75,
              repeatType: "reverse",
            },
          }}
          type="button"
          className="absolute left-5 top-5 rounded-full p-3 text-3xl text-white"
          onClick={() => {
            navigate("/")
          }}
        >
          <motion.div className="flex items-center gap-x-2">
            <HiArrowLongLeft />
            <span className="text-base">Go Back</span>
          </motion.div>
        </motion.button>
        <div className="flex w-2/3 flex-nowrap justify-between">
          <div
            className={`w-1/6 p-1 ${step >= 1 ? "bg-white" : "bg-gray-500"} transition-colors duration-150`}
          ></div>
          <div
            className={`w-1/6 p-1 ${step >= 2 ? "bg-white" : "bg-gray-500"} transition-colors duration-150`}
          ></div>
          <div
            className={`w-1/6 p-1 ${step >= 3 ? "bg-white" : "bg-gray-500"} transition-colors duration-150`}
          ></div>
          <div
            className={`w-1/6 p-1 ${step >= 4 ? "bg-white" : "bg-gray-500"} transition-colors duration-150`}
          ></div>
          <div
            className={`w-1/6 p-1 ${step >= 5 ? "bg-white" : "bg-gray-500"} transition-colors duration-150`}
          ></div>
        </div>
        <div className="flex h-[300px] w-2/3 flex-col gap-y-2 text-7xl font-extrabold text-white">
          {nameSwitch()}
        </div>
      </div>

      {/* Rigth Div */}
      <div className="flex w-1/2 items-center justify-center bg-white">
        <div className="flex w-3/4 flex-col items-center rounded-rounded px-7 py-5">
          <form noValidate className="flex w-full flex-col">
            {formSwitch()}
          </form>
          <div className="mt-5 flex w-full flex-nowrap justify-between">
            <button
              className="rounded-rounded px-3 text-lg font-semibold transition-colors hover:bg-neutral-400/30 disabled:text-gray-400 disabled:hover:bg-transparent"
              type="button"
              disabled={step === 1}
              onClick={() => {
                setStep(step - 1)
                // clearErrors();
              }}
            >
              Go Back
            </button>
            {step < 5 ? (
              <motion.button
                initial={{ scale: 1 }}
                whileTap={!disableSwitch() && { scale: 0.85 }}
                transition={{ delay: 0 }}
                type="button"
                disabled={disableSwitch()}
                className="text-md w-fit rounded-rounded bg-primary px-3 py-1 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight disabled:bg-primaryLight disabled:text-gray-300 disabled:hover:cursor-default"
                onClick={() => {
                  setStep(step + 1)
                  //   clearErrors();
                }}
              >
                Next
              </motion.button>
            ) : loading ? (
              <div className="flex w-20 justify-center rounded-rounded bg-primary px-3 text-center">
                <img src="/src/assets/Loading2.gif" className="w-8" />
              </div>
            ) : (
              <motion.button
                initial={{ scale: 1 }}
                whileTap={isValid && { scale: 0.85 }}
                disabled={!isValid}
                transition={{ delay: 0 }}
                className="text-md w-20 rounded-rounded bg-primary px-3 py-1 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight disabled:bg-primaryLight disabled:text-gray-300 disabled:hover:cursor-default"
                onClick={onSubmit}
              >
                Submit
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
