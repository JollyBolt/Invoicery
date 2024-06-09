import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FcGoogle } from "../assets";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Modal open={open} setOpen={setOpen} />
      <h1 className="text-center text-4xl font-semibold text-black">
        Sign in now to access all features!
      </h1>
      <motion.button
        onClick={() => {
          setOpen(true);
        }}
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.85 }}
        transition={{ ease: "linear", delay: 0, duration: 0.1 }}
        className="rounded-rounded bg-primary px-2 py-1 text-lg font-semibold text-white transition-colors duration-200 hover:bg-primaryLight"
      >
        Sign In
      </motion.button>
    </div>
  );
}

const Modal = ({ open, setOpen }) => {
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        // console.log(response.access_token)
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo ",
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${response.accessToken}`,
              "Access-Control-Allow-Origin": "*",
            },
          },
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const navigate = useNavigate();

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter email address"),
    password: yup.string().required("Please enter password"),
  });
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const { control, register, handleSubmit, formState } = form;
  const { errors } = formState;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const onSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(handleLogin)(e);
  };
  const handleLogin = ({ email, password }) => {
    dispatch(login({ email, password }));
  };
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ ease: "easeOut", delay: 0 }}
              className="flex w-[25vw] flex-col rounded-rounded bg-white p-10"
            >
              <h1 className="mb-4 text-4xl font-bold">Sign In</h1>
              <form
                onSubmit={onSubmit}
                noValidate
                className="flex w-full flex-col"
              >
                <div className="flex w-full flex-nowrap justify-between">
                  <label
                    htmlFor="email"
                    className="text-lg font-semibold text-gray-500"
                  >
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    {...register("email")}
                    className="peer rounded-rounded border border-gray-300 p-3 transition-colors duration-150 focus:border-black focus:outline-none"
                  />
                </div>
                <p className="mb-2 mt-1 w-3/4 self-end text-sm text-red-500">
                  {errors.email ? (
                    errors.email?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
                <div className="flex w-full flex-nowrap justify-between">
                  <label
                    htmlFor="email"
                    className="absolute left-1 top-1/2 translate-y-[-50%] bg-white px-2 text-sm font-semibold text-gray-500 transition-all duration-200 peer-focus:top-0"
                  >
                    Email
                  </label>
                </div>
                <div className="relative flex w-full flex-col flex-nowrap">
                  <input
                    {...register("password")}
                    type="password"
                    id="password"
                    className="peer rounded-rounded border border-gray-300 p-3 text-lg transition-colors duration-150 focus:border-black focus:outline-none"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-1 top-1/2 translate-y-[-50%] bg-white px-2 text-sm font-semibold text-gray-500 transition-all duration-200 peer-focus:top-0"
                  >
                    Password
                  </label>
                </div>
                <p className="mb-2 mt-1 w-3/4 self-end text-sm text-red-500">
                  {errors.password ? (
                    errors.password?.message
                  ) : (
                    <span className="select-none">&nbsp;</span>
                  )}
                </p>
                {loading ? (
                  <div className="flex w-full justify-center rounded-rounded bg-primary text-center">
                    <img src="/src/assets/Loading2.gif" className="w-11" />
                  </div>
                ) : (
                  <motion.input
                    initial={{ scale: 1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ delay: 0 }}
                    type="submit"
                    value="Submit"
                    className="w-full rounded-rounded bg-primary py-2 text-lg font-semibold text-white transition-colors duration-200 hover:cursor-pointer hover:bg-primaryLight"
                  />
                )}
              </form>
              <DevTool control={control} />
              <p className="mt-2
              ">Forgot your Password? <span className="text-primaryLight hover:underline hover:underline-offset-2 hover:cursor-pointer">Click</span> to change password.</p>
              <div classNameName="inline-flex w-full items-center justify-center">
                <hr classNameName="mb-8 mt-4 h-px w-full border-0 bg-gray-300" />
                <span classNameName="absolute left-1/2 -translate-x-1/2 bg-white px-3 font-medium text-gray-400">
                  OR
                </span>
              </div>
              <div className="w-full flex-1">
                {/* <div className="w-full"> */}
                {/* <GoogleLogin
                  theme="filled_blue"
                  // width="300"
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse?.credential);
                    console.log(decoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                /> */}
                <button
                  onClick={googleLogin}
                  className="flex w-full items-center gap-3 rounded-rounded border-2 p-2 px-4 text-2xl"
                >
                  <span>
                    <FcGoogle />
                  </span>
                  <span className="text-lg font-semibold">
                    Sign in with Google
                  </span>
                </button>
              </div>
              <p>
                Don't Have an account?{" "}
                <span
                  className="text-primaryLight hover:cursor-pointer hover:underline hover:underline-offset-2"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Sign Up
                </span>{" "}
                now to access all features.
              </p>
            </motion.div>
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="absolute right-10 top-4 p-2 text-3xl font-thin text-white"
            >
              X
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Auth;

