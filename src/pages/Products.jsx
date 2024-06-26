import PageWrapper from "../hoc/PageWrapper"
import Heading from "../components/Heading"
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

const Products = () => {
  const { products } = useSelector((state) => state.products)

  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search)

  //Checking if authtoken exists, i.e., logged in on refresh
  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getProducts() {
      if (loggedIn) {
        await dispatch(fetchAllProducts({ search: debouncedSearch }))
      }
    }
    getProducts()
  }, [loggedIn, debouncedSearch])

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="flex min-h-[calc(100dvh-40px)] w-full flex-col">
      <AddProductModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <Heading name="Products" />
      {loggedIn === false ? (
        <>
          <Auth />
        </>
      ) : (
        <div
          className={`mt-5 min-h-[82dvh] rounded-rounded bg-foreground p-5 ${products && "flex flex-col flex-nowrap items-center"}`}
        >
          {products ? (
            <>
              <div className="flex w-full flex-row flex-nowrap justify-between rounded-t-sm">
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
                    className="flex w-fit items-center gap-2 rounded-rounded bg-primary p-2 px-4 text-lg text-white transition-colors hover:bg-primaryLight"
                  >
                    <FaPlus />
                    <span>Add Product</span>
                  </button>
                </div>
              </div>
              <Table tableColumns={productColumns} tableData={products} />
            </>
          ) : (
            <div className="flex h-full flex-1 flex-col items-center justify-evenly">
              <h2 className="text-center text-xl">
                You don't have any products. Click{" "}
                <span
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  className="text-primaryLight transition-all hover:cursor-pointer hover:underline hover:underline-offset-2"
                >
                  here{" "}
                </span>
                to add new product.
              </h2>
              <div className="float-end">
                <img src={AddCustomer} alt="" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PageWrapper(Products, "products")
