import PageWrapper from "../hoc/PageWrapper";
import Heading from "../components/Heading";
import { FiPlusCircle } from "../assets/index";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "../assets/index";
import { HiMagnifyingGlass } from "../assets/index";
import { FaFilter } from "../assets/index";
import data from "../demoData.json";
import SingleCustomer from "../components/SingleCustomer";
import { useState } from "react";

const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(2);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.customers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const nPages = Math.ceil(data.customers.length / recordsPerPage);
  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Heading name="Customers" />
      <div className="flex flex-nowrap justify-between flex-row w-full rounded-t-sm mt-3">
        <div className="rounded-sm w-1/2 pl-2 border border-neutral-400">
          <div className="flex flex-nowrap w-full justfy-betweem items-center h-fit">
            <HiMagnifyingGlass className="inline w-14 h-fit  pr-2" />
            <input
              type="text"
              name="search"
              placeholder="Search Customers"
              id="searchCustom"
              className="inline text-black  py-0 outline-none active:outline-none w-full"
            />
            <button className="btn btn-active bg-secondary rounded-none font-serif  text-lg border-none h-full text-white   w-1/4">
              Search
            </button>
          </div>
        </div>

        <div>
          <button
            type="btn"
            className="mx-5 transition-colors px-4 h-full bg-white border hover:bg-gray-200 border-black rounded-sm"
          >
            <FaFilter className="inline-block text-lg" />
            <span> Filter</span>
          </button>

          <button
            type="button"
            className="w-fit h-full btn btn-active rounded-sm bg-green-600 hover:bg-green-700 text-white px-4 font-sans"
          >
            <span className="text-lg">Create </span>
            <FiPlusCircle className="inline h-full text-2xl w-7" />
          </button>
        </div>
      </div>

      <div className="w-full mx-auto flex flex-col overflow-y-scroll   border-x rounded-sm border-x-solid  mt-4  ">
        <div className="w-full justify-between flex flex-row flex-nowrap py-2 bg-primary text-white">
          <h3 className="w-4/12 pl-20 font-semibold">Name</h3>
          <h3 className="w-4/12 pl-20 font-semibold">Email</h3>
          <h3 className="w-2/12 text-center font-semibold">Invoices</h3>
          <div className="w-1/12 font-semibold">&nbsp;</div>
        </div>
        {currentRecords.map((customer, i) => {
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
      <div className="w-full flex border-x  border  py-2 rounded-b-sm border-slate-300 justify-end">
        <div className="w-1/4 flex items-center justify-end text-right">
          <span className="text-lg">
            {currentPage} of {nPages}
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
  );
};

export default PageWrapper(Customers, "customers");
