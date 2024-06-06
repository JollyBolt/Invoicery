import React from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * A functional component that renders breadcrumb navigation based on the current route.
 * @returns {JSX.Element} - The JSX for the breadcrumb navigation.
 */
const Breadcrumb = () => {
  /**
   * Get the current location's pathname.
   */
  const { pathname } = useLocation();

  /**
   * Split the pathname into an array of path segments, excluding empty segments.
   * @type {string[]}
   */
  const path = pathname.split("/").filter((pathname) => pathname);

  /**
   * Initialize a string to store the current breadcrumb path.
   * @type {string}
   */
  let breadcrumbPath = "";

  return (
    <div className="">
      {
        // Render the Dashboard link if there are path segments.
        path.length > 0 && (
          <Link to="/" className="capitalize text-black hover:underline">
            Dashboard
          </Link>
        )
      }
      {
        // Map through the path segments to render the breadcrumb links.
        path.map((name, index) => {
          // Update the breadcrumb path.
          breadcrumbPath += `/${name}`;
          return (
            // Render the last breadcrumb segment without a link.
            index === path.length - 1 ? (
              <span>
                &nbsp; {">"}&nbsp;
                <span key={index} className="capitalize text-gray-500">
                  {name}
                </span>
              </span>
            ) : (
              // Render the other breadcrumb segments with a link.
              <span key={index} className="">
                &nbsp;{">"}{" "}
                <Link
                  to={breadcrumbPath}
                  className="capitalize text-black hover:underline"
                >
                  {name}
                </Link>
              </span>
            )
          );
        })
      }
    </div>
  );
};

export default Breadcrumb;
