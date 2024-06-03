import PageWrapper from "../hoc/PageWrapper";
import Heading from "../components/Heading";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  HiMagnifyingGlass,
  FaFilter,
  RxCross1,
  SlSocialDropbox,
  AddCustomer,
  FaPlus,
} from "../assets/index";
import data from "../demoData.json";
import { useEffect, useState } from "react";
import ProductField from "../components/Products/ProductField";
import AddProductModal from "../components/Products/AddProductModal";

const Products = () => {
  //pagination funciton
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const [nPages, setNPages] = useState(
    Math.ceil(data.products.length / recordsPerPage),
  );

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const [search, setSearch] = useState("");

  /**
   * This effect hook is used to handle the pagination and search functionality for the products.
   * It updates the current page and the number of pages based on the search query.
   *
   * @param {Object} props - The component's props.
   * @param {Array} props.data.products - The array of products data.
   * @param {number} props.recordsPerPage - The number of records to display per page.
   * @param {Function} props.setCurrentPage - The function to set the current page.
   * @param {Function} props.setNPages - The function to set the number of pages.
   * @param {string} props.search - The search query.
   * @param {Function} props.setSearch - The function to set the search query.
   *
   * @returns {void}
   */
  useEffect(() => {
    // Reset the current page to 1 when the search query changes
    setCurrentPage(1);

    if (search) {
      // If there is a search query, calculate the number of pages based on the filtered products
      setNPages(
        data.products.filter((product) => {
          return product.name.toLowerCase().includes(search.toLowerCase());
        }).length
          ? Math.ceil(
              data.products.filter((product) => {
                return product.name
                  .toLowerCase()
                  .includes(search.toLowerCase());
              }).length / recordsPerPage,
            )
          : 1,
      );
    } else {
      // If there is no search query, calculate the number of pages based on all products
      setNPages(Math.ceil(data.products.length / recordsPerPage));
    }
  }, [search]); // Dependency on the search query

  return (
    <div className="flex min-h-[calc(100dvh-40px)] w-full flex-col">
      <AddProductModal />
      <Heading name="Products" />
      <div
        className={`mt-5 min-h-[83dvh] rounded-rounded bg-foreground p-5 ${data.products && "flex flex-col flex-nowrap items-center"}`}
      >
        {data.products ? (
          <>
            <div className="flex w-full flex-row flex-nowrap justify-between rounded-t-sm">
              <div className="w-1/3 border-b border-neutral-800 pl-2">
                <div className="justfy-betweem flex h-fit w-full flex-nowrap items-center">
                  <HiMagnifyingGlass className="inline pr-2 text-4xl" />
                  <input
                    onChange={(e) => {
                      setSearch(e.target.value);
                      searchPagination();
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
                        document.getElementById("searchProduct").value = "";
                        setSearch("");
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
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  type="button"
                  className="flex w-fit items-center gap-2 rounded-rounded bg-primary p-2 px-4 text-lg text-white transition-colors hover:bg-primaryLight"
                >
                  <FaPlus />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="borde-x mx-auto mt-4 flex w-full flex-col overflow-y-scroll rounded-t-rounded border-t border-slate-300">
              <div className="flex h-14 w-full flex-row flex-nowrap items-center justify-between bg-primaryLight px-5 py-2 text-lg text-white">
                <h3 className="w-1/4 font-semibold">S No.</h3>
                <h3 className="w-1/4 font-semibold">NAME</h3>
                <h3 className="w-1/4 font-semibold">HSN CODE</h3>
                <h3 className="w-1/4 font-semibold">PRICE(INR)</h3>
              </div>
              <div className="w-full border-t border-slate-300">
                {data.products
                  .filter((product) => {
                    return product.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .slice(indexOfFirstRecord, indexOfLastRecord)
                  .map((product, i) => {
                    return (
                      <ProductField
                        key={i}
                        index={product.id}
                        name={product.name}
                        hsncode={product.hsn_code}
                        price={product.price}
                        currentPage={currentPage}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="flex w-full justify-end rounded-b-rounded border-x border-b py-2">
              <div className="flex w-1/4 items-center justify-end text-right">
                <span className="text-lg">
                  {currentPage} of{" "}
                  {search
                    ? data.products.filter((product) => {
                        return product.name
                          .toLowerCase()
                          .includes(search.toLowerCase());
                      }).length
                      ? Math.ceil(
                          data.products.filter((product) => {
                            return product.name
                              .toLowerCase()
                              .includes(search.toLowerCase());
                          }).length / recordsPerPage,
                        )
                      : 1
                    : Math.ceil(data.products.length / recordsPerPage)}
                </span>
                <button type="btn" onClick={goToPrevPage} className="w-fit">
                  <MdOutlineKeyboardArrowLeft
                    aria-disabled={currentPage === 1}
                    className={`text- h-fit text-4xl font-bold aria-disabled:text-gray-400 aria-disabled:hover:cursor-default`}
                  />
                </button>
                <button type="btn" className="w-fit" onClick={goToNextPage}>
                  <MdOutlineKeyboardArrowRight
                    aria-disabled={currentPage === nPages}
                    className={`text- h-fit text-4xl font-bold aria-disabled:text-gray-400 aria-disabled:hover:cursor-default`}
                  />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-1 flex-col items-center justify-evenly">
            <h2 className="text-center text-xl">
              You don't have any products. Click{" "}
              <span
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                // onClick={() => {
                //   setCreateOpen(true);
                // }}
                className="text-primaryLight transition-all hover:cursor-pointer hover:underline hover:underline-offset-2"
              >
                here{" "}
              </span>
              to add new product.
            </h2>
            <div className="float-end">
              {/* <SlSocialDropbox className="text-gray-500 text-[13em]" /> */}
              <img src={AddCustomer} alt="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWrapper(Products, "products");
