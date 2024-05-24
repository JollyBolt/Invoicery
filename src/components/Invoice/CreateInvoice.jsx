import React, { useState } from "react";
import MultiStepForm from "./MultiStepForm";

function CreateInvoice() {
  const [formData, setFormData] = useState({ name: "" });
  return (
    <>
      <div className="flex flex-nowrap justify-between
      ">
        <div className="w-1/3 pl-5">
          {/* <input className="border border-gray-500 focus:outline-none pl-2 py-1"
            type="text"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          /> */}
          <MultiStepForm/>
        </div>
        {/* <div className="relative w-1/2">
            <div className="sticky top-0 left-0 w-full">
          <input className="border border-gray-500 pl-2 py-1 focus:outline-none" type="text" value={formData.name} disabled/>
            </div>
        </div> */}
      </div>
    </>
  );
}

export default CreateInvoice;
