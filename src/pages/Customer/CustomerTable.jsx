import {
  AddCustomer,
  FaPlus,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  HiMagnifyingGlass,
  RxCross1,
} from "../../assets/index"
import { useEffect, useState } from "react"
import CreateCustomer from "../../components/Customer/CreateCustomer"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllCustomers } from "../../redux/slices/customerSlice"
import Table from "../../components/Table/Table"
import { customerColumns } from "../../components/Table/Columns"
import { useDebounce } from "../../hooks/useDebounce"

const CustomerTable = () => {
  const { customers } = useSelector((state) => state.customers)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)

  const [open, setOpen] = useState(false)
  const [openEditModal, setOpenEditModal] = useState(false)

  //Checking if authtoken exists, i.e., logged in on refresh

  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getCustomers() {
      if (loggedIn) {
        await dispatch(fetchAllCustomers({ search: debouncedSearch }))
      }
    }
    getCustomers()
  }, [loggedIn, debouncedSearch])

  return (
    <>
      <CreateCustomer open={open} setOpen={setOpen} />

      <div
        className={`min-h-[82dvh] rounded-rounded bg-foreground p-5 ${
          // customers &&
          "flex flex-col flex-nowrap"
        }`}
      >
        {customers ? (
          <>
            <div className="flex w-full flex-row flex-nowrap justify-between rounded-t-sm">
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
                    placeholder="Search Customers"
                    id="searchCustom"
                    className="inline w-full bg-transparent py-0 text-black outline-none active:outline-none"
                  />
                  {search && (
                    <button
                      type="btn"
                      className="h-fit w-fit"
                      onClick={() => {
                        document.getElementById("searchCustom").value = ""
                        setSearch("")
                      }}
                    >
                      <RxCross1 className="text-lg text-red-400" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-nowrap items-center justify-between">
                <button
                  onClick={() => setOpen(true)}
                  type="button"
                  className="w-fit rounded-full bg-primaryLight p-2 transition-colors hover:bg-primary"
                >
                  <FaPlus className="inline text-2xl text-white" />
                </button>
              </div>
            </div>

            <Table tableColumns={customerColumns} tableData={customers} />
          </>
        ) : (
          <div className="flex h-full flex-1 flex-col items-center justify-evenly">
            <h2 className="text-center text-xl">
              You don't have any customers. Click{" "}
              <span
                onClick={() => setOpen(true)}
                className="text-primaryLight transition-all hover:cursor-pointer hover:underline hover:underline-offset-2"
              >
                here{" "}
              </span>
              to add new customer.
            </h2>
            <div className="float-end">
              {/* <SlSocialDropbox className="text-gray-500 text-[13em]" /> */}
              <img src={AddCustomer} alt="" />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerTable
