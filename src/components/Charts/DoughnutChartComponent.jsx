import React from "react"
import { PieChart, Pie, Tooltip } from "recharts"
import { useSelector } from "react-redux"

const DoughnutChartComponent = ({ chartData }) => {
  const { theme } = useSelector((state) => state.theme)
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    outerRadius,
    percent,
  }) => {
    const RADIAN = Math.PI / 180
    const radius = outerRadius + 25 // Adjust distance from pie
    const x = cx + radius * Math.cos(-midAngle * RADIAN) + 3
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill={theme === "light" ? "black" : "white"}
        fontSize={12}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { customer, revenue, invoiceCount } = payload[0].payload
      return (
        <div className="rounded-lg bg-border p-2 text-sm text-foreground">
          <p className="label">{`${customer}`}</p>
          <p className="">{`Revenue: ₹${revenue.toLocaleString()}`}</p>
          <p className="">{`Invoices: ${invoiceCount}`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <>
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <PieChart width={400} height={400}>
        <Pie
          dataKey="revenue"
          nameKey="customer"
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          fill={theme === "light" ? "#2807a1" : "#5122F5"}
          stroke={theme !== "light" ? "black" : "white"}
          label={renderCustomizedLabel}
        />
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </>
  )
}

export default DoughnutChartComponent
