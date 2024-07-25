import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useSelector } from "react-redux"

const BarChartComponent = ({ yearData }) => {
  const { theme } = useSelector((state) => state.theme)

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, revenue } = payload[0].payload
      return (
        <div className="rounded-lg bg-border p-2 text-sm text-foreground">
          <p className="label">{`${month}`}</p>
          <p className="intro">{`Revenue: ₹${revenue.toLocaleString("en-IN")}`}</p>
        </div>
      )
    }
    return null
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={600} height={300} data={yearData}>
        <XAxis
          dataKey="month"
          padding={{ left: 30, right: 30 }}
          color="black"
        />
        <YAxis
          tickFormatter={(value) =>
            new Intl.NumberFormat("en-In", {
              notation: "compact",
              compactDisplay: "short",
            }).format(value)
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="revenue"
          fill={theme === "light" ? "#2807a1" : "#5122F5"}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
