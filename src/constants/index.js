import {MdDashboard} from '../assets/index'
import {FaBoxes} from '../assets/index'
import {FaUser} from '../assets/index'
import {FaHandHoldingDollar} from '../assets/index'
import {FaFileInvoiceDollar} from '../assets/index'

export const navLinks = [
    { name: "Dashboard", link: "/", icon: MdDashboard },
    { name: "Invoices", link: "/invoice", icon: FaFileInvoiceDollar },
    { name: "Products", link: "/products", icon: FaBoxes },
    { name: "Customers", link: "/customers", icon: FaHandHoldingDollar },
    { name: "Profile", link: "/profile", icon: FaUser },
]