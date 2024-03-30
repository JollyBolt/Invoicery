import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
// import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import data from "../demoData.json";

function Sidebar({ open, setOpen, navBg, navHeading }) {
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
      <nav id="nav" className="top-0  fixed  z-10">
        <div
          style={{ backgroundColor: `var(--${navBg})` }}
          className={`flex flex-col justify-between pb-5 min-h-screen ${
            open ? "w-64" : "w-16"
          } duration-500 ${
            open && "delay-[25ms]"
          } transition-all text-gray-100 px-4`}
        >
          <div>
            <div className={`py-3 flex pl-[5px]`}>
              <HiMenuAlt2
                size={24}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>

            <div className="mt-4 flex flex-col gap-4 justify-between relative">
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
                    color: `var(--${navHeading})`,
                  }}
                  className={`whitespace-pre duration-500 text-transparent font-semibold text-lg  inline ${
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
                  } group flex items-center text-sm  gap-3.5 font-medium py-2 pl-1 hover:bg-neutral-600/30  rounded-md`}
                >
                  <div>{React.createElement(menu?.icon, { size: "24" })}</div>
                  <h2
                    style={{
                      transitionDelay: `${i + 3}50ms`,
                    }}
                    className={`whitespace-pre text-md duration-300 ${
                      !open && "opacity-0 translate-x-24 overflow-hidden"
                    }`}
                  >
                    {menu?.name}
                  </h2>

                  <h2
                    className={`${
                      open && "hidden"
                    } absolute left-20 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                  >
                    {menu?.name}
                  </h2>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-4 pt-5 border-t border-gray-500">
            <Link
              onClick={() => {
                localStorage.removeItem("loggedIn");
                navigate("/");
              }}
              to={"/"}
              className={`bg-white  overflow-hidden flex flex-nowrap  py-1 px-1 hover:text-white hover:bg-red-500 ${
                open ? "rounded-sm delay-0" : "rounded-[50%] delay-200"
              } transition-[border-radius] duration-400 ease-linear text-red-500  `}
            >
              <IoPowerOutline
                size={24}
                className={`inline absolute rounded-full`}
              />
              <span
                className={`inline-block mx-auto overflow-hidden  pl-7 ${
                  !open && "opacity-0 transition-opacity"
                }`}
              >
                Logout
              </span>
            </Link>
            <div className="flex flex-row overflow-hidden">
              <div className="absolute flex justify-center items-center py-[1px] w-8 bg-secondary text-black  mx-auto rounded-sm border-2 border-neutral-400 border-solid">
                <div>
                  {data.name.split(" ").map(function (word, i) {
                    return (
                      <span key={i} className="inline-block text-lg">
                        {word[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col flex-nowrap ml-14">
                <h3 className="text-lg leading-none font-semibold text-white">
                  {data.name}
                </h3>
                <p className="text-xs text-white">{data.email}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
