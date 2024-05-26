import React from "react";

export default function CreateCustomer() {
  return (
    <dialog id="my_modal_3" className="modal h-full w-full">
      <div className="modal-box h-fit w-2/3 max-w-none pb-0 rounded-rounded  mx-auto">
        <div className="flex w-full flex-nowrap justify-between mx-auto mb-2">
          <h3 className="font-extrabold text-3xl font-sans">Add a Customer</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost  text-lg ">
              ✕
            </button>
          </form>
        </div>
      <hr />
      <div className="space-y-4 mt-4">
        {/* Personal Details */}
        <div>
          <h3 className="text-xl font-semibold">Personal Details</h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="block font-medium">First Name</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">Last Name</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">Email Address</label>
              <input type="email" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">Contact No.</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
          </div>
        </div>
            <hr />
        {/* Organization Details */}
        <div>
          <h3 className="text-xl font-semibold">Organization Details</h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="block font-medium">Organization Name</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">GSTIN</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
          </div>
        </div>
            <hr />
        {/* Billing Address */}
        <div>
          <h3 className="text-xl font-semibold">Billing Address</h3>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="col-span-2">
              <label className="block font-medium">Street Address</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">City</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">State Code</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">State</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
            <div>
              <label className="block font-medium">ZIP</label>
              <input type="text" className="w-full border rounded-md p-2" />
            </div>
          </div>
        </div>
      </div>
          <div className="w-full flex gap-x-2 justify-end mt-2 mb-3">
            <form className="dialog">
              <button
                type="btn"
                className="btn bg-transparent w-fit h-fit text-md shadow-none rounded-rounded border-none text-black hover:border-none hover:bg-slate-300"
              >
                Cancel
              </button>
            </form>
            <button
              type="btn"
              className="btn bg-primary text-white h-fit w-fit text-md rounded-rounded hover:border-primary hover:text-primary hover:bg-white"
            >
              SAVE
            </button>
          </div>
        </div>
    </dialog>
  );
}
