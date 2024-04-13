import React from "react";

// function CreateCustomer({ open, setOpen }) {
//   return (
//     <div className="p-5 absolute inset-0 ml-[64px] h-screen backdrop-blur-sm bg-gray-600/50 ">
//       <div className="flex w-2/3 justify-center mx-auto items-center h-full bg-primaryLight outline-white rounded-rounded outline">
//         <form className="w-full flex flex-col gap-y-3 items-center">
//           <div className="flex flex-row flex-nowrap w-full justify-evenly">
//             <div className="w-full flex flex-nowrap justify-center">
//                 <p className="w-1/3 text-lg font-semibold text-white p-2">First Name</p>
//                 <input type="text" className="w-1/2 p-2 bg-transparent border-b border-gray-400 focus:outline-none focus:border-white text-white transition-colors duration-200"/>
//             </div>
//             {/* <div className={`flex flex-row flex-nowrap p-2 rounded-rounded placeholder:text-gray-400 border  border-gray-400 bg-transparent text-white`}>
//                 <label htmlFor="custFirstName" className="pr-2 font-semibold text-gray-400">First Name</label>
//             <input id="custFirstName"
//               type="text"
//               className="focus:outline-none bg-transparent"
//               />
//               </div>

//               <input id="custLastName"
//               type="text"
//               className="w-1/3 p-2 rounded-rounded focus:outline-none placeholder:text-gray-400 border  border-gray-500 focus:border-white transition-colors duration-300 bg-transparent text-white"
//               placeholder="Last Name"
//             /> */}
//           </div>
//           <input type="submit" value="CREATE CUSTOMER" className="btn bg-primary text-white w-fit text-lg rounded-rounded hover:text-primary hover:bg-white"/>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateCustomer;

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

        <div className="flex flex-col flex-nowrap gap-y-2 w-full px-2 justify-evenly">
          <h3>Personal Details</h3>
          <div className="flex flex-nowrap w-full justify-between ">
            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  p-2">First Name</p>
              <input
                type="text"
                className="w-2/3 p-2 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
              />
            </div>

            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  py-2 text-center">Last Name</p>
              <input
                type="text"
                className="w-2/3 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex flex-nowrap w-full justify-between">
            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  p-2">Email Address</p>
              <input
                type="text"
                className="w-2/3 p-2 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
              />
            </div>

            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  py-2 text-center">Contact No.</p>
              <input
                type="text"
                className="w-2/3 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black text-sm transition-colors duration-200"
              />
            </div>
          </div>

          {/* <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">Email Address</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">Contact No.</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div> */}
          <h3 className="mt-5">
            Organization Details
          </h3>
 <div className="flex flex-nowrap w-full justify-betweem">
            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  p-2">Oganization</p>
              <input
                type="text"
                className="w-2/3 p-2 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
              />
            </div>

            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  py-2 text-center">GSTIN</p>
              <input
                type="text"
                className="w-2/3 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black text-sm transition-colors duration-200"
              />
            </div>
          </div>


          <h3 className="mt-5">Billing Address</h3>

          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/4 text-md font-semibold  p-2">Street Address</p>
            <textarea
              type="text"
              rows={1}
              className="w-full p-2  resize-none bg-transparent border-b border-gray-300 focus:outline-none focus:border-black text-sm transition-colors duration-200"
            />
          </div>

          <div className="flex flex-nowrap w-full justify-between">
            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  p-2">City</p>
              <input
                type="text"
                className="w-2/3 p-2 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
              />
            </div>

            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  py-2 text-center">State</p>
              <input
                type="text"
                className="w-2/3 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black text-sm transition-colors duration-200"
              />
            </div>
          </div>

          <div className="flex flex-nowrap w-full justify-between">
            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  p-2">State Code</p>
              <input
                type="text"
                className="w-2/3 p-2 text-sm bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
              />
            </div>

            <div className="w-1/2 flex flex-nowrap justify-center">
              <p className="w-1/3 text-md font-semibold  py-2 text-center">ZIP</p>
              <input
                type="text"
                className="w-2/3 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black text-sm transition-colors duration-200"
              />
            </div>
          </div>

          {/* <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">City</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">State</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">State Code</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">ZIP</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div> */}


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
              CREATE CUSTOMER
            </button>
          </div>
        </div>
        {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
      </div>
    </dialog>
  );
}
