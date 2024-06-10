import React from "react";

export default function CreateCustomer() {
  return (
    <dialog id="my_modal_3" className="modal h-full w-full">
      <div className="modal-box mx-auto h-fit w-2/3 max-w-none rounded-rounded pb-0">
        <div className="mx-auto mb-2 flex w-full flex-nowrap justify-between">
          <h3 className="font-sans text-3xl font-extrabold">Add a Customer</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm text-lg">
              ✕
            </button>
          </form>
        </div>
        <hr />
        <div className="mt-4 space-y-4">
          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-semibold">Personal Details</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium">First Name</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">Last Name</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">Email Address</label>
                <input type="email" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">Contact No.</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
            </div>
          </div>
          <hr />
          {/* Organization Details */}
          <div>
            <h3 className="text-xl font-semibold">Organization Details</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium">Organization Name</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">GSTIN</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
            </div>
          </div>
          <hr />
          {/* Billing Address */}
          <div>
            <h3 className="text-xl font-semibold">Billing Address</h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block font-medium">Street Address</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">City</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">State Code</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">State</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
              <div>
                <label className="block font-medium">ZIP</label>
                <input type="text" className="w-full rounded-md border p-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 mt-2 flex w-full justify-end gap-x-2">
          <form method="dialog">
            <button className="text-md btn h-fit w-fit rounded-rounded border-none bg-transparent text-black shadow-none hover:border-none hover:bg-slate-300">
              Cancel
            </button>
          </form>
          <button
            type="btn"
            className="text-md btn h-fit w-fit rounded-rounded bg-primary text-white hover:border-primary hover:bg-white hover:text-primary"
          >
            SAVE
          </button>
        </div>
      </div>
    </dialog>
  );
}
