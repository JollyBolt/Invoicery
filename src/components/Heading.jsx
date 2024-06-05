import React from "react";
import Breadcrumb from "./Breadcrumb";

/**
 * Heading component to display a page title and breadcrumb.
 *
 * @param {Object} props - The component props.
 * @param {string} props.name - The name of the page.
 *
 * @returns {JSX.Element} - The Heading component.
 */
const Heading = ({ name }) => {
  return (
    <div>
      <p className="text-4xl font-black uppercase text-primary first-letter:text-5xl">
        {name}
      </p>
      <Breadcrumb />
    </div>
  );
};


export default Heading;

