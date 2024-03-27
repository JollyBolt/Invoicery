import { Route, Routes } from "react-router-dom"
import RootLayout from "./layout/RootLayout"
import Dashboard from "./pages/Dashboard"
import Customers from './pages/Customers';
import Products from './pages/Products';
import Invoice from './pages/Invoice';
import Profile from './pages/Profile';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={ <Dashboard /> }/>
          <Route path="customers" element={ <Customers /> }/>
          <Route path="products" element={ <Products /> }/>
          <Route path="/invoice" element={ <Invoice /> }/>
          <Route path="/profile" element={ <Profile /> }/>
        </Route>
      </Routes>
    </>
  )
}

export default App
