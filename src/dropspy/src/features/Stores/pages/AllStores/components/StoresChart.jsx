import { BarChart } from "../../../../../components/barChart/BarChart"
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow"

const StoresChart = (props) => {

  const { stores, orderBy, maxItems } = props.value
  const getChartItemHeight = (displayedItems) => ((!maxItems || displayedItems <= maxItems) ? Math.max(Number(displayedItems * 15), 500) : Number(displayedItems * 15)).toString()

  const shouldRenderAllStoresChart = !((stores.length === 0) || (stores[0][orderBy.value] === undefined))
  const labels = shouldRenderAllStoresChart ? stores.map(store => store.storeName) : []
  const values = shouldRenderAllStoresChart ? stores.map(store => store[orderBy.value]) : []

  const storesChartObj = {
    categoriesLabels: maxItems ? labels.slice(0, maxItems) : labels,
    categoriesValues: maxItems ? values.slice(0, maxItems) : values,
    height: getChartItemHeight(maxItems ? maxItems : stores.length),
    isHorizontal: true,
    isCurrency: ["totalRevenue"].includes(orderBy.value) ? true : false,
  }

  return (
    <>
      {stores.length === 0 ? (
        <NoDataToShow title="Não há lojas para mostrar!" />
      ) : (
        <BarChart value={storesChartObj} />
      )}
    </>
  )

}

export { StoresChart }
