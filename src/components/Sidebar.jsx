import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
// import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar({open,setOpen}) {
  const location = useLocation();
  const navigate = useNavigate();
  const menus = [
    { name: "Dashboard", link: "/", icon: MdDashboard },
    { name: "Invoices", link: "/invoice", icon: FaFileInvoiceDollar },
    { name: "Products", link: "/products", icon: FaBoxes },
    { name: "Customers", link: "/customers", icon: FaHandHoldingDollar },
    { name: "Profile", link: "/profile", icon: FaUser },
  ];


  return (
    <div
    // className={`${[location.pathname==='/'?'hidden':'']}`}
    >
      <Link
        onClick={() => {
          localStorage.removeItem("loggedIn");
          navigate("/");
        }}
        to={"/"}
        className="bg-white fixed right-5 top-7 outline outline-1 w-[70px] px-1 hover:text-white hover:bg-red-500 text-center outline-red-500 text-red-500 rounded-sm  "
      >
        Logout
      </Link>
      <nav id="nav" className="top-0  fixed  z-10">
        <div
          className={`bg-[#0e0e0e] min-h-screen ${
            open ? "w-72" : "w-16"
          } duration-500 ${
            open && "delay-[30ms]"
          } transition-all text-gray-100 px-4`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>

          <div className="mt-4 flex flex-col gap-4 relative">
            <div className="overflow-hidden text-nowrap">
              <img
                src={"/logo.png"}
                width={40}
                height={40}
                alt="Logo"
                className="inline"
              />
              <h2
                style={{
                  transitionDelay: `${2}00ms`,
                }}
                className={`whitespace-pre duration-500 text-transparent font-semibold text-lg bg-clip-text bg-gradient-to-br from-indigo-800 to-teal-400 inline ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                Invoicery
              </h2>
            </div>
            {menus?.map((menu, i) => (
              <Link
                to={menu?.link}
                key={i}
                className={` ${
                  menu?.margin && "mt-5"
                } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
              >
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <h2
                  style={{
                    transitionDelay: `${i + 3}00ms`,
                  }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  {menu?.name}
                </h2>
                <h2
                  className={`${
                    open && "hidden"
                  } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                >
                  {menu?.name}
                </h2>
              </Link>
            ))}
            {/* {open ? (
            
            ) : (
              <button type="button" className=" flex items-center justify-center bg-white text-red-500 w-[25px] outlin text-lg text-center mx-auto p-1 rounded-sm hover:text-white hover:bg-red-500 outline outline-1 outline-red-500">
              <IoPowerOutline />
              </button>
            )} */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
