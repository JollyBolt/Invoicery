import PageWrapper from "../hoc/PageWrapper"
import {
  HiMagnifyingGlass,
  RxCross1,
  AddCustomer,
  FaPlus,
} from "../assets/index"
import { useEffect, useState } from "react"
import AddProductModal from "../components/Products/AddProductModal"
import { useDispatch, useSelector } from "react-redux"
import Auth from "../components/Auth"
import Table from "../components/Table/Table"
import { productColumns } from "../components/Table/Columns"
import { fetchAllProducts } from "../redux/slices/productSlice"
import { useDebounce } from "../hooks/useDebounce"
import Skeleton from "./Skeleton"

const Products = () => {
  const { products, loading } = useSelector((state) => state.products)
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  //Checking if authtoken exists, i.e., logged in on refresh
  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getProducts() {
      if (loggedIn) {
        await dispatch(
          fetchAllProducts({
            search: debouncedSearch,
            page: pagination.pageIndex,
            limit: pagination.pageSize,
          }),
        )
      }
    }
    getProducts()
  }, [loggedIn, debouncedSearch, pagination])

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {loggedIn == false ? (
        <>
          <Auth />
        </>
      ) : (
        <div
          className={`mt-4 h-[calc(100dvh-80px)] rounded-rounded ${products && "flex flex-col flex-nowrap items-center gap-4"}`}
        >
          <AddProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
          {products ? (
            <>
              <div className="flex w-full flex-row flex-nowrap justify-between rounded-t-sm">
                <div className="w-1/3 rounded-md border border-slate-300 bg-white p-2">
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
                  <button
                    onClick={() => setIsOpen(true)}
                    type="button"
                    className="flex w-fit items-center gap-2 rounded-rounded bg-primary p-2 px-4 text-lg font-semibold text-white transition-colors hover:bg-primaryLight"
                  >
                    <FaPlus />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
              <div className="w-full flex-1">
                {products.products && (
                  <Table
                    tableColumns={productColumns}
                    tableData={products.products}
                    pageCount={products.pageCount}
                    pagination={pagination}
                    setPagination={setPagination}
                  />
                )}
              </div>
            </>
          ) : (
            //If no products
            <div className="flex h-full flex-1 flex-col items-center justify-evenly">
              <h2 className="text-center text-xl">
                You don't have any products. Click{" "}
                <span
                  onClick={() => setIsOpen(true)}
                  className="text-primaryLight transition-all hover:cursor-pointer hover:underline hover:underline-offset-2"
                >
                  here
                </span>
                &nbsp;to add new product.
              </h2>
              <div className="float-end">
                <img src={AddCustomer} alt="" />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default PageWrapper(Products, "products")
