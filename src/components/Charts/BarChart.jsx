import React, { useEffect, useState } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

const BarChart = ({ revenue }) => {
  // const currentYear = 2024
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
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
        backgroundColor: "#2807a0",
        hoverBackgroundColor: "#3D0CF0",
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

  return <Bar options={options} data={data} />
}

export default BarChart
