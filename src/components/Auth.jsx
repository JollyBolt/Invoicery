import React from "react";

function Auth() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-semibold text-black">
        Sign in now to access all features!
      </h1>
      <button className="rounded-rounded bg-primary px-2 py-1 text-lg font-semibold text-white">
        Sign In
      </button>
    </div>
  );
}

export default Auth;
