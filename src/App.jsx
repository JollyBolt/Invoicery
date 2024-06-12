import { Route, Routes } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Dashboard from "./pages/Dashboard"
import Products from "./pages/Products"
import InvoiceTable from "./pages/Invoice/InvoiceTable"
import Profile from "./pages/Profile"
import CreateInvoice from "./components/Invoice/CreateInvoice"
import InvoiceLayout from "./layout/InvoiceLayout"
import Signup from './pages/Auth/Signup';
import Customers from "./pages/Customer/Customers"
import EditInvoice from "./pages/Invoice/EditInvoice"
import ViewInvoice from "./pages/Invoice/ViewInvoice"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
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
