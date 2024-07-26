import PageWrapper from "../hoc/PageWrapper"
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Auth from "../components/Auth"
import Loader from "../components/Loader"

const InvoiceLayout = () => {
  const { token } = useSelector((state) => state.auth)

  return (
    <div className="mt-4">
      <Outlet />
      {/* {token ? <Outlet /> : token === null ? <Auth />:<Loader />  } */}
    </div>
  )
}

export default PageWrapper(InvoiceLayout)
