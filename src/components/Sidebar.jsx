import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { HiMenuAlt2 } from "../assets/index";
import { navLinks } from "../constants";
import { useNavigate } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import data from "../demoData.json";

function Sidebar({ open, setOpen, navBg, navHeading }) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <nav id="nav" className="fixed top-0 z-10">
        <div
          style={{ backgroundColor: `var(--${navBg})` }}
          className={`flex h-screen flex-col justify-between pb-5 shadow-lg shadow-slate-300 ${
            open ? "w-[210px]" : "w-[64px]"
          } text-black transition-all delay-[25ms] duration-500 ${
            open ? "pl-4 pr-2" : "px-4"
          }`}
        >
          <div>
            <div className={`flex py-3 pl-[5px]`}>
              <HiMenuAlt2
                size={24}
                className="cursor-pointer"
                onClick={() => setOpen(!open)}
              />
            </div>
            <div className="relative mt-4 flex flex-col justify-between gap-4">
              <div className="overflow-hidden text-nowrap">
                {/* <img
                  src={"/logo.png"}
                  width={40}
                  height={40}
                  alt="Logo"
                  className="inline"
                /> */}
                <h2
                  style={{
                    transitionDelay: `${2}00ms`,
                    color: `var(--${navHeading})`,
                  }}
                  className={`inline whitespace-pre text-xl font-black uppercase text-transparent duration-500 ${
                    !open && "translate-x-28 overflow-hidden opacity-0"
                  }`}
                >
                  Invoicery
                </h2>
              </div>

              <div className="flex flex-col justify-between gap-y-4 overflow-hidden">
                {navLinks?.map((menu, i) => (
                  <Link
                    to={menu?.link}
                    key={i}
                    className={` ${
                      menu?.margin && "mt-5"
                    } group flex items-center gap-3.5 rounded-md py-2 pl-1 text-sm font-medium text-black hover:bg-primary hover:text-white`}
                  >
                    <div>{React.createElement(menu?.icon, { size: "24" })}</div>
                    <h2
                      className={`text-md overflow-hidden whitespace-pre text-black [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s] group-hover:text-white ${
                        open ? "translate-x-0 opacity-100" : "translate-x-24"
                      }`}
                    >
                      {menu?.name}
                    </h2>

                    <h2
                      className={`${
                        open && "hidden"
                      } absolute left-20 w-0 overflow-hidden whitespace-pre rounded-md bg-white px-0 py-0 font-semibold text-gray-900 drop-shadow-lg group-hover:left-14 group-hover:w-fit group-hover:px-2 group-hover:py-1 group-hover:duration-300`}
                    >
                      {menu?.name}
                    </h2>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 overflow-hidden border-t border-gray-500 pt-2">
            <Link
              onClick={() => {
                // localStorage.removeItem("loggedIn");
                document.cookie = "authToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                // navigate("/");
                window.location.reload()
              }}
              to={"/"}
              className={`text-red-500 transition-[border-radius] hover:bg-red-500 hover:text-white ${
                open ? "rounded-rounded delay-0" : "rounded-[50%] delay-300"
              } duration-400 group flex items-center gap-3.5 py-1 pl-1 text-sm font-medium ease-linear`}
            >
              <div>{React.createElement(IoPowerOutline, { size: "24" })}</div>
              <h2
                className={`text-md overflow-hidden whitespace-pre [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s] ${
                  open ? "translate-x-0 opacity-100" : "translate-x-24"
                }`}
              >
                Logout
              </h2>
            </Link>

            {/* <div className="flex  overflow-hidden ">
              <div className="flex items-center py-[1px] w-full text-black  rounded-rounded ">
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
              <div className={`flex flex-col flex-nowrap [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s]  overflow-hidden  ${
                  open? "opacity-100 translate-x-0  ":"translate-x-24"
                }`} >
                <h3 className="text-lg leading-none font-semibold ">
                  {data.name}
                </h3>
                <p className="text-xs ">{data.email}</p>
              </div>
            </div> */}
            <div
              className={`group flex items-center gap-3.5 rounded-md py-2 pl-1 text-sm font-medium text-black`}
            >
              <div className="flex flex-row flex-nowrap">
                {data.name.split(" ").map(function (word, i) {
                  return (
                    <span key={i} className="inline-block text-lg">
                      {word[0]}
                    </span>
                  );
                })}
              </div>
              <div
                className={`text-blac text-md flex flex-col overflow-hidden whitespace-pre [transition:transform_.3s_cubic-bezier(0.4,0,0.2,1),color_0s] ${
                  open ? "translate-x-0 opacity-100" : "translate-x-24"
                }`}
              >
                <h3 className="text-lg font-semibold leading-none">
                  {data.name}
                </h3>
                <p className="text-[10px]">{data.email}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
