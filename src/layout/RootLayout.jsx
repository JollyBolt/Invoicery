import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";

const RootLayout = () => {
  const [open, setOpen] = useState(false);
  const [navWidth, setNavWidth] = useState(open ? 256 : 64);

  useEffect(() => {
    setNavWidth(open ? 256 : 64);
    document.getElementById("parent").style.width =
      window.innerWidth - navWidth;
    document.getElementById("parent").style.marginLeft = navWidth;
  }, [open]);
  return (
    <>
      <Sidebar open={open} setOpen={setOpen} navBg='primary' navHeading='secondary' />
      <div id="parent" className='transition-all pl-3 duration-500 '
        style={{ width: document.innerWidth - navWidth, marginLeft: navWidth }}
      >
        RootLayout
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
