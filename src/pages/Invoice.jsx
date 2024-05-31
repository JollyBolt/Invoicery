import PageWrapper from "../hoc/PageWrapper";
import Heading from "../components/Heading";
import { Outlet,useNavigate } from "react-router-dom";

const Invoice = () => {
  const navigate=useNavigate()
  return (
    <div>
      <Heading name="Invoice" />
      <div className="text-sm breadcrumbs">
        <button onClick={()=>navigate('./createInvoice')}>
          Create Invoice
        </button>
        <Outlet/>
      </div>
    </div>
  );
};

export default PageWrapper(Invoice, "invoice");
