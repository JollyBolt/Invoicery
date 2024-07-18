import React, { useState, useEffect } from "react"
import PageWrapper from "../hoc/PageWrapper"
import BarChartComponent from "../components/Charts/BarChartComponent"
import AreaChartComponent from "../components/Charts/AreaChartComponent"
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
import Auth from "../components/Auth"
import axios from "axios"
import getCookieValue from "../utils/getCookieValue"
import { fetchAllInvoices } from "../redux/slices/invoiceSlice"
import { displayDate } from "../utils/displayDate"
import YearChart from "../components/Charts/YearChart"
import DoughnutChartComponent from "../components/Charts/DoughnutChartComponent"
import AreaBarSwitch from "../components/Charts/AreaBarSwitch"

const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(
    new Date().getFullYear().toString(),
  )
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const { invoices } = useSelector((state) => state.invoices)
  const [revenue, setRevenue] = useState(null) // This is to manage the revenue

  const [stats, setStats] = useState(null)

  const { loggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const getStats = async () => {
    const { data } = await axios.get(
      "http://localhost:4598/api/v1/stats/getstats",
      {
        headers: {
          Authorization: "Bearer " + getCookieValue("authToken"),
        },
      },
    )
    setStats(data.stats)
  }
  useEffect(() => {
    getStats()
    dispatch(fetchAllInvoices({ limit: 10 }))
  }, [loggedIn])

  const getDashboardChartData = async () => {
    const { data } = await axios.get(
      "http://localhost:4598/api/v1/invoice/getdashboardchartdata",
      {
        headers: {
          Authorization: "Bearer " + getCookieValue("authToken"),
        },
        params: {
          year: currentYear,
          month: currentMonth,
        },
      },
    )
    setRevenue(data)
  }

  useEffect(() => {
    getDashboardChartData()
  }, [loggedIn, currentYear, currentMonth])

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const [chart, setChart] = useState("area")
  const handleChange = (e) => {
    setChart(e.target.value)
  }

  return (
    <div>
      {loggedIn === false ? (
        <>
          <Auth />
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
              <div className="flex items-center gap-3 text-xl">
                <button onClick={() => setCurrentYear((prev) => prev - 1)}>
                  <FaAngleLeft className="text-primary" />
                </button>
                <span className="font-numbers font-bold uppercase text-foreground">
                  <span className="font-numbers">{currentYear}</span> Revenue
                </span>
                <button
                  onClick={() => setCurrentYear((prev) => parseInt(prev) + 1)}
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
            <div className="flex w-full">
              <div className="w-[65%]">
                <YearChart
                  chart={chart}
                  revenue={revenue?.revenueForYearlyChart.monthlyRevenue}
                />
              </div>
              <div className="h-[300px] w-[35%] p-5">
                <div className="flex h-full flex-col justify-evenly text-foreground">
                  <div className="flex gap-4 text-2xl">
                    <p className="w-[250px]">Invoices Issued:</p>
                    <p className="font-numbers font-bold text-primary">
                      {revenue?.revenueForYearlyChart.overallStats.length > 0
                        ? revenue?.revenueForYearlyChart.overallStats[0]
                            .invoiceCount
                        : 0}
                    </p>
                  </div>
                  <div className="flex gap-4 text-2xl">
                    <p className="w-[250px]">Highest Invoice Value:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {revenue?.revenueForYearlyChart.overallStats.length > 0
                        ? revenue?.revenueForYearlyChart.overallStats[0].highestInvoiceValue.toLocaleString()
                        : 0}
                    </p>
                  </div>
                  <div className="flex gap-4 text-2xl">
                    <p className="w-[250px]">Lowest Invoice Value:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {revenue?.revenueForYearlyChart.overallStats.length > 0
                        ? revenue?.revenueForYearlyChart.overallStats[0].lowestInvoiceValue.toLocaleString()
                        : 0}
                    </p>
                  </div>
                  <div className="flex gap-4 text-2xl">
                    <p className="w-[250px]">Revenue:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {revenue?.revenueForYearlyChart.overallStats.length > 0
                        ? revenue?.revenueForYearlyChart.overallStats[0].totalRevenue.toLocaleString()
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
          {/* <div className="col-span-5 rounded-rounded"> */}
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
                        invoice.totalAmount.toLocaleString(undefined, {
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
              <div className="flex items-center gap-3 text-xl">
                <button
                  onClick={() =>
                    setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11))
                  }
                >
                  <FaAngleLeft className="text-primary" />
                </button>
                <span className="font-bold uppercase text-foreground">
                  {monthNames[currentMonth]}
                </span>
                <button
                  onClick={() =>
                    setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0))
                  }
                >
                  <FaAngleRight className="text-primary" />
                </button>
              </div>
              <div className="mx-auto flex h-[400px] w-[400px] items-center justify-center">
                {revenue?.monthlyChartData.length > 0 ? (
                  <DoughnutChartComponent
                    chartData={revenue?.monthlyChartData}
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
                      {revenue?.monthlyStats.length > 0
                        ? revenue.monthlyStats[0].invoiceCount
                        : 0}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>Highest Invoice Value:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {revenue?.monthlyStats?.length > 0
                        ? revenue?.monthlyStats[0]?.highestInvoiceValue.toLocaleString()
                        : +0}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <p>Revenue:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {revenue?.monthlyStats?.length > 0
                        ? revenue.monthlyStats[0].totalRevenue.toLocaleString()
                        : 0}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <p>Lowest Invoice Value:</p>
                    <p className="font-numbers font-bold text-primary">
                      ₹
                      {revenue?.monthlyStats.length > 0
                        ? revenue.monthlyStats[0].lowestInvoiceValue.toLocaleString()
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
