import React, { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import Loader from "./components/Loader"
import RootLayout from "./layout/RootLayout"
import Dashboard from "./pages/Dashboard"
// import Products from "./pages/Products"
// import InvoiceTable from "./pages/Invoice/InvoiceTable"
// import Profile from "./pages/Profile"
// import InvoiceLayout from "./layout/InvoiceLayout"
// import Signup from "./pages/Auth/Signup/Signup"
// import EditInvoice from "./pages/Invoice/EditInvoice"
// import CustomerLayout from "./layout/CustomerLayout"
// import CustomerDetail from "./pages/Customer/CustomerDetail"
// import CustomerTable from "./pages/Customer/CustomerTable"
// import CreateInvoice from "./pages/Invoice/CreateInvoice"
// const RootLayout = lazy(() => import("./layout/RootLayout"))
// const Dashboard = lazy(() => import("./pages/Dashboard"))
const Products = lazy(() => import("./pages/Products"))
const InvoiceTable = lazy(() => import("./pages/Invoice/InvoiceTable"))
const Profile = lazy(() => import("./pages/Profile"))
const InvoiceLayout = lazy(() => import("./layout/InvoiceLayout"))
const Signup = lazy(() => import("./pages/Auth/Signup/Signup"))
const EditInvoice = lazy(() => import("./pages/Invoice/EditInvoice"))
const CustomerLayout = lazy(() => import("./layout/CustomerLayout"))
const CustomerDetail = lazy(() => import("./pages/Customer/CustomerDetail"))
const CustomerTable = lazy(() => import("./pages/Customer/CustomerTable"))
const CreateInvoice = lazy(() => import("./pages/Invoice/CreateInvoice"))

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route
            path="customers"
            element={
              <Suspense fallback={null}>
                <CustomerLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={null}>
                  <CustomerTable />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={null}>
                  <CustomerDetail />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="products"
            element={
              <Suspense fallback={null}>
                <Products />
              </Suspense>
            }
          />
          <Route
            path="invoice"
            element={
              <Suspense fallback={null}>
                <InvoiceLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={null}>
                  <InvoiceTable />
                </Suspense>
              }
            />
            <Route
              path="createInvoice"
              element={
                <Suspense fallback={null}>
                  <CreateInvoice />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={null}>
                  <EditInvoice />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="profile"
            element={
              <Suspense fallback={null}>
                <Profile />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="signup"
          element={
            <Suspense fallback={null}>
              <Signup />
            </Suspense>
          }
        />
      </Routes>
    </>
  )
}

export default App
