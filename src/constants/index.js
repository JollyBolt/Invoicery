import { MdDashboard } from "../assets/index";
import { BsBoxSeamFill } from "../assets/index";
import { FaCircleUser } from "../assets/index";
import { BsPeopleFill } from "../assets/index";
import { FaFileInvoiceDollar } from "../assets/index";

export const navLinks = [
  { name: "Dashboard", link: "/", icon: MdDashboard },
  { name: "Invoices", link: "/invoice", icon: FaFileInvoiceDollar },
  { name: "Products", link: "/products", icon: BsBoxSeamFill },
  { name: "Customers", link: "/customers", icon: BsPeopleFill },
  { name: "Profile", link: "/profile", icon: FaCircleUser },
];
