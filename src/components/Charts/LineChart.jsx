import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

const LineChart = ({ revenue }) => {
  // const currentYear = 2024
  const [theme, setTheme] = useState(localStorage.getItem("theme"))

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  )

  const [yearData, setYearData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  let tempRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  useEffect(() => {
    revenue?.map((rev, ind) => (tempRevenue[rev._id] = rev.revenue))
    setYearData(tempRevenue)
  }, [revenue])

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

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data: yearData,
        backgroundColor:
          localStorage.getItem("theme") == "dark" ? "#5122F5" : "#2807A1",
        borderColor:
          localStorage.getItem("theme") == "dark" ? "#5122F5" : "#2807A1",
        // hoverBackgroundColor: '#3D0CF0',
        pointStyle: "circle",
        pointRadius: 3,
        pointHoverRadius: 7,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Monthly Revenue",
      },
    },
    barThickness: 20,
    scales: {
      y: {
        beginAtZero: true,
        grace: 1,
      },
    },
  }

  return <Line options={options} data={data} />
}
export default LineChart
