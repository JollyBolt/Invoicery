import { Route, Routes } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import InvoiceTable from "./pages/Invoice/InvoiceTable"
import Profile from "./pages/Profile"
import InvoiceLayout from "./layout/InvoiceLayout"
import Signup from "./pages/Auth/Signup/Signup"
import EditInvoice from "./pages/Invoice/EditInvoice"
import CustomerLayout from "./layout/CustomerLayout"
import CustomerDetail from "./pages/Customer/CustomerDetail"
import CustomerTable from "./pages/Customer/CustomerTable"
import CreateInvoice from "./pages/Invoice/CreateInvoice"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<CustomerLayout />}>
            <Route index element={<CustomerTable />} />
            <Route path=":id" element={<CustomerDetail />} />
          </Route>
          <Route path="products" element={<Products />} />
          <Route path="invoice" element={<InvoiceLayout />}>
            <Route index element={<InvoiceTable />} />
            <Route path="createInvoice" element={<CreateInvoice />} />
            <Route path=":id" element={<EditInvoice />} />
          </Route>
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
