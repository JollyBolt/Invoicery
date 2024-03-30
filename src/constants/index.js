import { MdDashboard } from "react-icons/md";
import { FaBoxes } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaFileInvoiceDollar } from "react-icons/fa";

export const navLinks = [
    { name: "Dashboard", link: "/", icon: MdDashboard },
    { name: "Invoices", link: "/invoice", icon: FaFileInvoiceDollar },
    { name: "Products", link: "/products", icon: FaBoxes },
    { name: "Customers", link: "/customers", icon: FaHandHoldingDollar },
    { name: "Profile", link: "/profile", icon: FaUser },
]