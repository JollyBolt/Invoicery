import React, { useState, useEffect } from "react";
import PageWrapper from "../hoc/PageWrapper";
import BarChart from "../components/Charts/BarChart";
import LineChart from "../components/Charts/LineChart";
import {
  FaAngleLeft,
  FaAngleRight,
  FaRupeeSign,
  FaFileInvoiceDollar,
  BsPeopleFill,
  BsBoxSeamFill,
} from "../assets/index";
import Stats from "../components/Dashboard/Stats"
import { useSelector, useDispatch } from "react-redux"
import Auth from "../components/Auth"
import axios from "axios"
import getCookieValue from "../utils/getCookieValue"

const Dashboard = () => {
  const [currentYear, setCurrentYear] = useState(2024)

  const [stats, setStats] = useState(null)

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
  }, [])

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

  const [currentmonth, setCurrentMonth] = useState(new Date().getMonth())

  const [chart, setChart] = useState("line")
  const handleChange = (e) => {
    setChart(e.target.value)
  }

  //Checking if authtoken exists, i.e., logged in on refresh
  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state) => state.auth)

  return (
    <div>
      {loggedIn === false ? (
        <>
          <Auth />
        </>
      ) : (
        <div className="grid grid-cols-8 gap-4">
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

          {
            //Yearly Chart
          }
          <div className="col-span-4 row-span-2 rounded-rounded bg-white p-5">
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
            //Recent Invoices Table
          }
          <div className="col-span-4 rounded-rounded bg-white p-5">
            {" "}
            Recent Invoices
          </div>

          {}
          <div className="col-span-4 rounded-rounded bg-white p-5">
            <div>
              <div className="flex items-center gap-3 text-xl">
                <button
                  onClick={() =>
                    setCurrentMonth((prev) => (prev > 0 ? prev - 1 : 11))
                  }
                >
                  <FaAngleLeft color="#2807a0" />
                </button>
                <span className="font-bold uppercase text-black">
                  {monthNames[currentmonth]}
                </span>
                <button
                  onClick={() =>
                    setCurrentMonth((prev) => (prev < 11 ? prev + 1 : 0))
                  }
                >
                  <FaAngleRight color="#2807a0" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PageWrapper(Dashboard, "dashboard");
