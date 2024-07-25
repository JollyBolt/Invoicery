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
import Loader from "../components/Loader"

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
  const {  token } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getProducts() {
      if (token !== null) {
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
  }, [token, debouncedSearch, pagination])

  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      {token === null ? (
        <Auth />
      ) : token === undefined && loading ? (
        <>
          <Loader />
        </>
      ) : (
        <div
          className={`mt-4 h-[calc(100dvh-80px)] rounded-rounded ${products && "flex flex-col flex-nowrap items-center gap-4"}`}
        >
          <AddProductModal isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Search Bar & Add Product Button */}
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
                  disabled={!debouncedSearch && products.pageCount === 0}
                  name="search"
                  placeholder="Search Products"
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

          {/* Main Content */}
          {!loading ? (
            debouncedSearch || products.products.length !== 0 ? (
              <>
                <div className="w-full flex-1">
                  {/* {products.products && ( */}
                  <Table
                    tableColumns={productColumns}
                    tableData={products.products}
                    pageCount={products.pageCount}
                    pagination={pagination}
                    setPagination={setPagination}
                  />
                  {/* )} */}
                </div>
              </>
            ) : (
              //If no products
              <div className="flex h-full flex-1 flex-col items-center justify-evenly">
                <h2 className="text-center text-xl text-foreground">
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
            )
          ) : (
            <>
              <Loader />
            </>
          )}
        </div>
      )}
    </>
  )
}

export default PageWrapper(Products, "products")

// }
