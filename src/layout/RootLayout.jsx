import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} navBg='foreground' navHeading='secondary' />
      <div id="parent" className={`transition-all bg-slate-100 duration-500 ml-[64px]  `}
      >
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
