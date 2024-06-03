import React from "react";

const ProductField = ({ index, name, hsncode, price, currentPage }) => {
  return (
    <div className={`h-14 overflow-hidden border-b`}>
      <div
        className={`flex h-full w-full flex-nowrap items-center justify-between border-x px-5 py-2 font-light`}
      >
        <h3 className="w-1/4 font-light capitalize">{index}</h3>
        <h3 className="w-1/4 font-light capitalize">{name}</h3>
        <h4 className="w-1/4">{hsncode}</h4>
        <h4 className="w-1/4">{price}</h4>
      </div>
    </div>
  );
};

export default ProductField;
