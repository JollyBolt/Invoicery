import React from "react";
import { Loader1 } from "../assets";
function Loader() {
  return (
    <div className={`w-full flex justify-center h-[600px] items-center `}>
      <img
        src={Loader1}
        alt="loader"
        className="w-24"
      />
    </div>
  );
}

export default Loader;
