import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSingleCustomer,
  editCustomer,
} from "../../redux/slices/customerSlice"
import { displayPhone } from "../../utils/displayPhone"
import AreaChartComponent from "../../components/Charts/AreaChartComponent"
import BarChartComponent from "../../components/Charts/BarChartComponent"
import { motion } from "framer-motion"
import { fetchAllInvoices } from "../../redux/slices/invoiceSlice"
import Table from "../../components/Table/Table"
import { MdEdit, MdDelete } from "react-icons/md"

import {
  FaAngleLeft,
  FaAngleRight,
  FaRupeeSign,
  FaFileInvoiceDollar,
  BsPeopleFill,
  BsBoxSeamFill,
  FaPlus,
} from "../../assets"
import { customerInvoicesColumns } from "../../components/Table/Columns"
import EditCustomer from "../../components/Customer/EditCustomer"
import axios from "axios"
import getCookieValue from "../../utils/getCookieValue"
import YearChart from "../../components/Charts/YearChart"
import AreaBarSwitch from "../../components/Charts/AreaBarSwitch"
import ChangeBillingAddressesModal from "../../components/Customer/AddBillingAddressesModal"
import Loader from "../../components/Loader"

const CustomerDetail = () => {
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear().toString(),
  )
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [chart, setChart] = useState("area")
  const handleChange = (e) => {
    setChart(e.target.value)
  }
  const [modalOpen, setModalOpen] = useState(false) // This is to manage the edit modal

  const [revenue, setRevenue] = useState(null) // This is to manage the revenue

  const id = useParams().id
  const dispatch = useDispatch()
  const { customers, loading } = useSelector(
    (state) => state.customers.customers,
  )
  const customerDetails = customers && customers[0]

  // const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getCustomer() {
      await dispatch(fetchSingleCustomer(id))
      dispatch(
        fetchAllInvoices({
          search: sessionStorage.getItem("customerName"),
        }),
      )
    }
    getCustomer()
  }, [])

  const getCustomerDetailData = async () => {
    const { data } = await axios.get(
      "http://localhost:4598/api/v1/invoice/getcustomerdetaildata",
      {
        headers: {
          Authorization: "Bearer " + getCookieValue("authToken"),
        },
        params: {
          year: currentYear,
          month: currentMonth,
          customer: sessionStorage.getItem("customerName"),
        },
      },
    )
    setRevenue(data)
    console.log(data)
  }

  useEffect(() => {
    getCustomerDetailData()
  }, [currentYear])

  const { invoices } = useSelector((state) => state.invoices)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [billingModalOpen, setBillingModalOpen] = useState(false)

  return (
    <div>
      {modalOpen && (
        <EditCustomer
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          customer={customerDetails}
        />
      )}
      {/* {billingModalOpen &&} */}
      {customerDetails && (
        <ChangeBillingAddressesModal
          open={billingModalOpen}
          setOpen={setBillingModalOpen}
          customer={customerDetails}
        />
      )}

      {/* CustomerDetail */}
      {!loading ? (
        <div className="flex h-full w-full gap-4 text-foreground">
          <div className="flex h-[calc(100dvh-80px)] w-1/4 flex-col gap-3 rounded-rounded bg-background p-4 text-lg">
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">Customer Info</p>
              <button
                className="rounded-rounded p-2 transition-all hover:bg-secondaryBtnHover"
                onClick={() => setModalOpen(true)}
              >
                <MdEdit />
              </button>
            </div>
            <div>
              <p className="text-sm font-bold">Name</p>
              <p className="font-abold text-lg">{customerDetails?.client}</p>
            </div>
            <div className="">
              <p className="text-sm font-bold">GSTIN</p>
              <p>{customerDetails?.gstin}</p>
            </div>
            <div className="">
              <p className="text-sm font-bold">EMAIL</p>
              <p>{customerDetails?.email || "-"}</p>
            </div>
            <div className="">
              <p className="text-sm font-bold">PHONE</p>
              <p>{customerDetails && displayPhone(customerDetails.phone)}</p>
            </div>
            <div className="">
              <p className="text-sm font-bold uppercase">Contact Person</p>
              <p>{customerDetails?.contactPerson || "-"}</p>
            </div>
            <div className="flex items-center justify-between text-sm">
              <p className="font-bold uppercase">Billing Addresses</p>
              <button
                type="button"
                onClick={() => setBillingModalOpen(true)}
                className="rounded-rounded p-2 transition-all hover:bg-secondaryBtnHover"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-col gap-2 overflow-scroll">
              {customerDetails &&
                customerDetails.billingAddresses.map((address, i) => {
                  return (
                    <div className="flex justify-between rounded-md border border-border p-2">
                      <div className="w-[85%] text-sm">
                        <p>
                          {address.streetAddress +
                            ", " +
                            address.city +
                            ", " +
                            address.state +
                            ", " +
                            address.country}
                        </p>
                        {"ZIP: " +
                          address.zip +
                          ", State Code: " +
                          address.stateCode}
                      </div>
                      <div className="flex flex-col justify-between">
                        <button
                          type="button"
                          className="text-slate-400 hover:text-foreground"
                        >
                          <MdEdit />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(
                              editCustomer({
                                id: customerDetails._id,
                                customer: {
                                  ...customerDetails,
                                  billingAddresses:
                                    customerDetails.billingAddresses.filter(
                                      (ba, index) => index !== i,
                                    ),
                                },
                              }),
                            )
                          }}
                          className="text-slate-400 hover:text-foreground"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          <div className="no-scrollbar flex h-[calc(100dvh-80px)] w-3/4 scroll-m-0 flex-col gap-4 overflow-scroll">
            <div className="flex gap-4">
              <div className="flex w-1/3 flex-col gap-4">
                <div className="rounded-rounded bg-background p-4">
                  <p className="font-light uppercase">Revenue This Month</p>
                  <p className="py-4 font-numbers text-4xl font-bold text-primary">
                    ₹{revenue ? revenue?.revenueThisMonth.toLocaleString() : 0}
                  </p>
                </div>
                <div className="rounded-rounded bg-background p-4">
                  <p className="font-light uppercase">Revenue This Year</p>
                  <p className="py-4 font-numbers text-4xl font-bold text-primary">
                    ₹{revenue ? revenue?.revenueThisYear.toLocaleString() : 0}
                  </p>
                </div>
                <div className="rounded-rounded bg-background p-4">
                  <p className="font-light uppercase">Revenue Till Date</p>
                  <p className="py-4 font-numbers text-4xl font-bold text-primary">
                    ₹{revenue ? revenue?.revenueTillDate.toLocaleString() : 0}
                  </p>
                </div>
              </div>
              {/* Chart */}
              <div className="w-2/3 rounded-rounded bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xl">
                    <button onClick={() => setCurrentYear((prev) => prev - 1)}>
                      <FaAngleLeft color="#2807a0" />
                    </button>
                    <span className="font-numbers font-bold uppercase">
                      <span className="font-numbers">{currentYear}</span>{" "}
                      Revenue
                    </span>
                    <button onClick={() => setCurrentYear((prev) => prev + 1)}>
                      <FaAngleRight color="#2807a0" />
                    </button>
                  </div>
                  <AreaBarSwitch
                    chart={chart}
                    setChart={setChart}
                    style={"w-1/5"}
                  />
                </div>
                <>
                  <YearChart chart={chart} revenue={revenue?.revenueForChart} />
                </>
              </div>
            </div>

            {/* Invoice Table */}
            <div className="">
              {invoices?.invoices?.length > 0 ? (
                <Table
                  tableColumns={customerInvoicesColumns}
                  tableData={invoices?.invoices}
                  pageCount={invoices.pageCount}
                  pagination={pagination}
                  setPagination={setPagination}
                />
              ) : (
                <div className="flex h-[32.8vh] w-full items-center justify-center bg-background">
                  <p className="text-xl">
                    You have not issued any invoice to {customerDetails?.client}
                    .
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
      {/* <div className="mt-7 flex w-full justify-between gap-x-7">
        <div className="w-1/2 rounded-rounded bg-foreground px-2 py-4">
          <h1 className="mb-5 text-2xl font-semibold">Billing Adresses</h1> */}

      {/* list of billing addresses */}
      {/* <div className="flex h-fit max-h-[400px] w-full flex-col gap-y-6 overflow-y-scroll">
            {customerDetails.billingAddresses &&
              customerDetails.billingAddresses.map((address, i) => {
                return (
                  <p>
                    {address.streetAddress +
                      ", " +
                      address.city +
                      ", ZIP: " +
                      address.zip +
                      ", " +
                      address.state +
                      ", State Code: " +
                      address.stateCode}
                  </p>
                )
              })}
          </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  )
}

export default CustomerDetail
