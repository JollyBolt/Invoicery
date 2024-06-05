import PageWrapper from "../hoc/PageWrapper";
import Heading from "../components/Heading";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authSlice } from "../redux/slices/authSlice";

const Invoice = () => {
  const navigate = useNavigate();

   //Checking if authtoken exists, i.e., logged in on refresh
   const { refreshAuth } = authSlice.actions;
   const dispatch = useDispatch();
   const { loggedIn, loading } = useSelector((state) => state.auth);
   useEffect(() => {
     dispatch(refreshAuth());
   }, []);
  return (
    <div>
      <Heading name="Invoice" />
      <div className="breadcrumbs text-sm">
        <button onClick={() => navigate("./createInvoice")}>
          Create Invoice
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default PageWrapper(Invoice, "invoice");
