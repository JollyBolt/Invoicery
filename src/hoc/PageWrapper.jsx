import React from "react";

const PageWrapper = (Component, idName) =>
  function HOC(props) {
    return (
      <section id={idName} className="min-h-[100dvh] w-full px-5 py-5">
        <Component {...props} />
      </section>
    );
  };

export default PageWrapper;
