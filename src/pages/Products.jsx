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
  FaPlus
} from "../assets/index";
import data from "../demoData.json";
import { useEffect, useState } from "react";
import CreateCustomer from "../components/Customer/CreateCustomer";
import ProductField from "../components/Products/ProductField";
import AddProductModal from "../components/Products/AddProductModal";

const Products = () => {
  //pagination funciton
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const [nPages, setNPages] = useState(
    Math.ceil(data.customers.length / recordsPerPage)
  );

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const [search, setSearch] = useState("");

  //search pagination function
  useEffect(() => {
    setCurrentPage(1);
    if (search) {
      setNPages(
        data.customers.filter((customer) => {
          return customer.name.toLowerCase().includes(search.toLowerCase());
        }).length
          ? Math.ceil(
            data.customers.filter((customer) => {
              return customer.name
                .toLowerCase()
                .includes(search.toLowerCase());
            }).length / recordsPerPage
          )
          : 1
      );
    } else {
      setNPages(Math.ceil(data.customers.length / recordsPerPage));
    }
  }, [search]);

  return (
    <div className="min-h-[calc(100dvh-40px)] flex flex-col w-full">
      <AddProductModal />
      <Heading name="Products" />
      <div
        className={`bg-foreground min-h-full p-5 rounded-rounded mt-5 ${
          data.products && "flex flex-col flex-nowrap justify-center items-center "
        }`}
      >
        {data.products ? (
          <>
            <div className="flex flex-nowrap justify-between flex-row w-full rounded-t-sm">
              <div className=" w-1/3 pl-2 border-b border-neutral-800">
                <div className="flex flex-nowrap w-full justfy-betweem items-center h-fit">
                  <HiMagnifyingGlass className="inline text-4xl pr-2" />
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
                    className="inline text-black bg-transparent py-0 outline-none active:outline-none w-full"
                  />
                  {search && (
                    <button
                      type="btn"
                      className="w-fit h-fit"
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
                <div id="filterBox" className="bg-green-500"></div>
                <button
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                  type="button"
                  className="w-fit transition-colors p-2 px-4 bg-primary hover:bg-primaryLight rounded-rounded text-white flex items-center text-lg gap-2"
                >
                  <FaPlus  />
                  <span>Add Product</span>
                </button>
              </div>
            </div>

            <div className="w-full mx-auto flex flex-col overflow-y-scroll borde-x border-t rounded-t-rounded  border-slate-300 mt-4  ">
              <div className="w-full justify-between flex flex-row flex-nowrap  py-2 px-5 bg-primaryLight text-white h-14 items-center text-lg">
                <h3 className="w-1/4  font-semibold">S No.</h3>
                <h3 className="w-1/4  font-semibold">NAME</h3>
                <h3 className="w-1/4  font-semibold">HSN CODE</h3>
                <h3 className="w-1/4  font-semibold">PRICE(INR)</h3>

              </div>
              <div className="w-full border-t border-slate-300">
                {
                  data.products
                    .filter((customer) => {
                      return customer.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    })
                    .slice(indexOfFirstRecord, indexOfLastRecord)
                    .map((product, i) => {
                      return (
                        <ProductField
                          key={i}
                          index={i}
                          name={product.name}
                          hsncode={product.HSN_Code}
                          price={product.price}
                          currentPage={currentPage}
                        />
                      );
                    })
                }
              </div>
            </div>
            <div className="w-full flex border-x border-b py-2 rounded-b-rounded  justify-end">
              <div className="w-1/4 flex items-center justify-end text-right">
                <span className="text-lg">
                  {currentPage} of{" "}
                  {search
                    ? data.customers.filter((customer) => {
                      return customer.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    }).length
                      ? Math.ceil(
                        data.customers.filter((customer) => {
                          return customer.name
                            .toLowerCase()
                            .includes(search.toLowerCase());
                        }).length / recordsPerPage
                      )
                      : 1
                    : Math.ceil(data.customers.length / recordsPerPage)}
                </span>
                <button type="btn" onClick={goToPrevPage} className="w-fit">
                  <MdOutlineKeyboardArrowLeft
                    aria-disabled={currentPage === 1}
                    className={`aria-disabled:text-gray-400 h-fit text-4xl aria-disabled:hover:cursor-default font-bold text-`}
                  />
                </button>
                <button type="btn" className="w-fit" onClick={goToNextPage}>
                  <MdOutlineKeyboardArrowRight
                    aria-disabled={currentPage === nPages}
                    className={`aria-disabled:text-gray-400 aria-disabled:hover:cursor-default h-fit text-4xl font-bold text-`}
                  />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-1 flex-col justify-evenly items-center">
            <h2 className="text-xl text-center ">
              You don't have any customers. Click{" "}
              <span
                onClick={() =>
                  document.getElementById("my_modal_3").showModal()
                }
                // onClick={() => {
                //   setCreateOpen(true);
                // }}
                className="hover:underline hover:underline-offset-2 transition-all text-primaryLight hover:cursor-pointer"
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
    </div>
  );
};

export default PageWrapper(Products, "products");
