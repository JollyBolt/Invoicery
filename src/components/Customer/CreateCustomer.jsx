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
      <div className="modal-box h-full w-full rounded-rounded pl-0">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-3 text-lg top-3">
            ✕
          </button>
        </form>
        {/* <h3 className="font-bold text-lg">Hello!</h3> */}
        <div className="flex flex-col flex-nowrap gap-y-2 w-full justify-evenly">
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">First Name</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">Last Name</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
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
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">Organization</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">GSTIN</p>
            <input
              type="text"
              className="w-1/2 p-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
            <p className="w-1/3 text-lg font-semibold  p-2">Street Address</p>
            <textarea
              type="text"
              rows={3}
              className="w-1/2 p-2  resize-none bg-transparent border-b border-gray-300 focus:outline-none focus:border-black  transition-colors duration-200"
            />
          </div>
          <div className="w-full flex flex-nowrap justify-center">
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
          </div>
          <div className="w-full flex justify-center">
            <button
              type="btn"
              className="btn bg-primary text-white w-fit text-lg rounded-rounded hover:text-primary hover:bg-white"
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
