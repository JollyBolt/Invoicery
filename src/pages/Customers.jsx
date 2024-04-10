import PageWrapper from "../hoc/PageWrapper";
import Heading from "../components/Heading";
import { FaPlus } from "../assets/index";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "../assets/index";
import { HiMagnifyingGlass } from "../assets/index";
import { FaFilter } from "../assets/index";
import { RxCross1 } from "../assets/index";

import data from "../demoData.json";
import SingleCustomer from "../components/SingleCustomer";
import { useEffect, useState } from "react";

const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // let currentRecords = data.customers.slice(
  //   indexOfFirstRecord,
  //   indexOfLastRecord
  // );

  const [nPages,setNPages] = useState(Math.ceil(data.customers.length / recordsPerPage))

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  const [search, setSearch] = useState("");

  useEffect(()=>{
    setCurrentPage(1);
    if (search){

      setNPages(data.customers
        .filter((customer) => {
          return (customer.name
            .toLowerCase()
            .includes(search.toLowerCase()))
          }).length ? Math.ceil(data.customers
            .filter((customer) => {
              return customer.name
              .toLowerCase()
              .includes(search.toLowerCase())
            }).length / recordsPerPage) : 1)
          }else{
            setNPages(Math.ceil(data.customers.length / recordsPerPage))
          }
  },[search])

  return (
    <div>
      <Heading name="Customers" />

      <div className="bg-foreground p-5 rounded-rounded mt-5 ">
        <div className="flex flex-nowrap  justify-between flex-row w-full rounded-t-sm">
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
                placeholder="Search Customers"
                id="searchCustom"
                className="inline text-black bg-transparent  py-0 outline-none active:outline-none w-full"
              />
              {search && (
                <button
                  type="btn"
                  className="w-fit h-fit"
                  onClick={() => {
                    document.getElementById("searchCustom").value = "";
                    setSearch("");
                  }}
                >
                  <RxCross1 className="text-lg text-red-400" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-nowrap items-center justify-between">
            <button
              type="btn"
              className="mx-5 transition-colors px-4 h-full bg-slate-200 hover:bg-gray-300 rounded-rounded"
            >
              <FaFilter className="inline-block text-lg" />
              <span> Filter</span>
            </button>

            <button
              type="button"
              className="w-fit  transition-colors p-2 bg-primaryLight hover:bg-primary rounded-full"
            >
              <FaPlus className="inline text-white text-2xl " />
            </button>
          </div>
        </div>

        <div className="w-full mx-auto flex flex-col overflow-y-scroll border-x border-t rounded-t-rounded border-solid border-slate-300 mt-4  ">
          <div className="w-full justify-between flex flex-row flex-nowrap py-2  ">
            <h3 className="w-4/12 pl-20 font-semibold">Name</h3>
            <h3 className="w-4/12 pl-20 font-semibold">Email</h3>
            <h3 className="w-2/12 text-center font-semibold">Invoices</h3>
            <div className="w-1/12 font-semibold">&nbsp;</div>
          </div>
          <div className="w-full border-t  border-slate-300">
            {search
              ?  data.customers
                  .filter((customer) => {
                    return customer.name
                      .toLowerCase()
                      .includes(search.toLowerCase());
                  })
                  .slice(indexOfFirstRecord, indexOfLastRecord)
                  .map((customer, i) => {
                    return (
                      <SingleCustomer
                        key={i}
                        name={customer.name}
                        email={customer.email}
                        no_of_invoices={customer.no_of_invoices}
                        gstin={customer.gstin}
                        address={customer.address}
                        state={customer.state}
                        zip={customer.zip}
                        contact={customer.contact}
                        city={customer.city}
                        currentPage={currentPage}
                      />
                    );
                  })
               : data.customers
                  .slice(indexOfFirstRecord, indexOfLastRecord)
                  .map((customer, i) => {
                    return (
                      <SingleCustomer
                        key={i}
                        name={customer.name}
                        email={customer.email}
                        no_of_invoices={customer.no_of_invoices}
                        gstin={customer.gstin}
                        address={customer.address}
                        state={customer.state}
                        zip={customer.zip}
                        contact={customer.contact}
                        city={customer.city}
                        currentPage={currentPage}
                      />
                    );
                  })}
          </div>
        </div>

        <div className="w-full flex border-x   border-b py-2 rounded-b-rounded border-slate-300 justify-end">
          <div className="w-1/4 flex items-center justify-end text-right">
            <span className="text-lg">
              {currentPage} of {search ? data.customers
        .filter((customer) => {
          return (customer.name
            .toLowerCase()
            .includes(search.toLowerCase()))
          }).length ? Math.ceil(data.customers
            .filter((customer) => {
              return customer.name
              .toLowerCase()
              .includes(search.toLowerCase())
            }).length / recordsPerPage) : 1:Math.ceil(data.customers.length / recordsPerPage)}
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
      </div>
    </div>
  );
};

export default PageWrapper(Customers, "customers");
