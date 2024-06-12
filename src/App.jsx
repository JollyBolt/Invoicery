import { Route, Routes } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import InvoiceTable from "./pages/Invoice/InvoiceTable"
import Profile from "./pages/Profile"
import CreateInvoice from "./components/Invoice/CreateInvoice"
import InvoiceLayout from "./layout/InvoiceLayout"
import Signup from './pages/Auth/Signup';
import EditInvoice from "./pages/Invoice/EditInvoice"
import ViewInvoice from "./pages/Invoice/ViewInvoice"
import CustomerLayout from "./layout/CustomerLayout"
import CustomerDetail from "./pages/Customer/CustomerDetail"
import CustomerTable from "./pages/Customer/CustomerTable"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={ <CustomerLayout /> } >
            <Route index element={<CustomerTable />} />
            <Route path="customerDetail" element={<CustomerDetail />} />
          </Route>
          <Route path="products" element={<Products />} />
          <Route path="invoice" element={<InvoiceLayout />}>
            <Route index element={<InvoiceTable />} />
            <Route path="createInvoice" element={<CreateInvoice />} />
            <Route path="editInvoice" element={<EditInvoice />} />
            <Route path="viewInvoice" element={<ViewInvoice />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
