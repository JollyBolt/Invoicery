import React from "react";

function Loader() {
  return (
    <div className="w-full flex justify-center h-[600px] items-center bg-white">
      <img
        src="/src/assets/Loader.gif"
        alt="loader"
        className="w-24"
      />
    </div>
  );
}

export default Loader;
