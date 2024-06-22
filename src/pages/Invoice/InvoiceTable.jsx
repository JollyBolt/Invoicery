import PageWrapper from "../../hoc/PageWrapper"
import Heading from "../../components/Heading"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { authSlice } from "../../redux/slices/authSlice"
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  HiMagnifyingGlass,
  FaFilter,
  RxCross1,
  SlSocialDropbox,
  AddCustomer,
  FaPlus,
} from "../../assets/index"

const InvoiceTable = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  // const [formData,setFormData]=useState({

  // })
  //Checking if authtoken exists, i.e., logged in on refresh
  const { refreshAuth } = authSlice.actions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(refreshAuth())
  }, [])
  return (
    <div className="min-h-[82dvh] rounded-rounded bg-foreground p-5">
      <div className="flex w-full flex-row flex-nowrap justify-between rounded-t-sm bg-white">
        <div className="w-1/3 border-b border-neutral-800 pl-2">
          <div className="justfy-betweem flex h-fit w-full flex-nowrap items-center">
            <HiMagnifyingGlass className="inline pr-2 text-4xl" />
            <input
              onChange={(e) => {
                setSearch(e.target.value)
                searchPagination()
              }}
              type="text"
              autoComplete="off"
              value={search}
              name="search"
              placeholder="Search Products"
              id="searchProduct"
              className="inline w-full bg-transparent py-0 text-black outline-none active:outline-none"
            />
            {search && (
              <button
                type="btn"
                className="h-fit w-fit"
                onClick={() => {
                  document.getElementById("searchProduct").value = ""
                  setSearch("")
                }}
              >
                <RxCross1 className="text-lg text-red-400" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-nowrap items-center justify-between">
          {/* <div id="filterBox" className="bg-green-500"></div> */}
          <button
            onClick={() => navigate("createInvoice")}
            type="button"
            className="flex w-fit items-center gap-2 rounded-rounded bg-primary p-2 px-4 text-lg text-white transition-colors hover:bg-primaryLight"
          >
            <FaPlus />
            <span>New Invoice</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InvoiceTable
