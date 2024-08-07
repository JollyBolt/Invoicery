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
import Loader from "../../components/Loader"
import Auth from "../../components/Auth"

const CustomerTable = () => {
  const { customers, loading } = useSelector((state) => state.customers)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  //State to open create customer modal
  const [open, setOpen] = useState(false)

  //Checking if authtoken exists, i.e., logged in on refresh
  const dispatch = useDispatch()
  const {  token } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getCustomers() {
      if (token !== null) {
        await dispatch(
          fetchAllCustomers({
            search: debouncedSearch,
            page: pagination.pageIndex,
            limit: pagination.pageSize,
          }),
        )
      }
    }
    getCustomers()
  }, [token, debouncedSearch, pagination])

  return (
    <>
      {/* {token === null ? (
        <Auth />
      ) : token === undefined && loading ? (
        <>
          <Loader />
        </>
      ) : (
        <> */}
          <CreateCustomer open={open} setOpen={setOpen} />
          <div
            className={`flex h-[calc(100dvh-80px)] flex-col flex-nowrap gap-4 rounded-rounded`}
          >
            {/* {customers ? (
          <> */}
            <div className="flex w-full flex-row flex-nowrap justify-between rounded-t-sm">
              <div className="w-1/3 rounded-md border border-border bg-background p-2">
                <div className="justfy-betweem flex h-fit w-full flex-nowrap items-center">
                  <HiMagnifyingGlass className="inline pr-2 text-4xl text-foreground" />
                  <input
                    onChange={(e) => {
                      setSearch(e.target.value)
                    }}
                    type="text"
                    autoComplete="off"
                    value={search}
                    disabled={!debouncedSearch && customers.pageCount === 0}
                    name="search"
                    placeholder="Search Customers"
                    id="searchCustom"
                    className="inline w-full bg-transparent py-0 text-foreground outline-none active:outline-none"
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
                  className="flex w-fit items-center gap-2 rounded-rounded bg-primary p-2 px-4 text-lg font-semibold text-white transition-colors hover:bg-primaryLight"
                >
                  <FaPlus className="inline text-white" />
                  <p className="font-semibold">Add Customer</p>
                </button>
              </div>
            </div>

            {/* Main Content */}
            {token && !loading ? (
              debouncedSearch || customers.customers.length !== 0 ? (
                <>
                  {/* {customers.customers && ( */}
                  <Table
                    tableColumns={customerColumns}
                    tableData={customers.customers}
                    pageCount={customers.pageCount}
                    pagination={pagination}
                    setPagination={setPagination}
                  />
                  {/* )} */}
                </>
              ) : (
                <div className="flex h-full flex-1 flex-col items-center justify-evenly">
                  <h2 className="text-center text-xl text-foreground">
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
                    <img src={AddCustomer} alt="" />
                  </div>
                </div>
              )
            ) : (
              <>
                <Loader />
              </>
            )}
          </div>
        </>
    //   )}
    // </>
  )
}

export default CustomerTable
