import React, { useEffect, useState } from "react"
import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent"

const YearChart = ({ chart, revenue }) => {
  const [finalYearData, setFinalYearData] = useState(null)

  const labels = [
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
  const [yearData, setYearData] = useState([
    {
      month: "Jan",
      revenue: 0,
    },
    {
      month: "Feb",
      revenue: 0,
    },
    {
      month: "Mar",
      revenue: 0,
    },
    {
      month: "Apr",
      revenue: 0,
    },
    {
      month: "May",
      revenue: 0,
    },
    {
      month: "Jun",
      revenue: 0,
    },
    {
      month: "Jul",
      revenue: 0,
    },
    {
      month: "Aug",
      revenue: 0,
    },
    {
      month: "Sep",
      revenue: 0,
    },
    {
      month: "Oct",
      revenue: 0,
    },
    {
      month: "Nov",
      revenue: 0,
    },
    {
      month: "Dec",
      revenue: 0,
    },
  ])

  useEffect(() => {
    revenue?.map((rev, ind) =>
      setYearData((prev) => {
        let data = [...prev]
        data[rev.month] = {
          month: labels[rev.month],
          revenue: rev.revenue,
        }
        return data
      }),
    )
    setFinalYearData(yearData)
  }, [revenue])

  return (
    <>
      {finalYearData && chart == "area" ? (
        <AreaChartComponent yearData={finalYearData} />
      ) : (
        <BarChartComponent yearData={finalYearData} />
      )}
    </>
  )
}

export default YearChart
