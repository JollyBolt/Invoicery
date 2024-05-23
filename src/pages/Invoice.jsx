import PageWrapper from "../hoc/PageWrapper";
import Heading from "../components/Heading";
import { Link, useLocation } from "react-router-dom";
import CreateInvoice from "../components/Invoice/CreateInvoice";

const Invoice = () => {
  const location=useLocation()
  return (
    <div>
      <Heading name="Invoice" />
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to={"/invoice"} className={`${location.pathname==='/invoice'?'text-red-500 pointer-events-none no-underline':''}`}>
              Invoices
            </Link>
          </li>
          <li>
            <Link to={"/invoice/createInvoice"} className={`${location.pathname==='/invoice/createInvoice'?'text-red-500 pointer-events-none no-underline':''}`}>Create Invoice</Link>
          </li>
          {/* <li>Add Document</li> */}
        </ul>
        <CreateInvoice/>
      </div>
    </div>
  );
};

export default PageWrapper(Invoice, "invoice");
