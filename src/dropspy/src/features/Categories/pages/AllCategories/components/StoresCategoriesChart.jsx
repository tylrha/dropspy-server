import { BarChart } from "../../../../../components/barChart/BarChart"
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow"

const StoresCategoriesChart = (props) => {

  const { storesByCategories, orderBy, maxItems } = props.value
  const getChartItemHeight = (displayedItems) => ((!maxItems || displayedItems < maxItems) ? Math.max(Number(displayedItems * 15), 500) : Number(displayedItems * 15)).toString()

  const shouldRenderAllStoresChart = !((storesByCategories.length === 0) || (storesByCategories[0][orderBy.value] === undefined))
  const labels = shouldRenderAllStoresChart ? storesByCategories.map(store => store.storeCategory) : []
  const values = shouldRenderAllStoresChart ? storesByCategories.map(store => store[orderBy.value]) : []

  const storesByCategoriesChartObj = {
    categoriesLabels: maxItems ? labels.slice(0, maxItems) : labels,
    categoriesValues: maxItems ? values.slice(0, maxItems) : values,
    height: getChartItemHeight(maxItems ? maxItems : storesByCategories.length),
    isCurrency: ["totalRevenue"].includes(orderBy.value) ? true : false,
    isHorizontal: true,
    showYAxis: true,
  }

  return (
    <>
      {storesByCategories.length === 0 ? (
        <NoDataToShow title="Não há categorias para mostrar!" />
      ) : (
        <BarChart value={storesByCategoriesChartObj} />
      )}
    </>
  )

}

export { StoresCategoriesChart }
