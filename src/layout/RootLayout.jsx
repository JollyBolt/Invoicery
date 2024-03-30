import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const RootLayout = () => {
  const [open, setOpen] = useState(false);
  // const [navWidth, setNavWidth] = useState(open ? 210 : 64);

  // useEffect(() => {
  //   setNavWidth(open ? 210 : 64);
  //   document.getElementById("parent").style.width =
  //     window.innerWidth - navWidth;
  //   document.getElementById("parent").style.marginLeft = navWidth;
  // }, [open]);
  return (
    <>
      <Sidebar open={open} setOpen={setOpen} navBg='primary' navHeading='secondary' />
      <div id="parent" className={`transition-all pl-3 duration-500 ${open?`ml-[210px]`:`ml-[64px] `} bg-secondary`}
        // style={{ width: document.innerWidth - navWidth, marginLeft: navWidth }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
