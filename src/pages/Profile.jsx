import Heading from "../components/Heading"
import PageWrapper from "../hoc/PageWrapper"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { getProfile } from "../redux/slices/userSlice"
import Auth from "../components/Auth"
import EditProfile from "../components/Profile/EditProfile"
import Loader from "../components/Loader"

const Profile = () => {
  //Checking if authtoken exists, i.e., logged in on refresh
  const [open, setOpen] = useState(false)

  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state) => state.auth)
  const { user, loading } = useSelector((state) => state.user)



  return (
    <div className="flex min-h-[calc(100dvh-40px)] w-full flex-col">
      {open && <EditProfile open={open} setOpen={setOpen} />}
      <Heading name="Profile" />
      {!loggedIn ? (
        <Auth />
      ) : loading ? (
        <Loader />
      ) : (
        <div className="mt-4 flex h-full w-full flex-nowrap justify-between">
          <div className="flex h-full w-1/3 flex-col items-center justify-between gap-y-10 rounded-rounded bg-foreground px-5 pt-5">
            <div className="w-full rounded-rounded bg-primary text-center text-[185px] font-bold text-white">
              {user.name.split(" ")[0][0] + user.name.split(" ")[1][0]}
            </div>
            <div className="flex w-full flex-col gap-y-4">
              <h1 className="text-center text-6xl font-bold">{user.name}</h1>
              <p className="flex w-full flex-nowrap text-lg">
                <span className="w-1/3 text-xl font-semibold">
                  Organization:
                </span>{" "}
                {user.org}
              </p>
              <p className="flex w-full flex-nowrap text-lg">
                <span className="w-1/3 text-xl font-semibold">Email ID:</span>{" "}
                {user.email}
              </p>
              <p className="flex w-full flex-nowrap text-lg">
                <span className="w-1/3 text-xl font-semibold">Phone No:</span>{" "}
                {user.phone}
              </p>
              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(true)}
                className="my-8 h-full w-full rounded-rounded bg-primary px-3 py-3 text-2xl font-semibold text-white transition-colors duration-200 hover:bg-primaryLight"
              >
                Edit Profile
              </motion.button>
            </div>
          </div>

          <div className="flex h-full w-3/5 flex-1 flex-col justify-between gap-y-10 px-10">
            <div className="flex h-full w-full flex-col gap-y-7 rounded-rounded bg-foreground p-7">
              <h1 className="text-5xl font-semibold">Address Details</h1>
              <hr className="border-1 w-full border-gray-200" />
              <div className="flex w-full flex-col gap-y-7 ">
                <p className="flex w-full text-xl">
                  <span className="w-1/4 text-xl font-semibold">
                    Street Address:{" "}
                  </span>
                  {user.address.streetAddress}
                </p>
                <div className="flex w-full flex-nowrap justify-between text-xl">
                  <span className="flex w-1/2">
                    <span className="w-1/2 font-semibold">City: </span>
                    {user.address.city}
                  </span>
                  <span className="flex w-1/2">
                    <span className="w-1/2 font-semibold">State: </span>
                    {user.address.state}
                  </span>
                </div>
                <div className="flex w-full flex-nowrap text-xl">
                  <span className="flex w-1/2">
                    <span className="w-1/2 font-semibold">ZIP Code: </span>
                    {user.address.zip}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full flex-col gap-y-8 rounded-rounded bg-foreground px-7 py-8">
              <h1 className="text-5xl font-semibold">Banking Details</h1>
              <hr className="border-1 w-full border-gray-200" />
              <div className="flex w-full flex-nowrap text-xl">
                <span className=" flex w-1/2">
                  <span className="text-xl font-semibold w-1/2">Bank Name: </span>
                  {user.banking.bankName}
                </span>
                <span className="flex w-1/2">
                  <span className="text-xl font-semibold w-1/2">Bank Branch: </span>
                  {user.banking.branch}
                </span>
              </div>
              <div className="flex w-full flex-nowrap text-xl">
                <span className="flex w-1/2">
                  <span className="text-xl font-semibold w-1/2">
                    Account Number:{" "}
                  </span>
                  {user.banking.accountNumber}
                </span>
                <span className="flex w-1/2">
                  <span className="text-xl font-semibold w-1/2">IFSC Code: </span>
                  {user.banking.ifsc}
                </span>
              </div>
              <p className="w-full text-xl flex">
                <span className="text-xl font-semibold w-1/4">GSTIN Number: </span>
                {user.gstin}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageWrapper(Profile, "profile")
