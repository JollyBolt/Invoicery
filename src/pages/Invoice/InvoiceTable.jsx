import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  HiMagnifyingGlass,
  RxCross1,
  FaPlus,
  AddCustomer,
} from "../../assets/index"
import { useDebounce } from "../../hooks/useDebounce"
import { invoiceColumns } from "../../components/Table/Columns"
import { fetchAllInvoices } from "../../redux/slices/invoiceSlice"
import Table from "../../components/Table/Table"
import Loader from "../../components/Loader"
import Auth from "../../components/Auth"

const InvoiceTable = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { invoices, loading } = useSelector((state) => state.invoices)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const dispatch = useDispatch()

  useEffect(() => {
    async function getInvoices() {
      if (token !== null) {
        await dispatch(
          fetchAllInvoices({
            search: debouncedSearch,
            page: pagination.pageIndex,
            limit: pagination.pageSize,
          }),
        )
      }
    }
    getInvoices()
  }, [token, debouncedSearch, pagination])

  return (
      <> 
      {/* {token === null ? (
        <Auth />
      ) : token === undefined && loading ? (
        <>
        <Loader />
        </>
      ) : ( */}
        <div className="flex h-[calc(100dvh-80px)] flex-col gap-4 rounded-rounded">
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
                  name="search"
                  disabled={!debouncedSearch && invoices.pageCount === 0}
                  placeholder="Search by invoice number or customer"
                  id="searchProduct"
                  className="inline w-full bg-transparent py-0 text-foreground outline-none active:outline-none"
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
                  sessionStorage.setItem("mode", "create")
                }}
                type="button"
                className="flex w-fit items-center gap-2 rounded-rounded bg-primary p-2 px-4 text-lg text-white transition-colors hover:bg-primaryLight"
              >
                <FaPlus />
                <span className="font-semibold">Add Invoice</span>
              </button>
            </div>
          </div>

          {token && !loading ? (
            debouncedSearch || invoices.invoices.length !== 0 ? (
              <>
                <div className="h-full w-full flex-1">
                  {/* {invoices.invoices && ( */}
                  <Table
                    tableColumns={invoiceColumns}
                    tableData={invoices.invoices}
                    pageCount={invoices.pageCount}
                    pagination={pagination}
                    setPagination={setPagination}
                  />
                  {/* )} */}
                </div>
              </>
            ) : (
              // If no invoices
              <div className="flex h-full flex-1 flex-col items-center justify-evenly">
                <h2 className="text-center text-xl text-foreground">
                  You don't have any invoices. Click{" "}
                  <span
                    onClick={() => {
                      navigate("createInvoice")
                      sessionStorage.clear()
                      sessionStorage.setItem("mode", "create")
                    }}
                    className="text-primaryLight transition-all hover:cursor-pointer hover:underline hover:underline-offset-2"
                  >
                    here{" "}
                  </span>
                  to add new invoice.
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
      {/* )} */}
        </>
  )
}

export default InvoiceTable
