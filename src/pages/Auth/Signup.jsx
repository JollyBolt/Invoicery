import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../redux/slices/authSlice";
import { DevTool } from "@hookform/devtools";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HiArrowLongLeft } from "../../assets/index";
import { authSlice } from "../../redux/slices/authSlice";

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

    org: yup.string().required("Organization Name is required"),
    streetAddress: yup.string().required("Street Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    zip: yup
      .string()
      .required("ZIP Code is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(6, "Must be exactly 6 digits")
      .max(6, "Must be exactly 6 digits"),

    ifsc: yup
      .string()
      .required("IFSC is required")
      .min(11, "Please enter valid 11 digit IFSC code")
      .max(11, "Please enter valid 11 digit IFSC code"),
    gstin: yup
      .string()
      .required("GSTIN is required")
      .min(15, "Please enter valid 15 digit GSTIN")
      .max(15, "Please enter valid 15 digit GSTIN"),
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",

      org: "",
      streetAddress: "",
      city: "",
      state: "",
      zip: "",

      ifsc: "",
      gstin: "",
    },
    resolver: yupResolver(signupSchema),
    mode: "all",
  });

  const { register, formState, handleSubmit, control, clearErrors } = form;
  const { errors } = formState;
  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(handleSignup)(e);
  };

  const dispatch = useDispatch();
  const handleSignup = async ({
    firstName,
    lastName,
    email,
    password,
    phone,
    ifsc,
    gstin,
    org,
    streetAddress,
    city,
    state,
    zip,
  }) => {
    await dispatch(
      signup({
        name: firstName + " " + lastName,
        email,
        password,
        phone,
        ifsc,
        gstin,
        org,
        address: {
          streetAddress,
          city,
          state,
          zip,
        },
      }),
    );
    // if(loggedIn){
    //     console.log(loggedIn)
    //     navigate('/')
    // }
  };

  const [step, setStep] = useState(1);
  const formSwitch = () => {
    switch (step) {
      case 1:
        return <PersonalInfo register={register} errors={errors} />;
      case 2:
        return <OrgInfo register={register} errors={errors} />;
      case 3:
        return <AccountInfo register={register} errors={errors} />;
    }
  };

  const { refreshAuth } = authSlice.actions;
  const { loggedIn, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(refreshAuth());
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-nowrap">
      <div className="w-1/2 bg-black">
        <motion.button
          //   initial={{ scale: 1 }}
          //   whileHover={{ scale: 1.2 }}
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
            navigate("/");
          }}
        >
          <motion.div className="flex items-center gap-x-2">
            <HiArrowLongLeft />
            <span className="text-base">Go Back</span>
          </motion.div>
        </motion.button>
      </div>
      <div
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="flex w-1/2 items-center justify-center"
      >
        <div className="flex h-[600px] w-2/3 flex-col items-center rounded-rounded bg-gradient-to-br from-white/20 to-white/5 px-7 py-5 shadow-lg shadow-neutral-500 backdrop-blur-lg">
          <h1 className="mb-4 text-4xl font-bold text-black">Sign Up</h1>
          <form noValidate className="flex w-full flex-col">
            {formSwitch()}
          </form>
          <div className="flex w-full flex-nowrap justify-between">
            <button
              className="rounded-rounded px-3 text-lg font-semibold transition-colors hover:bg-neutral-400/30 disabled:text-gray-500 disabled:hover:bg-transparent"
              type="button"
              disabled={step === 1}
              onClick={() => {
                setStep(step - 1);
                // clearErrors();
              }}
            >
              Go Back
            </button>
            {step < 3 ? (
              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.85 }}
                transition={{ delay: 0 }}
                type="button"
                className="text-md w-fit rounded-rounded bg-primary px-3 py-1 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight"
                onClick={() => {
                  setStep(step + 1);
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
                whileTap={{ scale: 0.85 }}
                transition={{ delay: 0 }}
                className="text-md w-20 rounded-rounded bg-primary px-3 py-1 font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight"
                onClick={onSubmit}
              >
                Submit
              </motion.button>
            )}
          </div>
          {/* <DevTool control={control} /> */}
        </div>
      </div>
    </div>
  );
}

export default Signup;

const PersonalInfo = ({ register, errors }) => {
  return (
    <motion.div
      className="mb-2 flex w-full flex-col gap-y-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-semibold">Personal Info</h1>
      <div className="flex w-full flex-nowrap justify-between">
        <div className="flex flex-col">
          <label htmlFor="firstName" className="">
            First Name
          </label>
          <input
            type="text"
            {...register("firstName")}
            id="firstName"
            className="rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.firstName ? (
              errors.firstName?.message
            ) : (
              <span className="select-none">&nbsp;</span>
            )}
          </p>
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName" className="">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            id="lastName"
            className="rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.lastName ? (
              errors.lastName?.message
            ) : (
              <span className="select-none">&nbsp;</span>
            )}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="emailSignUp" className="">
          Email Address
        </label>
        <input
          type="email"
          {...register("email")}
          id="emailSignUp"
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.email ? (
            errors.email?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="phoneSignUp" className="">
          Phone Number
        </label>
        <input
          type="tel"
          {...register("phone")}
          id="phoneSignUp"
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.phone ? (
            errors.phone?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="passwordSignUp" className="">
          Password
        </label>
        <input
          type="password"
          {...register("password")}
          id="passwordSignUp"
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.password ? (
            errors.password?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword" className="">
          Confirm Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          id="confirmPassword"
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.confirmPassword ? (
            errors.confirmPassword?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

const OrgInfo = ({ register, errors }) => {
  return (
    <motion.div
      className="mb-2 flex w-full flex-col gap-y-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-semibold">Organization Info</h1>
      <div className="flex flex-col">
        <label htmlFor="org">Organization Name</label>
        <input
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          type="text"
          id="org"
          {...register("org")}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.org ? (
            errors.org?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="streetAddress">Street Address</label>
        <input
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          type="text"
          id="streetAddress"
          {...register("streetAddress")}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.streetAddress ? (
            errors.streetAddress?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="citySignUp">City</label>
        <input
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          type="text"
          id="citySignUp"
          {...register("city")}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.city ? (
            errors.city?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="stateSignUp">State</label>
        <input
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          type="text"
          id="stateSignUp"
          {...register("state")}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.state ? (
            errors.state?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="zip">ZIP Code</label>
        <input
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          type="text"
          id="zipSignUp"
          {...register("zip")}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.zip ? (
            errors.zip?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
    </motion.div>
  );
};

const AccountInfo = ({ register, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-2xl font-semibold">Account Info</h1>
      <div className="flex flex-col">
        <label htmlFor="gstin">GSTIN</label>
        <input
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          type="text"
          id="gstin"
          {...register("gstin")}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.gstin ? (
            errors.gstin?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="ifsc">IFSC Code</label>
        <input
          className="w-full rounded-rounded border border-gray-400 bg-transparent px-2 py-1 transition-colors duration-200 focus:border-black focus:outline-none"
          type="text"
          id="ifsc"
          {...register("ifsc")}
        />
        <p className="mt-1 text-sm text-red-500">
          {errors.ifsc ? (
            errors.ifsc?.message
          ) : (
            <span className="select-none">&nbsp;</span>
          )}
        </p>
      </div>
    </motion.div>
  );
};
