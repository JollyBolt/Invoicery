import PageWrapper from "../hoc/PageWrapper"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import { getProfile } from "../redux/slices/userSlice"
import Auth from "../components/Auth"
import EditProfile from "../components/Profile/EditProfile"
import Loader from "../components/Loader"
import TnCModal from "../components/Profile/TnCModal"
import { displayPhone } from "../utils/displayPhone"
import { PageLoader } from "../assets"

const Profile = () => {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  const [details, setDetails] = useState("organization")

  const dispatch = useDispatch()
  //Checking if authtoken exists, i.e., logged in on refresh
  const { loggedIn } = useSelector((state) => state.auth)
  const { user, loading } = useSelector((state) => state.user)

  useEffect(() => {
    async function getUserData() {
      if (loggedIn) {
        await dispatch(getProfile())
      }
    }
    getUserData()
  }, [loggedIn])

  return (
    <div className="mt-4 flex h-[calc(100dvh-88px)] w-full flex-col">
      {!loading && <EditProfile open={open} setOpen={setOpen} />}

      {editOpen && (
        <TnCModal editOpen={editOpen} setEditOpen={setEditOpen} user={user} />
      )}

      {!loggedIn ? (
        <Auth />
      ) : loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div className="flex h-full w-full flex-col flex-nowrap overflow-hidden rounded-rounded bg-background">
          <div className="w-full bg-primary p-5 text-white shadow-md shadow-slate-400 dark:shadow-none">
            <p className="p-3 text-6xl font-black">{user.name}</p>
            <div className="flex items-center gap-20">
              <p className="p-3 text-lg font-light">
                Email: <span className="font-bold">{user.email}</span>
              </p>
              <p className="p-3 text-lg font-light">
                Phone:{" "}
                <span className="font-bold">{displayPhone(user.phone)}</span>
              </p>
              <motion.button
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.2 }}
                onClick={() => setOpen(true)}
                className="rounded-rounded bg-primary p-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-primaryLight"
              >
                Edit Profile
              </motion.button>
            </div>
          </div>

          <div className="flex h-full w-full flex-1 p-3">
            <div className="flex h-full w-1/4 shrink-0 flex-col gap-2 border-r p-3">
              <p
                className={`cursor-pointer rounded-rounded p-3 text-2xl ${details == "organization" ? "bg-primary text-white" : "text-foreground hover:bg-secondaryBtnHover"} transition-all`}
                onClick={() => setDetails("organization")}
              >
                Organization Details
              </p>
              <p
                className={`cursor-pointer rounded-rounded p-3 text-2xl ${details == "banking" ? "bg-primary text-white" : "text-foreground hover:bg-secondaryBtnHover"} transition-all`}
                onClick={() => setDetails("banking")}
              >
                Banking Details
              </p>
              <p
                className={`cursor-pointer rounded-rounded p-3 text-2xl ${details == "tnc" ? "bg-primary text-white" : "text-foreground hover:bg-secondaryBtnHover"} transition-all`}
                onClick={() => setDetails("tnc")}
              >
                Terms and Conditions
              </p>
            </div>
            <div className="w-2/3">
              <div
                className={`${
                  details !== "organization" && "hidden"
                } flex w-full flex-col gap-5 p-5 text-xl text-foreground`}
              >
                <div className="flex">
                  <p className="w-52">Name</p>
                  <span className="font-semibold">{user.org.name}</span>
                </div>
                <div className="flex">
                  <p className="w-52">Email</p>
                  <span className="font-semibold">{user.org.email}</span>
                </div>
                <div className="flex">
                  <p className="w-52">GSTIN</p>
                  <span className="font-semibold">{user.org.gstin}</span>
                </div>
                <div className="flex">
                  <p className="w-52">Street Address</p>
                  <span className="font-semibold">
                    {user.org.address.streetAddress}
                  </span>
                </div>
                <div className="flex">
                  <p className="w-52">City</p>
                  <span className="font-semibold">{user.org.address.city}</span>
                </div>
                <div className="flex">
                  <p className="w-52">State</p>
                  <span className="font-semibold">
                    {user.org.address.state}
                  </span>
                </div>
                <div className="flex">
                  <p className="w-52">Country</p>
                  <span className="font-semibold">
                    {user.org.address.country}
                  </span>
                </div>
                <div className="flex">
                  <p className="w-52">Zip</p>
                  <span className="font-semibold">{user.org.address.zip}</span>
                </div>
              </div>

              <div
                className={`${
                  details !== "banking" && "hidden"
                } flex w-full flex-col gap-5 p-5 text-xl text-foreground`}
              >
                <div className="flex">
                  <p className="w-52">Bank</p>
                  <span className="font-semibold">{user.banking.bankName}</span>
                </div>
                <div className="flex">
                  <p className="w-52">Branch</p>
                  <span className="font-semibold">{user.banking.branch}</span>
                </div>
                <div className="flex">
                  <p className="w-52">Account Number</p>
                  <span className="font-semibold">
                    {user.banking.accountNumber}
                  </span>
                </div>
                <div className="flex">
                  <p className="w-52">IFSC</p>
                  <span className="font-semibold">{user.banking.ifsc}</span>
                </div>
              </div>
              <div
                className={`${details !== "tnc" && "hidden"} flex w-2/3 flex-col gap-5 p-5 text-xl text-foreground`}
              >
                {user?.termsNConditions.length > 0 ? (
                  <>
                    <ol className="list-decimal px-5">
                      {user?.termsNConditions.map((tnc, ind) => (
                        <li key={ind}>{tnc}</li>
                      ))}
                    </ol>
                    <div>
                      <button
                        type="button"
                        onClick={() => setEditOpen(true)}
                        className="rounded-rounded bg-primary p-2 px-4 text-white"
                      >
                        Edit Terms and Conditions
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex w-full">
                    <button
                      type="button"
                      className="rounded-rounded bg-primary p-2 text-white"
                      onClick={() => setEditOpen(true)}
                    >
                      Add Terms and Conditions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageWrapper(Profile, "profile")
