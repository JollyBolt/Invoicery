import React, { useEffect } from "react";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

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
  currentPage
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
setOpen(false)
  },[currentPage])
  
  return (
    <div
      onClick={(e) => {
        setOpen(!open);
      }}
      className={`transition-[height] hover:bg-gray-100 ease-out hover:cursor-pointer duration-500 ${
        open ? "h-48" : "h-14"
      } overflow-hidden border-slate-400 border-b`}
    >
      <div className={`w-full flex flex-nowrap items-center justify-between py-2 px-2 `}>
        <div className="w-4/12">
          <h3 className="text-lg pl-10 inline  font-semibold ">{name}</h3>
        </div>
        <h4 className="text-md  w-4/12">{email}</h4>
        <h4 className="text-md text-center w-2/12">{no_of_invoices}</h4>
        <button
          type="btn"
          className={`h-fit p-2  w-1/12 `}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <FaAngleDown
            className={`text-xl text-right transition-all duration-300 ${
              open && "rotate-180"
            }`}
          />
        </button>
      </div>

      <div className="w-full mx-auto flex flex-wrap justify-evenly">
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
      <div className="w-full flex justify-end flex-nowrap">
<div className="w-1/3 flex justify-end items-center pr-10">
<button type="button" className=" outline-1 outline p-2 outline-secondary hover:text-white  hover:bg-secondary transition-colors text-secondary rounded-rounded">Create Invoice</button>
</div>
      </div>
      </div>

  );
}

export default SingleCustomer;
