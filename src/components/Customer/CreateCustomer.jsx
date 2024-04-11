import React from "react";

function CreateCustomer({ open, setOpen }) {
  return (
    <div className="p-5 absolute inset-0 ml-[64px] h-screen backdrop-blur-sm bg-gray-600/50 ">
      <div className="flex w-2/3 justify-center mx-auto items-center h-full bg-primaryLight outline-white rounded-rounded outline">
        <form className="w-full flex flex-col gap-y-3 items-center">
          <div className="flex flex-row flex-nowrap w-full justify-evenly">
            <div className={`flex flex-row flex-nowrap p-2 rounded-rounded placeholder:text-gray-400 border  border-gray-400 bg-transparent text-white`}>
                <label htmlFor="custFirstName" className="pr-2 font-semibold text-gray-400">First Name</label>
            <input id="custFirstName"
              type="text"
              className="focus:outline-none bg-transparent"
              />
              </div>
              
              <input id="custLastName"
              type="text"
              className="w-1/3 p-2 rounded-rounded focus:outline-none placeholder:text-gray-400 border  border-gray-500 focus:border-white transition-colors duration-300 bg-transparent text-white"
              placeholder="Last Name"
            />
          </div>
          <input type="submit" value="CREATE CUSTOMER" className="btn bg-primary text-white w-fit text-lg rounded-rounded hover:text-primary hover:bg-white"/>
        </form>
      </div>
    </div>
  );
}

export default CreateCustomer;
