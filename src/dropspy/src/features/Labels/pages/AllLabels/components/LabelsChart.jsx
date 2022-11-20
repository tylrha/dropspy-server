import { BarChart } from "../../../../../components/barChart/BarChart"
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow"

const LabelsChart = (props) => {

  const { orderBy, labels, maxItems } = props.value
  const getChartItemHeight = (displayedItems) => ((!maxItems || displayedItems <= maxItems) ? Math.max(Number(displayedItems * 15), 500) : Number(displayedItems * 15)).toString()

  const shouldRenderAllStoresChart = !((labels.length === 0) || (labels[0][orderBy.value] === undefined))
  const chartLabels = shouldRenderAllStoresChart ? labels.map(store => store.name) : []
  const chartValues = shouldRenderAllStoresChart ? labels.map(store => store[orderBy.value]) : []

  const labelsChartObj = {
    categoriesLabels: maxItems ? chartLabels.slice(0, maxItems) : chartLabels,
    categoriesValues: maxItems ? chartValues.slice(0, maxItems) : chartValues,
    height: getChartItemHeight(maxItems ? maxItems : labels.length),
    isHorizontal: true,
    isCurrency: ["totalRevenue"].includes(orderBy.value) ? true : false
  }

  return (
    <>
      {labels.length === 0 ? (
        <NoDataToShow title="Não há etiquetas para mostrar!" />
      ) : (
        <BarChart value={labelsChartObj} />
      )}
    </>
  )

}

export { LabelsChart }
