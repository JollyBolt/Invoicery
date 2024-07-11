import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleCustomer } from "../../redux/slices/customerSlice"
import { displayPhone } from "../../utils/displayPhone"
import LineChart from "../../components/Charts/LineChart"
import BarChart from "../../components/Charts/BarChart"
import { motion } from "framer-motion"
import { fetchAllInvoices } from "../../redux/slices/invoiceSlice"

import {
  FaAngleLeft,
  FaAngleRight,
  FaRupeeSign,
  FaFileInvoiceDollar,
  BsPeopleFill,
  BsBoxSeamFill,
} from "../../assets"

const CustomerDetail = () => {
  const [currentYear, setCurrentYear] = useState(2024)
  const [chart, setChart] = useState("line")
  const handleChange = (e) => {
    setChart(e.target.value)
  }

  const id = useParams().id
  const dispatch = useDispatch()
  const { customers, loading } = useSelector(
    (state) => state.customers.customers,
  )
  const customerDetails = customers && customers[0]
  // const { loggedIn } = useSelector((state) => state.auth)

  useEffect(() => {
    async function getCustomer() {
      dispatch(fetchSingleCustomer(id))
      dispatch(fetchAllInvoices({ search: customerDetails.client }))
    }
    getCustomer()
  }, [])

  const { invoices } = useSelector((state) => state.invoices)

  if (!customerDetails) return <div>Loading</div>

  return (
    <div>
      {/* CustomerDetail */}
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full gap-4">
          <div className="flex w-1/2 flex-col gap-3 rounded-rounded bg-primary p-4 text-lg text-white">
            <p className="mb-5 text-5xl font-extrabold">
              {customerDetails.client}
            </p>
            <div className="flex">
              <p className="w-[30%] font-bold">GSTIN</p>
              <p>{customerDetails.gstin}</p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-bold">EMAIL</p>
              <p>{customerDetails.email || "-"}</p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-bold">PHONE</p>
              <p>{displayPhone(customerDetails.phone)}</p>
            </div>
            <div className="flex">
              <p className="w-[30%] font-bold uppercase">Contact Person</p>
              <p>{customerDetails.contactPerson || "-"}</p>
            </div>
            <motion.button
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.93 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(true)}
              className="w-[30%] rounded-rounded border-2 border-white bg-primary p-3 text-lg font-semibold text-white transition-colors duration-200 hover:bg-primaryLight"
            >
              Edit Customer
            </motion.button>
          </div>

          <div className="w-1/2 rounded-rounded bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xl">
                <button onClick={() => setCurrentYear((prev) => prev - 1)}>
                  <FaAngleLeft color="#2807a0" />
                </button>
                <span className="font-numbers font-bold uppercase text-black">
                  <span className="font-numbers">{currentYear}</span> Revenue
                </span>
                <button onClick={() => setCurrentYear((prev) => prev + 1)}>
                  <FaAngleRight color="#2807a0" />
                </button>
              </div>
              <select
                id="chartType"
                value={chart}
                onChange={handleChange}
                className="mt-1 block w-[13%] rounded-md border border-gray-300 px-2 py-2 text-base focus:outline-none sm:text-sm"
              >
                <option value="bar">Bar</option>
                <option value="line">Line</option>
              </select>
            </div>
            {chart == "line" ? (
              <LineChart currentYear={currentYear} />
            ) : (
              <BarChart currentYear={currentYear} />
            )}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="rounded-rounded bg-white p-4">
            <div className="flex"></div>
          </div>
          <div className="rounded-rounded bg-white p-4">Invoices</div>
        </div>
      </div>

      <div className="w-full rounded-rounded bg-foreground px-4 py-4">
        <h1 className="text-5xl font-bold">{customerDetails.client}</h1>
        <div className="flex justify-between">
          <div className="mt-5 flex flex-col gap-y-1">
            {customerDetails.contactPerson && (
              <p className="text-lg">
                <span className="text-gray-400">Contact Person: Mr/Ms </span>
                {customerDetails.contactPerson}
              </p>
            )}
            <p className="text-lg">
              <span className="text-gray-400">Contact Number: </span>
              {customerDetails.phone}
            </p>
            <p className="text-lg">
              <span className="text-gray-400">GSTIN: </span>
              {customerDetails.gstin}
            </p>
          </div>
          <div className="text-lg">Chart</div>
        </div>
      </div>

      <div className="mt-7 flex w-full justify-between gap-x-7">
        <div className="w-1/2 rounded-rounded bg-foreground px-2 py-4">
          <h1 className="mb-5 text-2xl font-semibold">Billing Adresses</h1>

          {/* list of billing addresses */}
          <div className="flex h-fit max-h-[400px] w-full flex-col gap-y-6 overflow-y-scroll">
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
          </div>
        </div>

        <div className="w-full rounded-rounded bg-foreground">
          Invoices Table
        </div>
      </div>
    </div>
  )
}

export default CustomerDetail
