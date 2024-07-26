import React, { useState, useEffect, useRef } from "react"
import PageWrapper from "../hoc/PageWrapper"
import {
  FaAngleLeft,
  FaAngleRight,
  FaRupeeSign,
  FaFileInvoiceDollar,
  BsPeopleFill,
  BsBoxSeamFill,
} from "../assets/index"
import Stats from "../components/Dashboard/Stats"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { fetchAllInvoices } from "../redux/slices/invoiceSlice"
import { displayDate } from "../utils/displayDate"
import YearChart from "../components/Charts/YearChart"
import DoughnutChartComponent from "../components/Charts/DoughnutChartComponent"
import AreaBarSwitch from "../components/Charts/AreaBarSwitch"
import Loader from "../components/Loader"
import Skeleton from "../components/Skeleton"
import { RiArrowDropDownLine } from "react-icons/ri"
import { authSlice } from "../redux/slices/authSlice"

const Dashboard = () => {
  const [currentYearYearlyChart, setCurrentYearYearlyChart] = useState(
    new Date().getFullYear().toString(),
  )
  const [currentYearMonthlyChart, setCurrentYearMonthlyChart] = useState(
    new Date().getFullYear().toString(),
  )
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const { invoices } = useSelector((state) => state.invoices)
  const [yearlyRevenue, setYearlyRevenue] = useState(null) // This is to manage the Yearly revenue
  const [monthlyRevenue, setMonthlyRevenue] = useState(null) // This is to manage the Yearly revenue

  const [stats, setStats] = useState(null)

  const {  token } = useSelector((state) => state.auth)
  const { setToken } = authSlice.actions
  const dispatch = useDispatch()
  const getStats = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/stats/getstats`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    setStats(res.data.data)
    dispatch(setToken(res.data.token))
  }

  const [yearlyRevenueLoading, setYearlyRevenueLoading] = useState(false)
  const [monthlyRevenueLoading, setMonthlyRevenueLoading] = useState(false)

  const getDashboardYearlyChartData = async (year) => {
    setYearlyRevenueLoading(true)
    setYearlyRevenue(null)
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/invoice/getdashboardyearlychartdata`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          year: year,
        },
      },
    )
    dispatch(setToken(res.data.token))
    setYearlyRevenue(res.data.data)
    setYearlyRevenueLoading(false)
    setDashboardLoading(false)
  }

  const getDashboardMonthlyChartData = async (year, month) => {
    setMonthlyRevenueLoading(true)
    setMonthlyRevenue(null)
    const res = await axios.get(
      `${import.meta.env.VITE_URL}/api/v1/invoice/getdashboardmonthlychartdata`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
        params: {
          year: year,
          month: month,
        },
      },
    )
    dispatch(setToken(res.data.token))
    setMonthlyRevenue(res.data.data)
    setMonthlyRevenueLoading(false)
  }

  const [dashboardLoading, setDashboardLoading] = useState(true)

  useEffect(() => {
    getStats()
    getDashboardYearlyChartData(currentYearYearlyChart)
    dispatch(fetchAllInvoices({ limit: 10 }))
    getDashboardMonthlyChartData(currentYearMonthlyChart, currentMonth)
  }, [])

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const [chart, setChart] = useState("area")

  const monthRef = useRef()
  const [monthPicker, setMonthPicker] = useState(false)

  const handleClickOutside = (event) => {
    if (monthRef.current && !monthRef.current.contains(event.target)) {
      setMonthPicker(false)
    }
  }

  useEffect(() => {
    // Add event listener when the component is mounted
    document.addEventListener("mousedown", handleClickOutside)

    // Remove event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div>
{dashboardLoading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <div className="grid grid-cols-8 gap-4">
          <p className="col-span-8 text-2xl font-extrabold uppercase text-foreground">
            Overall Stats
          </p>
          <Stats
            title="Total Invoices"
            number={stats?.totalInvoices}
            icon={<FaFileInvoiceDollar />}
          />
          <Stats
            title="Total Revenue"
            number={stats?.totalRevenue}
            icon={<FaRupeeSign />}
          />
          <Stats
            title="Total Customers"
            number={stats?.totalCustomers}
            icon={<BsPeopleFill />}
          />
          <Stats
            title="Total Products"
            number={stats?.totalProducts}
            icon={<BsBoxSeamFill />}
          />

          {
            //Yearly Chart
          }
          <p className="col-span-8 text-2xl font-extrabold uppercase text-foreground">
            Yearly Stats
          </p>
          <div className="col-span-8 row-span-2 rounded-rounded bg-background p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xl font-bold uppercase text-foreground">
                Monthly Revenue Chart
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 rounded-md border border-foreground/50 text-xl">
                  <button
                    onClick={() => {
                      setCurrentYearYearlyChart((prev) => prev - 1)
                      getDashboardYearlyChartData(currentYearYearlyChart - 1)
                    }}
                    className="border-r border-foreground/50 py-2"
                  >
                    <FaAngleLeft className="text-primary" />
                  </button>
                  <span className="borer-r border-foreground/50 font-numbers font-light text-foreground/50">
                    {currentYearYearlyChart}
                  </span>
                  <button
                    disabled={
                      new Date().getFullYear().toString() ===
                      currentYearYearlyChart.toString()
                    }
                    onClick={() => {
                      setCurrentYearYearlyChart((prev) => parseInt(prev) + 1)
                      getDashboardYearlyChartData(currentYearYearlyChart + 1)
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
            {yearlyRevenueLoading || !yearlyRevenue ? (
              <Loader height="300px" />
            ) : (
              <div className="flex w-full">
                <div className="w-[65%]">
                  {yearlyRevenue && (
                    <YearChart
                      chart={chart}
                      revenue={
                        yearlyRevenue?.revenueForYearlyChart.monthlyRevenue
                      }
                    />
                  )}
                </div>
                <div className="h-[300px] w-[35%] p-5">
                  <div className="flex h-full flex-col justify-evenly text-foreground">
                    <div className="flex gap-4 text-2xl">
                      <p className="w-[250px]">Invoices Issued:</p>
                      <p className="font-numbers font-bold text-primary">
                        {yearlyRevenue?.revenueForYearlyChart.overallStats
                          .length > 0
                          ? yearlyRevenue?.revenueForYearlyChart.overallStats[0]
                              .invoiceCount
                          : 0}
                      </p>
                    </div>
                    <div className="flex gap-4 text-2xl">
                      <p className="w-[250px]">Highest Invoice Value:</p>
                      <p className="font-numbers font-bold text-primary">
                        ₹
                        {yearlyRevenue?.revenueForYearlyChart.overallStats
                          .length > 0
                          ? yearlyRevenue?.revenueForYearlyChart.overallStats[0].highestInvoiceValue.toLocaleString(
                              "en-IN",
                            )
                          : 0}
                      </p>
                    </div>
                    <div className="flex gap-4 text-2xl">
                      <p className="w-[250px]">Lowest Invoice Value:</p>
                      <p className="font-numbers font-bold text-primary">
                        ₹
                        {yearlyRevenue?.revenueForYearlyChart.overallStats
                          .length > 0
                          ? yearlyRevenue?.revenueForYearlyChart.overallStats[0].lowestInvoiceValue.toLocaleString(
                              "en-IN",
                            )
                          : 0}
                      </p>
                    </div>
                    <div className="flex gap-4 text-2xl">
                      <p className="w-[250px]">Revenue:</p>
                      <p className="font-numbers font-bold text-primary">
                        ₹
                        {yearlyRevenue?.revenueForYearlyChart.overallStats
                          .length > 0
                          ? yearlyRevenue?.revenueForYearlyChart.overallStats[0].totalRevenue.toLocaleString(
                              "en-IN",
                            )
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <p className="col-span-5 text-2xl font-extrabold uppercase text-foreground">
            Recent Invoices{" "}
          </p>
          <p className="col-span-3 text-2xl font-extrabold uppercase text-foreground">
            Monthly Stats{" "}
          </p>

          {
            //Recent Invoices Table
          }
          <div className="col-span-5 rounded-lg border border-border bg-background p-4 text-foreground">
            <table className="text-s w-full">
              <thead>
                <tr className="h-12 border-b border-border py-2 text-left text-slate-600">
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th>Issued To</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoices?.invoices?.map((invoice) => (
                  <tr key={invoice._id} className="h-11 py-4">
                    <td>{invoice.invoiceNumber}</td>
                    <td>{displayDate(invoice.invoiceDate)}</td>
                    <td>{invoice.customer.name}</td>
                    <td>
                      {"₹ " +
                        invoice.totalAmount.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* </div> */}

          {/* Monthly Chart */}
          <div className="col-span-3 rounded-rounded bg-background p-5">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-3 text-lg">
                <p className="font-bold uppercase text-foreground">
                  Customer Revenue Breakdown
                </p>
                <div className="flex items-center gap-2">
                  {/* Month Selector */}
                  <div
                    className="relative flex cursor-pointer items-center rounded-md border border-foreground/50 px-2 py-1 text-lg font-light uppercase text-foreground/50"
                    onClick={() => setMonthPicker((prev) => !prev)}
                    ref={monthRef}
                  >
                    {monthNames[currentMonth]}
                    <span className="text-primary">
                      <RiArrowDropDownLine />
                    </span>
                    <div
                      className={`absolute right-0 top-10 z-10 w-[160px] origin-top-right scale-0 rounded-md border border-border bg-background p-2 text-sm text-foreground ${monthPicker && "scale-100"} transition-all`}
                      onClick={(e) => e.stopPropagation()}
                      onBlur={() => setMonthPicker(false)}
                    >
                      <p className="mb-2 select-none border-b border-border text-center">
                        Select Month
                      </p>
                      <div className="flex flex-wrap justify-evenly gap-1">
                        {monthNames.map((month, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setCurrentMonth(index)
                              getDashboardMonthlyChartData(
                                currentYearMonthlyChart,
                                index,
                              )
                              setMonthPicker(false)
                            }}
                            className={`p-1 uppercase hover:bg-muted`}
                          >
                            {month}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Year Selector */}
                  <div className="flex items-center gap-3 rounded-md border border-foreground/50 text-lg">
                    <button
                      onClick={() => {
                        setCurrentYearMonthlyChart((prev) => prev - 1)
                        getDashboardMonthlyChartData(
                          currentYearMonthlyChart - 1,
                        )
                      }}
                      className="border-r border-foreground/50 py-2"
                    >
                      <FaAngleLeft className="text-primary" />
                    </button>
                    <span className="borer-r border-foreground/50 font-numbers font-light text-foreground/50">
                      {currentYearMonthlyChart}
                    </span>
                    <button
                      disabled={
                        new Date().getFullYear().toString() ===
                        currentYearMonthlyChart.toString()
                      }
                      onClick={() => {
                        setCurrentYearMonthlyChart((prev) => parseInt(prev) + 1)
                        getDashboardMonthlyChartData(
                          currentYearMonthlyChart + 1,
                        )
                      }}
                      className="border-l border-foreground/50 py-2 disabled:opacity-30"
                    >
                      <FaAngleRight className="text-primary" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mx-auto flex h-[400px] w-[400px] items-center justify-center">
                {monthlyRevenueLoading ? (
                  <Loader height="400px" />
                ) : monthlyRevenue?.monthlyChartData.length > 0 ? (
                  <DoughnutChartComponent
                    chartData={monthlyRevenue?.monthlyChartData}
                  />
                ) : (
                  <p className="text-foreground">
                    Insufficient Data to display Chart
                  </p>
                )}
              </div>
              <div className="w-full text-foreground">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <p>Invoices Issued:</p>
                    <p className="font-numbers font-bold text-primary">
                      {monthlyRevenue?.monthlyStats.length > 0
                        ? monthlyRevenue.monthlyStats[0].invoiceCount
                        : 0}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>Highest Invoice Value:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {monthlyRevenue?.monthlyStats?.length > 0
                        ? monthlyRevenue?.monthlyStats[0]?.highestInvoiceValue.toLocaleString(
                            "en-IN",
                          )
                        : +0}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <p>Revenue:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {monthlyRevenue?.monthlyStats?.length > 0
                        ? monthlyRevenue.monthlyStats[0].totalRevenue.toLocaleString(
                            "en-IN",
                          )
                        : 0}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>Lowest Invoice Value:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {monthlyRevenue?.monthlyStats.length > 0
                        ? monthlyRevenue.monthlyStats[0].lowestInvoiceValue.toLocaleString(
                            "en-IN",
                          )
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageWrapper(Dashboard, "dashboard")
