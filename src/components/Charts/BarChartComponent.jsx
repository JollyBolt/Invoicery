import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
const BarChartComponent = ({ yearData }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={600} height={300} data={yearData}>
        {/* <CartesianGrid /> */}
        <XAxis
          dataKey="month"
          padding={{ left: 30, right: 30 }}
          color="black"
        />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        {/* <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} /> */}
        <Bar
          dataKey="revenue"
          fill="#2807A1"
          // activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default BarChartComponent
