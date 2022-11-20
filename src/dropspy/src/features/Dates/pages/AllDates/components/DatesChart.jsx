import { BarChart } from "../../../../../components/barChart/BarChart"
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow"

const DatesChart = (props) => {

  const { dates, orderBy, maxItems } = props.value
  const getChartItemHeight = (displayedItems) => ((!maxItems || displayedItems <= maxItems) ? Math.max(Number(displayedItems * 15), 500) : Number(displayedItems * 15)).toString()

  const shouldRenderAllStoresChart = !((dates.length === 0) || (dates[0][orderBy.value] === undefined))
  const labels = shouldRenderAllStoresChart ? dates.map(date => date.date) : []
  const values = shouldRenderAllStoresChart ? dates.map(date => date[orderBy.value]) : []

  const datesChartObj = {
    categoriesLabels: maxItems ? labels.slice(0, maxItems) : labels,
    categoriesValues: maxItems ? values.slice(0, maxItems) : values,
    height: getChartItemHeight(maxItems ? maxItems : dates.length),
    isHorizontal: true,
    isCurrency: ["totalRevenue"].includes(orderBy.value) ? true : false,
    showYAxis: false,
  }

  return (
    <>
      {dates.length === 0 ? (
        <NoDataToShow title="Não há datas para mostrar!" />
      ) : (
        <BarChart value={datesChartObj} />
      )}
    </>
  )

}

export { DatesChart }
