import React, { useEffect } from "react";
import { useState } from "react";

import { BsThreeDotsVertical } from "../../assets/index";
function SingleCustomer({
  name,
  email,
  no_of_invoices,
  address,
  state,
  zip,
  contact,
  city,
  gstin,
  currentPage,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [currentPage]);

  return (
    <div
      onClick={(e) => {
        setOpen(!open);
      }}
      className={`transition-[height] duration-500 ease-out hover:cursor-pointer hover:bg-gray-100 ${
        open ? "h-48" : "h-14"
      } overflow-hidden border-b border-slate-400`}
    >
      <div
        className={`flex w-full flex-nowrap items-center justify-between px-2 py-2`}
      >
        <div className="w-4/12">
          <h3 className="inline pl-10 text-lg font-semibold">{name}</h3>
        </div>
        <h4 className="text-md w-4/12">{email}</h4>
        <h4 className="text-md w-2/12 text-center">{no_of_invoices}</h4>
        <button
          type="btn"
          className={`h-fit w-1/12 p-2`}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <BsThreeDotsVertical
            className={`text-right text-xl transition-all duration-300 ${
              open && "rotate-180"
            }`}
          />
        </button>
      </div>

      <div className="mx-auto flex w-full flex-wrap justify-evenly">
        <div className="w-1/3 pl-5">
          <span className="font-semibold">GSTIN: </span>
          <span>{gstin}</span>
        </div>

        <div className="w-1/3 pl-5">
          <span className="font-semibold">Contact: </span>
          <span>{contact}</span>
        </div>

        <div className="w-1/3 pl-5">
          <span className="font-semibold">Address: </span>
          <span>{address}</span>
        </div>

        <div className="w-1/3 pl-5">
          <span className="font-semibold">City: </span>
          <span>{city}</span>
        </div>

        <div className="w-1/3 pl-5">
          <span className="font-semibold">State: </span>
          <span>{state}</span>
        </div>

        <div className="w-1/3 pl-5">
          <span className="font-semibold">ZIP: </span>
          <span>{zip}</span>
        </div>
      </div>
      <div className="flex w-full flex-nowrap justify-end">
        <div className="flex w-1/3 items-center justify-end pr-10">
          <button
            type="button"
            className="rounded-rounded p-2 text-secondary outline outline-1 outline-secondary transition-colors hover:bg-secondary hover:text-white"
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleCustomer;
