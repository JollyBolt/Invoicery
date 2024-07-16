import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

const AreaChartComponent = ({ yearData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart width={600} height={300} data={yearData}>
        <XAxis
          dataKey="month"
          padding={{ left: 30, right: 30 }}
          color="black"
        />
        <YAxis padding={{ top: 30, bottom: 0 }} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#8884d8"
          fill="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
export default AreaChartComponent
