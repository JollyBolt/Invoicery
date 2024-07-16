import React from "react"
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts"

const DoughnutChartComponent = ({ chartData }) => {
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
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
        fill="black"
        fontSize={12}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
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
          fill="#8884d8"
          label={renderCustomizedLabel}
        />
        <Tooltip />
      </PieChart>
      {/* </ResponsiveContainer> */}
    </>
  )
}

export default DoughnutChartComponent
