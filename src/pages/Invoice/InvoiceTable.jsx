import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HiMagnifyingGlass, RxCross1, FaPlus } from "../../assets/index"
import { useDebounce } from "../../hooks/useDebounce"
import { invoiceColumns } from "../../components/Table/Columns"
import { fetchAllInvoices } from "../../redux/slices/invoiceSlice"
import Table from "../../components/Table/Table"

const InvoiceTable = () => {
  const navigate = useNavigate()
  const { invoices } = useSelector((state) => state.invoices)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  //Checking if authtoken exists, i.e., logged in on refresh
  const dispatch = useDispatch()
  // const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getInvoices() {
      // if (loggedIn) {
      await dispatch(
        fetchAllInvoices({
          search: debouncedSearch,
          page: pagination.pageIndex,
          limit: pagination.pageSize,
        }),
      )
      // }
    }
    getInvoices()
  }, [debouncedSearch, pagination])

  return (
    <div className="flex min-h-[calc(100dvh-80px)] flex-1 flex-col rounded-rounded bg-foreground p-5">
      {invoices ? (
        <>
          <div className="flex w-full flex-row flex-nowrap justify-between rounded-t-sm bg-white">
            <div className="w-1/3 border-b border-neutral-800 pl-2">
              <div className="justfy-betweem flex h-fit w-full flex-nowrap items-center">
                <HiMagnifyingGlass className="inline pr-2 text-4xl" />
                <input
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  type="text"
                  autoComplete="off"
                  value={search}
                  name="search"
                  placeholder="Search by invoice number or customer"
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
                onClick={() => {
                  navigate("createInvoice")
                  sessionStorage.clear()
                }}
                type="button"
                className="flex w-fit items-center gap-2 rounded-rounded bg-primary p-2 px-4 text-lg text-white transition-colors hover:bg-primaryLight"
              >
                <FaPlus />
                <span className="font-semibold">Add Invoice</span>
              </button>
            </div>
          </div>
          {/* <div className="w-full flex-1"> */}
          {invoices.invoices && (
            <Table
              tableColumns={invoiceColumns}
              tableData={invoices.invoices}
              pageCount={invoices.pageCount}
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
          {/* </div> */}
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
            <img src={AddCustomer} alt="" />
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoiceTable
