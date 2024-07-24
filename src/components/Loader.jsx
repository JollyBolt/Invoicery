import React from "react";
import { Loader1,PageLoader } from "../assets";
function Loader({ height = "600px",customStyle }) {
  return (
    <div
      className={`flex w-full items-center justify-center ${customStyle}`}
      style={{ height: height }}
    >
      {/* <img src={Loader1} alt="loader" className="w-24" /> */}
       <img src={PageLoader} alt="loader" className="w-24" />
    </div>
  )
}

export default Loader;
