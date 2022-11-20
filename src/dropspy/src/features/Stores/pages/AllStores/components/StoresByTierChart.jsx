import { BarChart } from "../../../../../components/barChart/BarChart"

const StoresByTierChart = (props) => {

  const { tierStores, orderBy, maxItems } = props.value
  const getChartItemHeight = (displayedItems) => ((!maxItems || displayedItems < maxItems) ? Math.max(Number(displayedItems * 15), 500) : Number(displayedItems * 15)).toString()

  const shouldRenderAllStoresChart = !((tierStores.length === 0) || (tierStores[0][orderBy.value] === undefined))
  const labels = shouldRenderAllStoresChart ? tierStores.map(store => store.tier) : []
  const values = shouldRenderAllStoresChart ? tierStores.map(store => store[orderBy.value]) : []

  const storesChartObj = {
    categoriesLabels: maxItems ? labels.slice(0, maxItems) : labels,
    categoriesValues: maxItems ? values.slice(0, maxItems) : values,
    height: getChartItemHeight(maxItems ? maxItems : tierStores.length),
    isHorizontal: false,
    isCurrency: ["totalRevenue"].includes(orderBy.value) ? true : false
  }

  return (
    <BarChart value={storesChartObj} />
  )

}

export {StoresByTierChart}
