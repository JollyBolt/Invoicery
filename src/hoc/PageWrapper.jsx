import React from "react";
import Breadcrumb from "../components/Breadcrumb"
const PageWrapper = (Component, idName) =>
  function HOC(props) {
    return (
      <section id={idName} className="min-h-[100dvh] w-full px-5 py-5">
        <Breadcrumb />
        <Component {...props} />
      </section>
    )
  };

export default PageWrapper;
