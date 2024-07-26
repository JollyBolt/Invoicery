import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchSingleCustomer,
  editCustomer,
} from "../../redux/slices/customerSlice"
import { displayPhone } from "../../utils/displayPhone"
import { fetchAllInvoices } from "../../redux/slices/invoiceSlice"
import Table from "../../components/Table/Table"
import { MdEdit, MdDelete } from "react-icons/md"
import { FaAngleLeft, FaAngleRight, FaPlus } from "../../assets"
import { customerInvoicesColumns } from "../../components/Table/Columns"
import EditCustomer from "../../components/Customer/EditCustomer"
import axios from "axios"
import YearChart from "../../components/Charts/YearChart"
import AreaBarSwitch from "../../components/Charts/AreaBarSwitch"
import Loader from "../../components/Loader"
import AddBillingAddressesModal from "../../components/Customer/AddBillingAddressesModal"
import EditBillingAddressesModal from "../../components/Customer/EditBillingAddressesModal"


const CustomerDetail = () => {
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear().toString(),
  )
  // const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [chart, setChart] = useState("area")

  const [modalOpen, setModalOpen] = useState(false) // This is to manage the edit modal

  const [revenue, setRevenue] = useState(0) // This is to manage the revenue

  const id = useParams().id
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { customers, loading } = useSelector(
    (state) => state.customers.customers,
  )
  const customerDetails = customers && customers[0]

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

  const getCustomerDetailData = async (year) => {
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/invoice/getcustomerdetaildata`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          year: year,
          month: new Date().getMonth(),
          customer: sessionStorage.getItem("customerName"),
        },
      },
    )
    setRevenue(res.data.data)
  }

  useEffect(() => {
    getCustomerDetailData(currentYear)
  }, [token])

  const { invoices } = useSelector((state) => state.invoices)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [addBillingModalOpen, setAddBillingModalOpen] = useState(false)
  const [editBillingModalOpen, setEditBillingModalOpen] = useState(false)
  const [editAddressIndex, setEditAddressIndex] = useState(0)
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
        <AddBillingAddressesModal
          open={addBillingModalOpen}
          setOpen={setAddBillingModalOpen}
          customer={customerDetails}
        />
      )}
      {editBillingModalOpen && (
        <EditBillingAddressesModal
          open={editBillingModalOpen}
          setOpen={setEditBillingModalOpen}
          customer={customerDetails}
          ind={editAddressIndex}
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
                onClick={() => setAddBillingModalOpen(true)}
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
                          onClick={() => {
                            setEditAddressIndex(i)
                            setEditBillingModalOpen(true)
                          }}
                          className="text-slate-400 hover:text-foreground"
                        >
                          <MdEdit />
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await dispatch(
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
                            location.reload()
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
                    ₹
                    {revenue
                      ? revenue?.revenueThisMonth.toLocaleString("en-IN")
                      : 0}
                  </p>
                </div>
                <div className="rounded-rounded bg-background p-4">
                  <p className="font-light uppercase">Revenue This Year</p>
                  <p className="py-4 font-numbers text-4xl font-bold text-primary">
                    ₹
                    {revenue
                      ? revenue?.revenueThisYear.toLocaleString("en-IN")
                      : 0}
                  </p>
                </div>
                <div className="rounded-rounded bg-background p-4">
                  <p className="font-light uppercase">Revenue Till Date</p>
                  <p className="py-4 font-numbers text-4xl font-bold text-primary">
                    ₹
                    {revenue
                      ? revenue?.revenueTillDate.toLocaleString("en-IN")
                      : 0}
                  </p>
                </div>
              </div>
              {/* Chart */}
              <div className="w-2/3 rounded-rounded bg-background p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xl font-bold uppercase text-foreground">
                    Monthly Revenue Chart
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3 rounded-md border border-foreground/50 text-xl">
                      <button
                        onClick={() => {
                          setCurrentYear((prev) => prev - 1)
                          getCustomerDetailData(currentYear - 1)
                        }}
                        className="border-r border-foreground/50 py-2"
                      >
                        <FaAngleLeft className="text-primary" />
                      </button>
                      <span className="borer-r border-foreground/50 font-numbers font-light text-foreground/50">
                        {currentYear}
                      </span>
                      <button
                        disabled={
                          new Date().getFullYear().toString() ===
                          currentYear.toString()
                        }
                        onClick={() => {
                          setCurrentYear((prev) => parseInt(prev) + 1)
                          getCustomerDetailData(currentYear + 1)
                        }}
                        className="border-l border-foreground/50 py-2 disabled:opacity-30"
                      >
                        <FaAngleRight className="text-primary" />
                      </button>
                    </div>

                    <AreaBarSwitch
                      chart={chart}
                      setChart={setChart}
                      style={"w-1/12"}
                    />
                  </div>
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
    </div>
  )
}

export default CustomerDetail
