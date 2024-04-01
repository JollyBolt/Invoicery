import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

const RootLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} navBg='primary' navHeading='secondary' />
      <div id="parent" className={`transition-all duration-500 ${open?`ml-[210px]`:`ml-[64px] `} `}
      >
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
