import AreaChartComponent from "./AreaChartComponent"
import BarChartComponent from "./BarChartComponent"

const YearChart = ({ chart, revenue }) => {
  return (
    <>
      {chart == "area" ? (
        <AreaChartComponent yearData={revenue} />
      ) : (
        <BarChartComponent yearData={revenue} />
      )}
    </>
  )
}

export default YearChart
